/**
 * @module functions
 */
import {
  gcd,
  lcm,
  factorial,
  powz,
  pow,
  exp,
} from "./elementary"

import {
  factor_out, 
  factorize,
} from "./factors"

import {
  primes,
  is_prime,
  pi,
  is_relatively_prime,
  sieve_of_eratosthenes,
  miller_rabin_primality
} from "./primes"

import {
  u,
  N,
  mu,
  phi,
  mangoldt
} from "./arithmetic"

import {dirichlet} from "./dirichlet"

export default {
  gcd,
  lcm,
  factorial,
  powz,
  pow,
  exp,
  factors : {
    factor_out, 
    factorize
  },
  primes : {
    primes,
    is_prime,
    is_relatively_prime,
    sieve_of_eratosthenes,
    miller_rabin_primality,
    pi
  },
  arithmetic : {
    u,
    I: N,
    mu,
    phi,
    mangoldt,
    dirichlet
  }
}