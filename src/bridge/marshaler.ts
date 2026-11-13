import { real, Float } from "../dtype/R.ts";

/**
 * Converts arbitrary JS/rmathjs inputs into a high-precision decimal/integer string
 * for transport across the WASM boundary with zero precision loss.
 */
export function marshalArg(x: any): string {
  if (x === null || x === undefined) {
    return "";
  }
  if (typeof x === "bigint" || typeof x === "number") {
    return x.toString();
  }
  if (typeof x === "string") {
    return x;
  }
  if (x instanceof Float || (typeof x === "object" && "n" in x && "b" in x && "e" in x && "p" in x)) {
    const n = BigInt(x.n);
    const b = BigInt(x.b);
    const e = Number(x.e);
    const p = Number(x.p);
    if (n === 0n) return "0";

    if (e >= p) {
      return (n * b ** BigInt(e - p)).toString(Number(b));
    } else if (e <= 0) {
      return "0." + "0".repeat(Math.abs(e)) + n.toString(Number(b));
    } else {
      const fraction = p - e;
      const nstring = n.toString(Number(b));
      const left = nstring.slice(0, p - fraction);
      const right = nstring.slice(p - fraction);
      return (left || "0") + "." + right;
    }
  }

  return String(x);
}

/**
 * Unmarshals a result string into an rmathjs `Float` (Real).
 */
export function unmarshalReal(resultStr: string): Float {
  return real(resultStr);
}

/**
 * Unmarshals a result string into a JavaScript `bigint`.
 */
export function unmarshalBigInt(resultStr: string): bigint {
  return BigInt(resultStr);
}

/**
 * Unmarshals a result string into a primitive `number`.
 */
export function unmarshalNumber(resultStr: string): number {
  return Number(resultStr);
}

