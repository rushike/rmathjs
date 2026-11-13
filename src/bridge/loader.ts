import { type BridgeConfig, RMathBridgeError } from "./types.ts";

let wasmModule: any = null;
let initPromise: Promise<any> | null = null;
let wasmEnabled = true;

const config: BridgeConfig = {
  strict: false,
};

/**
 * Configure bridge behavior.
 */
export function configureBridge(opts: Partial<BridgeConfig>): void {
  Object.assign(config, opts);
}

export function isStrict(): boolean {
  return config.strict;
}

/**
 * Temporarily enable or disable WASM execution (useful for benchmarks & fallbacks).
 */
export function setWasmEnabled(enabled: boolean): void {
  wasmEnabled = enabled;
}

/**
 * Check if the WASM bridge is initialized and ready for execution.
 */
export function isWasmReady(): boolean {
  return wasmModule !== null && wasmEnabled;
}

/**
 * Get the initialized WASM module or throw if uninitialized.
 */
export function getWasmInstance(): any {
  if (!wasmModule) {
    throw new RMathBridgeError("WASM module has not been initialized. Call initWasm() first.");
  }
  return wasmModule;
}

/**
 * Initialize the rmathrs WebAssembly module.
 *
 * This function is idempotent: repeated calls return the cached initialization promise/instance.
 * Works seamlessly across Browser (fetch/streaming), Vite/bundlers, and Node.js environments.
 */
export async function initWasm(source?: string | URL | Uint8Array | Response): Promise<any> {
  if (wasmModule) {
    return wasmModule;
  }
  if (initPromise) {
    return initPromise;
  }

  initPromise = (async () => {
    try {
      // Dynamic import of the wasm-bindgen generated JS glue
      const wasmGlue = await import("../../wasm/rmathrs.js");
      const initFn = wasmGlue.default;

      let wasmInput = source ?? config.wasmSource;

      // In Node.js / Vitest environments without a source specified,
      // load the .wasm file directly via fs to avoid fetch/file-URL issues.
      if (!wasmInput && typeof process !== "undefined" && process.versions?.node) {
        try {
          const fs = await import("fs");
          const wasmUrl = new URL("../../wasm/rmathrs_bg.wasm", import.meta.url);
          wasmInput = fs.readFileSync(wasmUrl);
        } catch {
          // Fall back to default module resolution if fs import fails
        }
      }

      if (wasmInput) {
        await initFn({ module_or_path: wasmInput });
      } else {
        await initFn();
      }
      wasmModule = wasmGlue;
      return wasmModule;
    } catch (err: any) {
      initPromise = null;
      throw new RMathBridgeError(`Failed to initialize WASM module: ${err?.message || err}`);
    }
  })();

  return initPromise;
}

/**
 * Synchronous initialization using preloaded binary buffer (if supported by environment).
 */
export function initWasmSync(binary: Uint8Array | ArrayBuffer): any {
  if (wasmModule) return wasmModule;
  // Dynamic require/import sync helper
  try {
    const fs = require("fs");
    const wasmGlue = require("../../wasm/rmathrs.js");
    wasmGlue.initSync(binary);
    wasmModule = wasmGlue;
    return wasmModule;
  } catch (err: any) {
    throw new RMathBridgeError(`initWasmSync failed: ${err?.message || err}`);
  }
}
