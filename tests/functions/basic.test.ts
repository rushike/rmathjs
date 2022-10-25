import { factorial, gcd, is_prime_slow, pi, pow, sieve_of_eratosthenes } from "../../src/functions/basic";

describe("test basic math operations : ", ()=>{
  it("test gcd(12252121211212212222n, 12345212121212122222n) -> ", ()=>{
    var res = gcd(12252121211212212222n, 12345212121212122222n);
    expect(res).toBe(2n);
  })

  it("test gcd(97, 31) -> ", ()=>{
    var res = gcd(97, 31);
    expect(res).toBe(1n);
  })

  it("test factorial(100) = 100! -> ", ()=> {
    var res = factorial(100);
    expect(res).toBe(93326215443944152681699238856266700490715968264381621468592963895217599993229915608941463976156518286253697920827223758251185210916864000000000000000000000000n);
  })

  it("test pow (2, 45, 67) -> ", ()=> {
    var res = pow(2, 45, 67);
    expect(res).toBe(58n);
  });

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
