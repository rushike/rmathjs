import {bigdecimal, decimal} from "../../src/dtype/R"

describe("test real (R) dtype : ", ()=>{
  it("test add method -> ", ()=>{
    var a = bigdecimal("100.212"),
    b = bigdecimal("0.3")
    ;

    var expected = bigdecimal("100.512");
    var res = a.add(b);

    expect(res).toEqual(expected);
    
  })

  test("test sub method -> ", ()=>{
    var a = bigdecimal("100.212"),
    b = bigdecimal("0.3")
    ;

    var expected = bigdecimal("99.912");
    var res = a.sub(b);

    expect(res).toEqual(expected);
  })

  it("test mul method -> ", ()=>{
    var a = bigdecimal("-0.25"),
    b = bigdecimal("25.0")
    ;

    var expected = bigdecimal("-6.250");
    var res = a.mul(b);
    
    expect(res).toEqual(expected);
  })

  it("test div method -> ", ()=>{
    var a = bigdecimal("1000.06866765765765765"),
    b = bigdecimal("125.08987879798797")
    ;

    var expected = bigdecimal("7.99480083654652511164761560965225231");
    var res = a.div(b, 32);
    
    expect(res).toEqual(expected);
  })

  it("test square method -> ", ()=>{
    var a = decimal(0.5),
      expected = decimal(0.25)

    var res = a.square();

    expect(res).toEqual(expected);
    
  })

  it("test powz method -> ", ()=>{
    var a = decimal("1.73"),
      n = [0, 1, 3, 7, 20],
      expected = ["1.0", "1.73", "5.177717", "46.37914326451397", "57666.2967582119225852461315633641336800581201"].map(decimal)
      ;
    var res = n.map(n=>a.powz(n));
    
    expect(res).toEqual(expected);
  })

  it("test addinv -> ", ()=>{
    var a = decimal(1212.29102910),
      expected = decimal(-1212.29102910)
    ;
    var res = a.addinv();

    expect(res).toEqual(expected)
    
  })

})