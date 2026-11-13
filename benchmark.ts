/**
 * rmathjs: Comprehensive Performance Benchmark
 * Compares WebAssembly (WASM via rmathrs) vs Pure JavaScript (No-WASM)
 * across various decimal precisions for 1000 evaluations.
 */

import { initWasm, RMathBridge } from "./src/bridge/index.ts";
import { real } from "./src/dtype/R.ts";
import { config } from "./src/config.ts";
import {
  exp,
  ln,
  log,
  sqrt,
  sin,
  cos,
  tan,
  arcsin,
  arccos,
  arctan,
  sinh,
  cosh,
  tanh,
  arcsinh,
  arccosh,
  arctanh,
  gcd,
  lcm,
  factorial,
} from "./src/functions/elementary.ts";

export interface BenchmarkResult {
  functionName: string;
  isIntegerOp?: boolean;
  precisionResults: Record<
    number,
    {
      wasmMilli: number;
      noWasmMilli: number;
      speedup: number;
    }
  >;
}

interface BenchmarkFn {
  name: string;
  isInteger?: boolean;
  run: () => void;
}

export function parseArgs(): { iterations: number; precisions: number[] } {
  let iterations = 1000;
  let precisions = [30, 50, 100];

  if (process.env.BENCHMARK_ITERATIONS) {
    const it = parseInt(process.env.BENCHMARK_ITERATIONS, 10);
    if (!isNaN(it) && it > 0) iterations = it;
  }
  if (process.env.BENCHMARK_PRECISIONS) {
    const p = process.env.BENCHMARK_PRECISIONS.split(",")
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !isNaN(n) && n > 0);
    if (p.length > 0) precisions = p;
  }

  for (let i = 0; i < process.argv.length; i++) {
    const arg = process.argv[i];
    if (arg.startsWith("--iterations=")) {
      const it = parseInt(arg.slice("--iterations=".length), 10);
      if (!isNaN(it) && it > 0) iterations = it;
    } else if (arg === "--iterations" && i + 1 < process.argv.length) {
      const it = parseInt(process.argv[i + 1], 10);
      if (!isNaN(it) && it > 0) iterations = it;
    }
    if (arg.startsWith("--precisions=")) {
      const p = arg
        .slice("--precisions=".length)
        .split(",")
        .map((s) => parseInt(s.trim(), 10))
        .filter((n) => !isNaN(n) && n > 0);
      if (p.length > 0) precisions = p;
    }
  }

  return { iterations, precisions };
}

export async function runBenchmark(): Promise<BenchmarkResult[]> {
  const { iterations, precisions } = parseArgs();

  // 1. Initialize WASM module
  await initWasm();

  console.log("\n==========================================================================================");
  console.log(` Starting rmathjs Benchmark: WASM vs No-WASM (Pure JS)`);
  console.log(` Iterations per function: ${iterations.toLocaleString()}`);
  console.log(` Target Precisions: [${precisions.join(", ")}] digits`);
  console.log("==========================================================================================\n");

  // Representative inputs for real & integer operations
  const xRealSmall = real("0.5");
  const xRealAngle = real("0.7853981633974483"); // ~ pi/4
  const xRealLarge = real("7.948234");
  const xRealBase = real("10");
  const xRealArtanh = real("0.3991");
  const xRealArcosh = real("1.5");
  const xRealSqrt = real("123.456");

  const intA = 12252121211212212222n;
  const intB = 12345212121212122222n;
  const intSmallA = 1234567n;
  const intSmallB = 7654321n;
  const intFact = 50n;

  const benchmarkDefinitions: BenchmarkFn[] = [
    { name: "exp", run: () => exp(xRealSmall) },
    { name: "ln", run: () => ln(xRealLarge) },
    { name: "log", run: () => log(xRealLarge, xRealBase) },
    { name: "sqrt", run: () => sqrt(xRealSqrt) },
    { name: "sin", run: () => sin(xRealAngle) },
    { name: "cos", run: () => cos(xRealAngle) },
    { name: "tan", run: () => tan(xRealAngle) },
    { name: "arcsin", run: () => arcsin(xRealSmall) },
    { name: "arccos", run: () => arccos(xRealSmall) },
    { name: "arctan", run: () => arctan(xRealSmall) },
    { name: "sinh", run: () => sinh(xRealSmall) },
    { name: "cosh", run: () => cosh(xRealSmall) },
    { name: "tanh", run: () => tanh(xRealSmall) },
    { name: "arcsinh", run: () => arcsinh(xRealSmall) },
    { name: "arccosh", run: () => arccosh(xRealArcosh) },
    { name: "arctanh", run: () => arctanh(xRealArtanh) },
    { name: "gcd", isInteger: true, run: () => gcd(intA, intB) },
    { name: "lcm", isInteger: true, run: () => lcm(intSmallA, intSmallB) },
    { name: "factorial", isInteger: true, run: () => factorial(intFact) },
  ];

  const results: BenchmarkResult[] = [];

  for (const fn of benchmarkDefinitions) {
    const result: BenchmarkResult = {
      functionName: fn.name,
      isIntegerOp: fn.isInteger,
      precisionResults: {},
    };

    for (const prec of precisions) {
      config({ precision: prec });

      // Warmup WASM
      RMathBridge.setEnabled(true);
      for (let i = 0; i < 5; i++) fn.run();

      // Measure WASM
      const startWasm = performance.now();
      for (let i = 0; i < iterations; i++) {
        fn.run();
      }
      const wasmMilli = performance.now() - startWasm;

      // Warmup No-WASM
      RMathBridge.setEnabled(false);
      for (let i = 0; i < 5; i++) fn.run();

      // Measure No-WASM
      const startNoWasm = performance.now();
      for (let i = 0; i < iterations; i++) {
        fn.run();
      }
      const noWasmMilli = performance.now() - startNoWasm;

      const speedup = noWasmMilli / (wasmMilli || 0.0001);

      result.precisionResults[prec] = {
        wasmMilli,
        noWasmMilli,
        speedup,
      };
    }

    results.push(result);
  }

  // Restore WASM enabled by default
  RMathBridge.setEnabled(true);

  // Render performance tables
  printResultsTable(results, precisions, iterations);

  return results;
}

