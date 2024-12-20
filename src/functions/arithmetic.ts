import { Z, Zi } from "../dtype/Z";
import { pow } from "./elementary";
import { factorize, factorize$k, prime_factor_count, prime_factor_count$1 } from "./factors";
import { miller_rabin_primality } from "./primes";

export function u(n : number | bigint) {
  return 1;
}

export function I(n : Z) {
  if( n === 1 ) return 1;
  return 0;
}

export function N(n : number | bigint) {
  return BigInt(n);
}

export function phi(n : number | bigint) {
  if (n == 1) return 1n;

  if (miller_rabin_primality(n)) return BigInt(n) - 1n;

  let n_ = BigInt(n),
    factors = factorize(n);
  
  if (n_ == 1n) return 1n;
  else if (miller_rabin_primality(n_)) return n_ - 1n;

  return factors.reduce((acc : bigint, factor) => {
    var p_ = BigInt(factor.p);
    if ( p_ == 1n ) return 1n;
    n_ = n_ / p_;
    
    return acc * ( p_ - 1n )
  }, 1n) * n_;
}

export function mu(n : number | bigint) {
  var n_ = BigInt(n),
  {t : total_prime_no, d: distinct_prime_no} = prime_factor_count(n_)
  ;
  if (n_ == 1n ) return 1n;
  if (total_prime_no != distinct_prime_no) return 0n;
  return pow(-1, total_prime_no);
}

export function mangoldt(n : number | bigint) {
  var n_ = Number(n),
  factors = factorize$k(n_, 2);
  ;
  
  if (factors.at(-1)?.p == 1n) return Math.log2(Number(factors.at(0)?.p));

  return 0;
}