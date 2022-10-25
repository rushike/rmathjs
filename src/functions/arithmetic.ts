import { pow } from "./basic";
import { factorize, factorize$k, prime_factor_count, prime_factor_count$1 } from "./factors";
import { miller_rabin_primality } from "./primes";

export function phi(n : number | bigint) {
  if (miller_rabin_primality(n)) return BigInt(n) - 1n;
  var n_ = BigInt(n),
  factors = factorize(n);
  
  return factors.reduce((acc : bigint, factor) => {
    var p_ = BigInt(factor.p);
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