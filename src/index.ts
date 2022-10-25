import {gcd, is_prime_slow, pow, factorial, primes} from "./functions/basic"

import {miller_rabin_primality} from "./functions/primes"
import { random_int } from "./functions/random";
import {factorize, factor_out, prime_factor_count, prime_factor_count$1, prime_factor_count$k, square_free} from './functions/factors'
import { mangoldt, mu, phi } from "./functions/arithmetic";
import { Try } from "./utils";

// console.time("gcd")
// console.log(gcd(12252121211212212222n, 12345212121212122222n));
// console.timeEnd("gcd")

// console.time("sieve_of_eratosthenes")
// console.log(primes(100000000).length); //sieve_of_eratosthenes: 342.011ms
// console.timeEnd("sieve_of_eratosthenes")

// console.time("pow")
// console.log(pow(2, 96, 97)); 
// console.timeEnd("pow")

// console.time("is_prime_slow")
// console.log(is_prime_slow(1000000007)); 
// console.timeEnd("is_prime_slow")


// console.time("random_int")
// console.log(random_int(0, 12));
// console.timeEnd("randome_int")

// console.time("miller_rabin_primality")
// console.log(miller_rabin_primality(5));
// console.timeEnd("miller_rabin_primality")


// console.time("factor_out")
// console.log(factor_out(97, 2));
// console.timeEnd("factor_out")






// console.time("factorize")
// console.log(factorize(12192819281928198291821111112n)); 
// console.timeEnd("factorize")

// console.time("phi")
// console.log(phi(10000210291092)); 
// console.timeEnd("phi")

// console.time("square_free")
// console.log(square_free(2677)); 
// console.timeEnd("square_free")

// console.time("prime_factor_count")
// console.log(prime_factor_count(12192819281928198291821111112n)); 
// // console.log(prime_factor_count(4294967296)); 
// console.timeEnd("prime_factor_count")

// console.time("mu")
// console.log(mu(12192819281928198291821111114n)); // return 1
// console.timeEnd("mu")

// console.time("prime_factor_count$1")
// console.log(prime_factor_count$1(12192819281928198291821111114n)); // return 1
// console.timeEnd("prime_factor_count$1")

// console.time("prime_factor_count$k")
// console.log(prime_factor_count$k(12192819281928198291821111111n, 6)); // return 1
// console.timeEnd("prime_factor_count$k")

// console.time("factorize$1")
// console.log(factorize$1(4294967296)); // return 1
// console.timeEnd("factorize$1")

// console.time("mangoldt")
// console.log(mangoldt(40)); // return 1
// console.timeEnd("mangoldt")

function f() {
  if(Math.random() < 0.5)  throw new Error("This is error");
  console.log("With no Error")
}

