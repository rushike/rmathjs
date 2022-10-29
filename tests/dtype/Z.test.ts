import {_factorial, _oddprod, _pow, _serialfactorial} from "../../src/dtype/Z"

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

  it("test _pow function -> ", ()=>{
    var n = [0, 1, 2, 5, 12],
      expected = [1n, 2n, 4n, 32n, 4096n]
      ;
    var res = n.map(n_=>_pow(2, n_));
    expect(res).toEqual(expected);
  })
})