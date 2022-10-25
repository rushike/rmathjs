import {gcd, is_prime_slow, pow, factorial, primes} from "./functions/basic"

import {miller_rabin_primality} from "./functions/primes"
import { random_int } from "./functions/random";
import {factorize, factor_out, prime_factor_count, square_free} from './functions/factorize'
import { mu, phi } from "./functions/arithmetic";

// console.time("gcd")
// console.log(gcd(12252121211212212222n, 12345212121212122222n));
// console.timeEnd("gcd")

// console.time("sieve_of_eratosthenes")
// console.log(primes(100000000).length); //sieve_of_eratosthenes: 342.011ms
// console.timeEnd("sieve_of_eratosthenes")

// console.time("pow")
// console.log(pow(2, 96, 97)); 
// console.timeEnd("pow")


// console.time("random_int")
// console.log(random_int(0, 12));
// console.timeEnd("randome_int")

// console.time("factor_out")
// console.log(factor_out(97, 2));
// console.timeEnd("factor_out")


// console.time("miller_rabin_primality")
// console.log(miller_rabin_primality(1000000007 ));
// console.timeEnd("miller_rabin_primality")


// console.time("is_prime_slow")
// console.log(is_prime_slow(1000000007)); 
// console.timeEnd("is_prime_slow")

// console.time("factorize")
// console.log(factorize(770)); 
// console.timeEnd("factorize")

// console.time("phi")
// console.log(phi(10000210291092)); 
// console.timeEnd("phi")

// console.time("square_free")
// console.log(square_free(2677)); 
// console.timeEnd("square_free")

// console.time("prime_factor_count")
// console.log(prime_factor_count(10000210291092)); 
// console.log(prime_factor_count(4294967296)); 
// console.timeEnd("prime_factor_count")

// console.time("mu")
// console.log(mu(12192819281928198291821111114n)); // return 1
// console.timeEnd("mu")