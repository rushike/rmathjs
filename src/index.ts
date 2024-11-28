/**
 * @module rmathjs
 */

import {
  bignum,
  fraction,
  real, decimal, bigdecimal,
  complex
} from "./dtype";

export {
  PI_2_STR,
  PI_STR,
  PRIMES_LESS_THAN_100,
  E_STR,
  LN2_STR,
  LOG2_10_STR
} from "./constants"

import {
  gcd,
  lcm,
  factorial,
  powz,
  pow,
  exp,
  arsinh
} from "./functions/elementary"

export default {
  /** Data Types */
  bignum,
  fraction,
  real, decimal, bigdecimal,
  complex,
  /** Functions  */
  gcd,
  lcm,
  factorial,
  powz,
  pow,
  exp,
  arsinh
}