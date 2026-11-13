import { describe, it, expect, beforeAll } from "vitest";
import { RMathBridge, initWasm, isWasmReady } from "../../src/bridge/index.ts";
import { real, Float } from "../../src/dtype/R.ts";
import { exp, sin, cos, tan, ln, sqrt, gcd, lcm, factorial } from "../../src/functions/elementary.ts";

describe("rmathjs <-> rmathrs WASM Bridge", () => {
  it("reports ready status after init", async () => {
    await initWasm();
    expect(isWasmReady()).toBe(true);
    expect(RMathBridge.isReady()).toBe(true);
  });

  it("idempotently handles repeated initWasm calls", async () => {
    const instance1 = await initWasm();
    const instance2 = await initWasm();
    expect(instance1).toBe(instance2);
  });

  describe("Integer operations via WASM Bridge", () => {
    it("computes factorial(10) via WASM", () => {
      const res = factorial(10n);
      expect(res).toBe(3628800n);
    });

    it("computes gcd(12, 8) via WASM", () => {
      const res = gcd(12n, 8n);
      expect(res).toBe(4n);
    });

    it("computes lcm(4, 6) via WASM", () => {
      const res = lcm(4n, 6n);
      expect(res).toBe(12n);
    });
  });

  describe("Transcendental & Real operations via WASM Bridge", () => {
    it("computes exp(1) via WASM", () => {
      const e = exp(real(1));
      expect(e).toBeInstanceOf(Float);
      const val = parseFloat(e.toString());
      expect(Math.abs(val - Math.E)).toBeLessThan(1e-12);
    });

    it("computes sin(0) and cos(0) via WASM", () => {
      const s = sin(real(0));
      const c = cos(real(0));
      expect(parseFloat(s.toString())).toBe(0);
      expect(parseFloat(c.toString())).toBe(1);
    });

    it("computes ln(e) via WASM", () => {
      const val = ln(real(Math.E));
      expect(Math.abs(parseFloat(val.toString()) - 1)).toBeLessThan(1e-12);
    });

    it("computes sqrt via WASM", () => {
      const res = RMathBridge.execReal("sqrt", [real(4)]);
      expect(parseFloat(res.toString())).toBe(2);
    });

    it("computes atan(1) via WASM", () => {
      const res = RMathBridge.execReal("atan", [real(1)]);
      const val = parseFloat(res.toString());
      expect(Math.abs(val - Math.PI / 4)).toBeLessThan(1e-12);
    });
  });

  describe("Constants & Dispatch", () => {
    it("fetches pi through bridge", () => {
      const piStr = RMathBridge.dispatchRaw("pi");
      expect(piStr.startsWith("3.1415926535")).toBe(true);
    });

    it("fetches e through bridge", () => {
      const eStr = RMathBridge.dispatchRaw("e");
      expect(eStr.startsWith("2.7182818284")).toBe(true);
    });

    it("throws RMathBridgeError on unknown operation", () => {
      expect(() => {
        RMathBridge.dispatchRaw("non_existent_op");
      }).toThrow(/Unknown operation/);
    });
  });
});

