import { pow } from "./basic";
import { factorize, prime_factor_count } from "./factorize";
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
  if (total_prime_no != distinct_prime_no) return 0n;
  return pow(-1, total_prime_no);

}