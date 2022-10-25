import { assert } from "console";
import { mangoldt, mu, phi } from "../../src/functions/arithmetic"

describe("test arithmetic functions : ", ()=>{
  it("test euler totient function φ(n) -> ", ()=>{
    var expected = [0n, 1n, 66n, 2908n, 9672n, 29528064n, 2056632768n, 873767328n]
    var res = [1, 2, 67, 2909, 29034, 120910920, 3913091091, 1029012901].map(phi);
    expect(res).toEqual(expected);
    
  })
  it("test mobius function μ(n) ->", ()=>{
    var expected = [1n, -1n, -1n, -1n, 0n, 0n, 0n, -1n]; 
    var res = [1, 2, 67, 2909, 29034, 120910920, 3913091091, 1029012901].map(mu);
    expect(res).toEqual(expected);
  })

  it("test mangoldt function Λ(n) -> ", ()=>{
    var expected = [0, 1, 0, 0, Math.log2(7)]
    var res = [12, 32, 123, 333, 343].map(mangoldt);    
    expect(res).toEqual(expected);
  })
})