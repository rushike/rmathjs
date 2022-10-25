import { MILLER_RABIN_K_BASES } from "../constants";
import { gcd, pow } from "./basic";
import { factor_out } from "./factors";

/**
 * 
 * @param n 
 * @returns if n is probably prime
 */
export function is_prime(n : number | bigint) {
  return miller_rabin_primality(n);
}

export function is_relatively_prime(n : number | bigint , l : number | bigint | Array<number> | Array<bigint>) {
  if (typeof l === 'number' || typeof l === 'bigint') return gcd(n, l) == 1n;
}



/** 
 * test if number is prime for n < 3,317,044,064,679,887,385,961,981
 * for all other greater n, it check if number is composite.
 * there is probability of 1 / (2 ^ 14) that output might wrong for greater n
 * @par666am n number to check primality
 * @param k no of bases | or bases array
 */

export function miller_rabin_primality(n : number | bigint, k : number | number[]= MILLER_RABIN_K_BASES) {
  const k_ = (typeof k === 'number') ? MILLER_RABIN_K_BASES.slice(0, k) : k;
  var n_ = BigInt(n);
  var prime = true;
  // decompose n as n = 2^s * d + 1
  var {f : {p : p_, k : s_}, d : d_} = factor_out(n_, 2);
  
  k_.forEach(a_=> {
    if (a_ >= n) return
    var x_ = BigInt(pow(a_, d_ - 1n, n_));
    if (x_ === 1n || x_ === n_ - 1n) return;
    var s1_ = BigInt(s_) - 1n;
    
    while (s1_ > 0) {
      s1_--;
      x_ = (x_ * x_) % n_;
      if (x_ === n_ - 1n) return;
    }
    prime = false;
  });
  return prime;
}

export function solovay_strassen_primality(n : number | bigint) {
  var n_ = Number(n);
}