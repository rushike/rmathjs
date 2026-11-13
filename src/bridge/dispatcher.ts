import { initWasm, isWasmReady, getWasmInstance, configureBridge, isStrict, setWasmEnabled } from "./loader.ts";
import { marshalArg, unmarshalReal, unmarshalBigInt, unmarshalNumber } from "./marshaler.ts";
import { type BridgeRequest, type BridgeResponse, RMathBridgeError } from "./types.ts";
import { Float } from "../dtype/R.ts";
import { config } from "../config.ts";

/**
 * Main Bridge interface connecting `rmathjs` to the `rmathrs` WebAssembly engine.
 */
export class RMathBridge {
  /**
   * Initializes the WASM module. Safe to call multiple times (cached).
   */
  static async init(source?: string | URL | Uint8Array | Response): Promise<any> {
    return initWasm(source);
  }

  /**
   * Returns true if the WASM bridge is initialized and ready.
   */
  static isReady(): boolean {
    return isWasmReady();
  }

  /**
   * Enables or disables WASM bridge routing (useful for benchmarking against pure JS).
   */
  static setEnabled(enabled: boolean): void {
    setWasmEnabled(enabled);
  }

  /**
   * Configures whether calling bridge methods without WASM throws an error (strict)
   * or falls back to pure JavaScript.
   */
  static setStrict(strict: boolean): void {
    configureBridge({ strict });
  }

  /**
   * Checks if strict mode is enabled.
   */
  static isStrict(): boolean {
    return isStrict();
  }

  /**
   * Dispatches a raw operation through the single Rust WASM entrypoint:
   * `rmath_bridge_dispatch(op, payload_json)`.
   */
  static dispatchRaw(op: string, args: any[] = [], prec?: number): string {
    const wasm = getWasmInstance();
    const stringArgs = args.map(marshalArg);

    const req: BridgeRequest = {
      op,
      args: stringArgs,
      prec,
    };

    const payloadJson = JSON.stringify(req);
    const rawResponse = wasm.rmath_bridge_dispatch(op, payloadJson);

    let parsed: BridgeResponse;
    try {
      parsed = JSON.parse(rawResponse);
    } catch (e: any) {
      throw new RMathBridgeError(`Failed to parse response JSON: ${e?.message}`, op);
    }

    if (parsed.status === "error" || !parsed.result) {
      throw new RMathBridgeError(parsed.error || "Unknown bridge execution error", op);
    }

    return parsed.result;
  }

  /**
   * Executes a transcendental/real operation, returning an rmathjs `Float`.
   */
  static execReal(op: string, args: any[] = [], prec?: number): Float {
    const decimalDigits = config().precision || 30;
    const effectivePrec = prec ?? Math.max(128, Math.ceil((decimalDigits + 8) * 3.322));
    const resultStr = RMathBridge.dispatchRaw(op, args, effectivePrec);
    return unmarshalReal(resultStr);
  }

  /**
   * Executes an integer operation, returning a JavaScript `bigint`.
   */
  static execBigInt(op: string, args: any[] = [], prec?: number): bigint {
    const resultStr = RMathBridge.dispatchRaw(op, args, prec);
    return unmarshalBigInt(resultStr);
  }

  /**
   * Executes an integer/number operation, returning a JavaScript `number`.
   */
  static execNumber(op: string, args: any[] = [], prec?: number): number {
    const resultStr = RMathBridge.dispatchRaw(op, args, prec);
    return unmarshalNumber(resultStr);
  }
}

