import {fraction} from "../../src/dtype/Q"

describe("test rational (Q) dtype : ", ()=>{
  it("test add fraction -> ", ()=>{
    var a = fraction(11, 14),
    b = fraction("19/21")
    ;
    var expected = fraction(71n, 42n);
    var res = a.add(b);

    expect(res).toEqual(expected);
  })

  it("test sub fraction -> ", ()=>{
    var a = fraction(11, 14),
    b = fraction("19/21")
    ;
    var expected = fraction(-5n, 42n);
    var res = a.sub(b);
    
    expect(res).toEqual(expected);
  })

  it("test mul fraction -> ", ()=>{
    var a = fraction(11, 14),
    b = fraction("19/21")
    ;
    var expected = fraction(209n, 294);
    var res = a.mul(b);
    
    expect(res).toEqual(expected);
  })

  it("test div fraction -> ", ()=>{
    var a = fraction(11, 14),
    b = fraction("19/21")
    ;
    var expected = fraction(33n, 38n);
    var res = a.div(b);
    
    expect(res).toEqual(expected);
  })

  
})