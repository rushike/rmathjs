import { factorize, factorize$k, factor_out, prime_factor_count, square_free } from "../../src/functions/factors"

describe("test factors functions :", ()=>{
  it("test factor_out(114) -> ", ()=>{
    var res = factor_out(114, 2);
    expect(res).toEqual({d: 57n, f : {k : 1n, p : 2n}});

  })

  it("test number is square free : a. 2677 b. 28", ()=>{
    var res = square_free(2677);
    expect(res).toBe(true);
    res =  square_free(28)
    expect(res).toBe(false);
  })

  it("test factorize(12192819281928198291821111112n) -> ", ()=>{
    var res = factorize(12192819281928198291821111112n);
    // 2^3×3×73×571×769×2319659×6832559787091
    
    expect(res).toEqual([
      { p: 2n, k: 3 },
      { p: 3n, k: 1 },
      { p: 73n, k: 1 },
      { p: 571n, k: 1 },
      { p: 769n, k: 1 },
      { p: 2319659n, k: 1 },
      { p: 6832559787091n, k: 1 }
    ])
  })

  it("test factorize$k k = 1 ->", ()=>{
    var expected = [1n, 2n, 2n, 19n, 2n, 11n];
    var res = [1, 2, 6, 19, 110, 143].map(n=>factorize$k(n, 1).map(obj=>obj.p).at(0));
    
    expect(res).toEqual(expected);
  })

  it("test prime factor count a. 12192819281928198291821111112n b. 8192 -> ", ()=>{
    var res = prime_factor_count(12192819281928198291821111112n);
    expect(res).toEqual({t: 9, d: 7});
    res = prime_factor_count(8192);
    expect(res).toEqual({t : 13, d: 1});
  })
})


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
