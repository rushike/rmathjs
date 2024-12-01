/**
 * @module rmathjs
 */

export {
  bignum,
  fraction,
  real, decimal, bigdecimal,
  complex
} from "./dtype/index.ts";

export {
  PI_2_STR,
  PI_STR,
  PRIMES_LESS_THAN_100,
  E_STR,
  LN2_STR,
  LOG2_10_STR
} from "./constants.ts"

export {
  gcd,
  lcm,
  factorial,
  powz,
  pow,
  exp,
  cos,
  cosh,
  sin,
  sinh,
  tan,
  tanh,
  log,
  ln,
  arsinh,
  arcosh,
  artanh
} from "./functions/elementary.ts"
