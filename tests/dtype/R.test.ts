import _ from "lodash";
import { E } from "../../src/constants";
import {BigDecimal, bigdecimal, decimal} from "../../src/dtype/R"

describe("test real (R) dtype : ", ()=>{
  it("test parse function --> ", ()=>{
    var a = BigDecimal.parse(0.000001)
    console.log(a);
    
  })


  it("test less than (lt) -> ", ()=>{
    var a = bigdecimal("0.9966512720558647"),
    b = bigdecimal("0.000001")
    ;

    var res = a.lt(b)

    expect(res).toBe(false)
    
  })

  it("test abs function -> ", ()=>{
    var a = bigdecimal("-100.212"),
      expected = decimal(100.212)
    ;

    var res = a.abs();

    expect(res).toEqual(expected)
    
  })

  it("test add method -> ", ()=>{
    var a = bigdecimal("100.212"),
    b = bigdecimal("0.3")
    ;

    var expected = bigdecimal("100.512");
    var res = a.add(b);

    expect(res).toEqual(expected);
    
  })

  test("test sub method -> ", ()=>{
    var a_ = [decimal("100.212"), decimal(0), ],
    b_ = [decimal("0.3"), decimal("121.90")]
    ;

    var expected = [decimal("99.912"), decimal("-121.90")];
    var res = _.zip(a_, b_).map(([a, b]) => a && b && a.sub(b));

    expect(res).toEqual(expected);
  })

  it("test mul method -> ", ()=>{
    var a = bigdecimal("-4654564.25"),
    b =  bigdecimal("25.0")
    ;

    var expected = bigdecimal("-116364106.25");
    var res = a.mul(b);
    
    expect(res).toEqual(expected);
  })

  it("test div method -> ", ()=>{
    var a = bigdecimal("1000.06866765765765765"),
    b =  bigdecimal("125.08987879798797"),
    expected = [bigdecimal("7.99480083654652511164761560965225"), decimal("7.9948008365")]
    ;
    var res =  [a.div(b, 32), a.div(b, 10)];

    expect(res).toEqual(expected);
  })

  it("test floor function -> ", ()=>{
    var a = decimal(67.7879876887);
    expect(a.floor()).toBe(67n);
  })

  it("test ceil function -> ", ()=>{
    var a = decimal("7878989879879879.786876876786876876853543212332132");
    expect(a.ceil()).toBe(7878989879879880n)
  })

  it("test round function -> ", ()=>{
    var a = decimal("7.784687687"),
      r_ = [0, 1, 2, 3, 4],
      expected = [8, 7.8, 7.78, "7.785", "7.7847"].map(decimal),
      res = r_.map(r=>a.round(r))
      ;

    expect(res).toEqual(expected)
    
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

  it("test log$characteristic -> ", ()=>{
    var a_ = [1, 23, 67, 143, 1222, 6876, 8979.90909].map(decimal),
      expected = [0n, 4n, 6n, 7n, 10n, 12n, 13n]
    ;
    var res = a_.map(a=> a.log$characteristic(2))

    expect(res).toEqual(expected)
    
  })

  it("test nroot function -> ", ()=>{
    var a = decimal(94726.60004000209),
      n = decimal(9),
      expected = decimal("3.57224574619272363069927149115523392407182692585049491271152897570245622639144292738248494810421189275321821334278739034607453733")
      ;

    var res= a.nroot(n);

    expect(res).toEqual(expected);
    
  })

  it("test toprecision -> ", ()=>{
    var e = decimal(E),
      expected = decimal("2.7182818284590452353602874713526624977572470936999595749669676277")
    ;

    var res = e.toprecision(64)


    expect(res).toEqual(expected)
    

  })

  it("test function chaining -> ", ()=>{
    var a = decimal(1), b = decimal(2),
      expected = decimal(0.5)
    ;
    var res = b.sub(a).div(b);

    expect(res).toEqual(expected);
    
  })
})