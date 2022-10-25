/**
 *  Prime Factorization
 *  If n = p1^a1 * p2^a2 * ... * pk^ak
 *  We represent in 2D array format as
 *    n = [[p1, a1], [p2, a2], [p3, a3], ... [pk, ak]]
 * 
 *  If ai == 1, below should also valid
 *   n = [p1, a1], [p2, a2], ... pi, ... [pk, ak]
 */

import { miller_rabin_primality } from "./primes";

interface Factor {
  p : number | bigint,
  k : number | bigint
}

interface PrimeFactorCount {
  t : number | bigint, // total number of prime factor
  d : number | bigint // total number of distinct prime factor
}

interface FactorOut{
  f : Factor,
  d : bigint
}

/**
 * Removes the factor 'f' from number 'n'
 * @param n number
 * @param f factor to take out
 * @returns two number, such that gcd((f ^ s), d) = 1
 */
export function factor_out(n : number | bigint , f : number | bigint) : FactorOut {
  var f_ = BigInt(f),
  s_ = BigInt(0),
  d_ = BigInt(n);
  while (d_ % f_ == 0n) {
    d_ /= f_;
    s_++;
  }
  return {f : {p : f_, k : s_}, d : d_};
}

export function factorize(n : number | bigint) : Factor[] {
  var n_ = Number(n),
  i_ = 2,
  factors : Factor[] = []
  ;
  if (miller_rabin_primality(n_)) return [{p:n_, k:1}];
  while (i_ <= Math.sqrt(n_)) {
    if (n_% i_) {
      i_++;
      continue;
    } 
    if (miller_rabin_primality(n_)) return [...factors, {p : n_, k : 1}];
    var lfactor = {p : i_, k : 0}; 
    while (n_ % i_ == 0) {
      n_ /= i_;
      lfactor.k += 1;
    }
    factors = [...factors, lfactor]
  } 
  if (n_ != 1 ) return [...factors, {p : n_, k : 1}]
  return factors
}

export function square_free(n : number | bigint) : boolean {
  var n_ = BigInt(n), 
  i_ = 1n;
  while(i_ * i_ < n_) {
    if (miller_rabin_primality(n_)) return true;
    while(n_ % ++i_); 
    n_ = n_ / i_;
    if (n_ % i_ == 0n) return false; // not square free since it divided twice by 'i_'
  }
  return true;
}

export function prime_factor_count(n : number | bigint) : PrimeFactorCount {
  var n_ = BigInt(n), 
  i_ = 1n,
  res = {t : 0, d : 0};
  while(i_ * i_ < n_) {
    if (miller_rabin_primality(n_)) return {t : res.t + 1, d : res.d + 1};
    while(n_ % ++i_); 
    res.d += 1;
    console.log("n , i : ", n_, i_);
    
    while(n_ % i_ == 0n) {
      res.t += 1; // counts number of times 'i_' occurs in 'n_' and add it to total
      n_ /= i_;
    }
  }
  console.log("rem : ", n_);
   
  if (n_ != 1n) res = {t : res.t + 1, d : res.d + 1};
  return res;
}