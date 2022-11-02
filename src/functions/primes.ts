import { MILLER_RABIN_K_BASES } from "../constants";
import { gcd, pow } from "./elementary";
import { factor_out } from "./factors";

/**
 * 
 * @param n 
 * @returns if n is probably prime
 */
export function is_prime(n : number | bigint) {
  return miller_rabin_primality(n);
}

export function is_prime_slow(n : number | bigint) {
  var n_ = Number(n),
  i_ = 2,
  root_n = Math.sqrt(n_);
  while(i_ < root_n && n_ % i_ != 0) i_++;
  return n_ % i_ != 0;
}


/** 
 * test if number is prime for n < 3,317,044,064,679,887,385,961,981
 * for all other greater n, it check if number is composite.
 * there is probability of 1 / (2 ^ 14) that output might wrong for greater n
 * @param n number to check primality
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

export function is_relatively_prime(n : number | bigint , l : number | bigint | Array<number> | Array<bigint>) {
  if (typeof l === 'number' || typeof l === 'bigint') return gcd(n, l) == 1n;
}

export function primes(n : number | bigint) {
  return sieve_of_eratosthenes(n)
}

export function sieve_of_eratosthenes(n : number | bigint) {
  var n_ = Number(n),
  i_ = 3,
  j_,
  is_prime = new Int8Array(n_  + 1), // to accomadate last number
  primes = [2];
  while(i_ <= n) {
    primes.push(i_);
    j_ = i_ * i_;
    while(j_ <= n) {
      is_prime[j_] = 1;
      j_ += 2 * i_;
    }
    i_ += 2; // skipping all even
    while (i_ <= n_ && is_prime[i_]) i_ += 2;
  }
  return primes;
}

export function pi(n : number | bigint) {
  return sieve_of_eratosthenes(n).length;
}