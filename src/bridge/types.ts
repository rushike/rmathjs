/**
//! Bridge Types for rmathjs <-> rmathrs WASM communication.
 */

export interface BridgeRequest {
  op: string;
  args: string[];
  prec?: number;
}

export interface BridgeResponse {
  status: "ok" | "error";
  result?: string;
  error?: string;
}

export interface BridgeConfig {
  /**
   * If true, calling bridge functions without an initialized WASM module
   * will throw an error instead of silently falling back to pure JavaScript.
   * Default: false (graceful fallback).
   */
  strict: boolean;
  /**
   * Custom path or buffer for the WASM binary.
   */
  wasmSource?: string | URL | Uint8Array | Response;
}

export class RMathBridgeError extends Error {
  public readonly op?: string;
  constructor(message: string, op?: string) {
    super(`[rmath-bridge] ${op ? `(${op}) ` : ""}${message}`);
    this.op = op;
    this.name = "RMathBridgeError";
  }
}

