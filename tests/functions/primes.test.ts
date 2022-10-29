import { is_prime_slow, is_relatively_prime, miller_rabin_primality, pi, sieve_of_eratosthenes } from "../../src/functions/primes"

describe("test the prime number functions : ", ()=>{
  it("test is_relatively_prime(12252121211212212222n, 12345212121212122222n) = false -> ", ()=>{
    var res = is_relatively_prime(12252121211212212222n, 12345212121212122222n)
    expect(res).toBe(false);
  })

  it("test is_relatively_prime(40, 77) = true ->", ()=>{
    var res = is_relatively_prime(40, 77);
    expect(res).toBe(true);
  })
  
  it("test miller_rabin_primality(1000123465987) = true ->", ()=>{
    var res = miller_rabin_primality(1000123465987);
    expect(res).toBe(true);
  })


  it("test is_prime_slow", ()=>{
    var res = is_prime_slow(1000000007);
    expect(res).toBe(true);
  })

  it("test sieve_of_eratosthenes < 100000000 -> ", ()=>{
    var res = sieve_of_eratosthenes(100000000).length;
    expect(res).toBe(5761455);
  })

  it("test π(n) = π(100000000) -> ", ()=>{
    var res = pi(100000000);
    expect(res).toBe(5761455);
  })
})
