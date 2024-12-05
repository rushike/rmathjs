import * as path from 'https://deno.land/std@0.138.0/path/mod.ts';
/**
 * @module performance/main.ts
 * main.ts will run the bench mark definied files performance/*.bench.ts.
 * 
 * This output json will store in performance/perf sub-directory, in hive partition fashion.
 * 
 * CMD to run main
 * -  deno --allow-read --allow-write --allow-run performance/main.ts
 */

type DenoBenchJsonResultType = {
  "n":number,
  "min":number,
  "max":number,
  "avg":number,
  "p75":number,
  "p99":number,
  "p995":number,
  "p999":number,
  "highPrecision":boolean,
  "usedExplicitTimers":boolean
}
type DenoBenchJsonBenchType= {
  "origin" : string
  "group" : string
  "name" : string
  "baseline" : string,
  "results" : {
    "ok" : DenoBenchJsonResultType
  }[]
}

type DenoBenchJsonType = {
  "version": number,
  "runtime": string
  "cpu": string,
  "benches": DenoBenchJsonBenchType[]
}

type PerfTableRecords = {
  version : string // rmathjs version,
  "runtime": string
  "cpu": string,
  "origin" : string
  "group" : string
  "name" : string
  "baseline" : string,
  "resultType" : string,
  "n":number,
  "min":number,
  "max":number,
  "avg":number,
  "p75":number,
  "p99":number,
  "p995":number,
  "p999":number,
  "highPrecision":boolean,
  "usedExplicitTimers":boolean
}

const PACKAGE_JSON = JSON.parse(new TextDecoder().decode(Deno.readFileSync("package.json")))


function transfromToTableRecords(denoBenchJson : DenoBenchJsonType) : PerfTableRecords[] {
  const records: PerfTableRecords[] = [];

  for (const bench of denoBenchJson.benches) {
    for (const result of bench.results) {
      if (result.ok) {
        const okResult = result.ok;
        records.push({
          version: PACKAGE_JSON.version, // Assuming rmathjs version is the same as the JSON version
          runtime: denoBenchJson.runtime,
          cpu: denoBenchJson.cpu,
          origin: bench.origin,
          group: bench.group,
          name: bench.name,
          baseline: bench.baseline,
          resultType: "ok", // Since we're accessing the `ok` field
          n: okResult.n,
          min: okResult.min,
          max: okResult.max,
          avg: okResult.avg,
          p75: okResult.p75,
          p99: okResult.p99,
          p995: okResult.p995,
          p999: okResult.p999,
          highPrecision: okResult.highPrecision,
          usedExplicitTimers: okResult.usedExplicitTimers,
        });
      }
    }
  }
  return records
}

async function runBenchCmd() : Promise<DenoBenchJsonType> {
  const benchCmd = new Deno.Command("deno", {
    args: ["bench", "--unstable-sloppy-imports", "--allow-read", "--json", "performance/*.bench.ts"],
    stdout: "piped",
    stderr: "piped",
  });

  // Execute the command
  const process = benchCmd.spawn();

  const status = await process.status;

  // Reading the output
  const rawOutput = (await process.stdout.values().next()).value; // Resolves to Uint8Array

  // Convert the output to strings
  const output = new TextDecoder().decode(rawOutput);

  if (status.success) {
    console.log("Benchmarks completed successfully.");
    const res = JSON.parse(output);
    res.version = PACKAGE_JSON.version;
    return res;
  } else {
    throw new Error("Benchmarks failed.");
  }
}

async function writeToPerf(records : PerfTableRecords[], baseDir: string = path.join("performance", "perf")) {
  if (records.length === 0) {
    console.error("No records to write.");
    return;
  }

  // Extract the version from the first record
  const version = records[0].version;

  // Construct the directory path and file path
  const filePath = path.join(`${baseDir}`, `${version}.json`);

  // Write the JSON file
  await Deno.writeTextFile(filePath, JSON.stringify(records, null, 2));

  console.log(`Records written to: ${filePath}`);
}


async function main() {
  const benchJson = await runBenchCmd();
  const records = transfromToTableRecords(benchJson);
  writeToPerf(records)
}


main()