export function printResultsTable(
  results: BenchmarkResult[],
  precisions: number[],
  iterations: number
): void {
  // Column width calculations
  const fnColWidth = 14;
  const numColWidth = 11;
  const speedupColWidth = 9;
  const precColWidth = numColWidth * 2 + speedupColWidth + 4; // 2 data cols + speedup + separators

  const totalWidth = fnColWidth + 3 + (precColWidth + 3) * precisions.length;

  console.log("\n" + "=".repeat(totalWidth));
  console.log(
    ` PERFORMANCE BENCHMARK RESULTS (Time in milliseconds for ${iterations.toLocaleString()} iterations)`
  );
  console.log("=".repeat(totalWidth));

  // Header Line 1: Function | Precision X | Precision Y | ...
  let header1 = `| ${"Function".padEnd(fnColWidth)} `;
  for (const prec of precisions) {
    const title = `Precision ${prec} digits`;
    header1 += `| ${title.padStart((precColWidth + title.length) / 2).padEnd(precColWidth)} `;
  }
  header1 += "|";
  console.log(header1);

  // Header Line 2: | WASM | No-WASM | Speedup | ...
  let header2 = `| ${"".padEnd(fnColWidth)} `;
  for (const _ of precisions) {
    header2 += `| ${"WASM".padStart(numColWidth)} | ${"No-WASM".padStart(numColWidth)} | ${"Speedup".padStart(speedupColWidth)} `;
  }
  header2 += "|";
  console.log(header2);

  // Divider
  let divider = `|${"-".repeat(fnColWidth + 2)}`;
  for (const _ of precisions) {
    divider += `+${"-".repeat(precColWidth + 2)}`;
  }
  divider += "|";
  console.log(divider);

  // Rows for each function
  for (const res of results) {
    let row = `| ${res.functionName.padEnd(fnColWidth)} `;
    for (const prec of precisions) {
      const p = res.precisionResults[prec];
      const wasmStr = `${p.wasmMilli.toFixed(1)} ms`;
      const noWasmStr = `${p.noWasmMilli.toFixed(1)} ms`;
      const speedupStr = `${p.speedup.toFixed(2)}x`;
      row += `| ${wasmStr.padStart(numColWidth)} | ${noWasmStr.padStart(numColWidth)} | ${speedupStr.padStart(speedupColWidth)} `;
    }
    row += "|";
    console.log(row);
  }

  console.log("=".repeat(totalWidth));
  console.log(" Note: Speedup = (No-WASM time / WASM time). Values > 1.0x indicate WASM is faster.\n");
}

// Support both Vitest test runner execution and standalone Node/Direct execution
if (typeof describe !== "undefined") {
  describe("Performance Benchmark: WASM vs No-WASM", () => {
    it(
      "runs benchmark and outputs performance comparison table",
      async () => {
        const results = await runBenchmark();
        expect(results.length).toBeGreaterThan(0);
      },
      600000 // 10 minute timeout
    );
  });
} else {
  runBenchmark().catch((err) => {
    console.error("Benchmark failed with error:", err);
    process.exit(1);
  });
}
