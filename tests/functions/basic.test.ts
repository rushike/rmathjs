import { E } from "../../src/constants";
import { decimal } from "../../src/dtype/R";
import { exp, exp0, exp1, exp2, factorial, gcd, pow } from "../../src/functions/basic";

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

  it("test exp function -> ", ()=>{
    var
      x = 1.2, 
      res , 
      expected = decimal(E).toprecision(64)
    ;
    console.time("exp_series")
    res = exp1(x);
    console.timeEnd("exp_series")
    console.log("res : ", res);

    console.time("exp_prod")
    res = exp0(x);
    console.timeEnd("exp_prod")
    console.log("res : ", res);


    console.time("exp")
    res = exp(x);
    console.timeEnd("exp")
    console.log("res : ", res);

    console.log("diff : ", expected.lt(res), expected.sub(res));
    
    
  })
})
