import {shiftleft, _factorial, _log, _oddprod, _pow, _serialfactorial} from "../../src/dtype/Z"

describe("test integer (Z) functions : ", ()=>{
  it("test odd product of n -> ", ()=>{
    var res = _oddprod(1n, 33n)
    expect(res).toBe(6332659870762850625n)
  })

  it("test serial factorial of n -> ", ()=>{
    var res = _serialfactorial(37);
    expect(res).toBe(13763753091226345046315979581580902400000000n)    
  })

  it("test factorial of n -> ", ()=>{
    var res = _factorial(37);
    expect(res).toBe(13763753091226345046315979581580902400000000n)
    
  })

  it("test _log function -> ", ()=>{
    var n = [1, 123, 129093, 910291221212, 121219218928212n, 4121323827947628374682736582763857687265287367867464353424324325657n],
      b_ = 10n,
      expected = [ 0n, 2n, 5n, 11n, 14n, 66n ]
    ;
    var res = n.map(n_ =>_log(n_, b_));
    expect(res).toEqual(expected);
  })

  it("test _pow function -> ", ()=>{
    var n = [0, 1, 2, 5, 12],
      expected = [1n, 2n, 4n, 32n, 4096n]
      ;
    var res = n.map(n_=>_pow(2, n_));
    expect(res).toEqual(expected);
  })

  it("test leftshift function ->", ()=>{
    var n = [1, 2, 3, 7, 57, 61], 
      x = [1, 3, 6, 130, 7, 5]
    ;
    
    var res = Array.from(n, (_, i) => shiftleft(n[i], x[i]));
    
  })
})