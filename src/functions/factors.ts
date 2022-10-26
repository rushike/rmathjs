/**
 *  Prime Factorization
 *  If n = p1^a1 * p2^a2 * ... * pk^ak
 *  We represent in 2D array format as
 *    n = [[p1, a1], [p2, a2], [p3, a3], ... [pk, ak]]
 * 
 *  If ai == 1, below should also valid
 *   n = [p1, a1], [p2, a2], ... pi, ... [pk, ak]
 */

import { is_prime } from "./primes";

export type Factor = {
  p : number | bigint,
  k : number | bigint
}

export type PrimeFactorCount = {
  t : number | bigint, // total number of prime factor
  d : number | bigint // total number of distinct prime factor
}

export type FactorOut = {
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
  var n_ = BigInt(n),
  i_ = 2n,
  factors : Factor[] = [{k : 1, p : 1}]
  ;
  if (is_prime(n_)) return [{k : 1, p : 1}, {p:n_, k:1}];
  while (i_ * i_ <= n_) {
    if (n_% i_) {
      i_++;
      continue;
    } 
    if (is_prime(n_)) return [...factors, {p : n_, k : 1}];
    var lfactor = {p : i_, k : 0}; 
    while (n_ % i_ == 0n) {
      n_ /= i_;
      lfactor.k += 1;
    }
    factors = [...factors, lfactor]
  } 
  if (n_ != 1n ) return [...factors, {p : n_, k : 1}]
  return factors;
}

export function factorize$k(n : number, k = 2) : Factor[]{
  var n_ = BigInt(n),
  i_ = 1n,
  lfactor = {p : 0n, k : 0n},
  factors : Factor[] = []
  ;

  while (i_ * i_ <= n_) {
    if (is_prime(n_)) return [{p : n_, k : 1}]; // if number is prime return single factor
    
    while (n_% ++i_ && i_ * i_<= n_); // search number such that n_ % i_ == 0

    lfactor = {p : i_, k : 0n}; 

    while (n_ % i_ == 0n) { // remove all occurences of factor i_ from n_
      n_ /= i_;
      lfactor.k += 1n;
    }

    factors = [...factors, lfactor]; // adding factor to factor list

    if (factors.length + 1 == k) return [...factors, {p:n_, k:1}] // returning at most k factor
  } 
  return factors;
}

export function square_free(n : number | bigint) : boolean {
  var n_ = BigInt(n), 
  i_ = 1n;
  while(i_ * i_ < n_) {
    if (is_prime(n_)) return true;
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
    if (is_prime(n_)) return {t : res.t + 1, d : res.d + 1};
    while(n_ % ++i_ && i_ * i_ < n_); 
    res.d += 1;
    while(n_ % i_ == 0n) {
      res.t += 1; // counts number of times 'i_' occurs in 'n_' and add it to total
      n_ /= i_;
    }
  }  
  if (n_ != 1n) res = {t : res.t + 1, d : res.d + 1};
  return res;
}

/**
 * 
 * @param n 
 * @returns true if number 1 distinct prime factor, else false
 */
export function prime_factor_count$1(n : number | bigint) : boolean {
  var n_ = BigInt(n), 
  i_ = 1n;
  while(i_ * i_ < n_) {
    if (is_prime(n_)) return true;
    while(n_ % ++i_ && i_ * i_ < n_); 
    console.log(n_, i_);
    
    while(n_ % i_ == 0n) n_ /= i_;
    if (n_ != 1n) return false; // don't has single prime factor
  } return true // has single prime factor
}

export function prime_factor_count$k(n : number | bigint, k : number | bigint = 1) {
  var n_ = BigInt(n), 
  i_ = 1n,
  k_ = BigInt(k)
  ;
  while(i_ * i_ < n_) {
    if (is_prime(n_)) return k_ == 1n;
    while(n_ % ++i_ && i_ * i_ < n_); 
    while(n_ % i_ == 0n) n_ /= i_;
    if (--k_ == 0n && n_ != 1n) return false;
  } return true
}