import { MILLER_RABIN_K_BASES } from "../constants";
import { gcd, pow } from "./basic";
import { factor_out } from "./factorize";

export function is_prime(n : number | bigint) {

}

export function is_relatively_prime(n : number | bigint , l : number | bigint | Array<number> | Array<bigint>) {
  if (typeof l === 'number' || typeof l === 'bigint') gcd(n, l);
}



/**
 * Input #1: n > 3, an odd integer to be tested for primality
    Input #2: k, the number of rounds of testing to perform
    Output: “composite” if n is found to be composite, “probably prime” otherwise

    write n as 2s·d + 1 with d odd (by factoring out powers of 2 from n − 1)
    WitnessLoop: repeat k times:
        pick a random integer a in the range [2, n − 2]
        x ← a^d mod n
        if x = 1 or x = n − 1 then
            continue WitnessLoop
        repeat s − 1 times:
            x ← x2 mod n
            if x = n − 1 then
                continue WitnessLoop
        return “composite”
    return “probably prime”
 * 
 * 
 * @param n 
 * @param k 
 */

export function miller_rabin_primality(n : number | bigint, k : number | number[]= MILLER_RABIN_K_BASES) {
  const k_ = (typeof k === 'number') ? MILLER_RABIN_K_BASES.slice(0, k) : k;
  var n_ = BigInt(n);
  var prime = true;
  // decompose n as n = 2^s * d + 1
  var {f : {p : p_, k : s_}, d : d_} = factor_out(n_, 2);
  
  k_.forEach(a_=> {
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