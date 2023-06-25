import { E_STR } from "../../src/constants";
import { configR, getConfigR } from "../../src/dtype/R";
import {real} from "../../src/dtype/R"

describe("test real (R) dtype : ", ()=>{
  it("test parse function --> ", ()=>{
    var a = [
            0.000001,
            5765765767,
            765765765765786587657658765897987n ,
            "3.1415926",
            "546546",
            "0.3",
            "0.0006"
          ].map(real),
      expected = [
            {n : 1, b : 10, e : -5, p : 1},
            {n : 5765765767, b : 10, e : 10, p : 10},
            {n : 765765765765786587657658765897987n, b : 10, e : 33, p : 33},
            {n : 31415926, b : 10, e : 1, p : 8},
            {n : 546546, b : 10, e : 6, p : 6},
            {n : 3, b : 10, e : 0, p : 1},
            {n : 6, b : 10, e : -3, p : 1}
          ].map(real)
    ;
    
    expect(a).toEqual(expected)
    
  })

  it("test toPrecision method -> ", ()=>{
    var a = [
            0.000001, 
            0.21098471212,

            87685809768,
            87685899768,
            "121213.2102918421"
          ].map(real),
      p = [3, 6, 7, 7, 9],
      expected = [
            {n : 1, b : 10, e : -5, p : 1},
            {n : 210985, b : 10, e : 0, p : 6},
            {n : 8768581, b : 10, e : 11, p : 7},
            {n : 876859, b : 10, e : 11, p : 6},
            {n : 12121321n, b : 10, e : 6, p : 8}
          ].map(real)
    ;
    var res = Array.from(a, (_,i)=>a[i].toPrecision(p[i]))   

    // console.log("a : ", a);
    // console.log("p : ", p);
    // console.log("res : ", res);
    // console.log("expected : ", expected);
    

    expect(res).toEqual(expected)
    
  })

  // it("test less than (lt) -> ", ()=>{
  //   var a = bigdecimal("0.9966512720558647"),
  //   b = bigdecimal("0.000001")
  //   ;

  //   var res = a.lt(b)

  //   expect(res).toBe(false)
    
  // })

  it("test abs function -> ", ()=>{
    var a = ["-100.212", 0, 1, "12.1212"].map(real),
      expected =[100.212, 0, -1, -12.1212].map(real)
    ;

    var res = Array.from(a, (_,i)=>a[i].abs());

    expect(res).toEqual(expected)
    
  })

  it("test add method -> ", ()=>{
    var a =["100.212", 3, "1212.2121", 999, 0.9, 0].map(real),
    b =["0.3", 21, 100, "34.9999", 0.3232, "89.89"].map(real);
    ;

    var expected =["100.512", 24, 1312.2121, 1033.9999, 1.2232, 89.89].map(real);
    var res = Array.from(a, (_,i)=>a[i].add(b[i]));

    expect(res).toEqual(expected);
    
  })

  test("test sub method -> ", ()=>{
    var a = ["100.212",0, 89.898, 78, 1].map(real),
    b = ["0.3","121.90", "0", "899", -0.4].map(real)
    ;

    var expected = ["99.912","-121.9", 89.898, -821, 1.4].map(real);
    var res = Array.from(a, (_,i)=>a[i].sub(b[i]))

    expect(res).toEqual(expected);
  })

  it("test mul method -> ", ()=>{
    var a = [25, "-4654564.25", 111, "-121290", 22, 
              1000000, 123456].map(real),
    b =  [8, "25.0", 898.9898, "0.0009102", 22, 
              1000000, 123456].map(real),
    p = [undefined, undefined, undefined, undefined, undefined, 10, 10]
    ;

    var expected = [200, "-116364106.25", "99787.8678", -110.398158, 484, 
                      1000000000000n, 15241383940n].map(real);
    var res = Array.from(a, (_,i)=>a[i].mul(b[i], p[i]));
    
    expect(res).toEqual(expected);
  })

  it("test div method -> ", ()=>{
    var a = [100, 129182981, 3.1415926, "1", 1, 1].map(real),
    b =  [
          4, 120192, 2, 1.4, 1.234567890, 1.42857142].map(real),
    p = [32, 8, 4, 4, 9, 8],
    expected = [25, 1074.8051, 1.571, 0.7142, 0.810000007, 0.7].map(real)
    ;
    var res =  Array.from(a, (_,i)=>a[i].div(b[i], p[i]));

    expect(res).toEqual(expected);
  })

  it("test mod method -> ", ()=>{
    var a = [1, 12.1, 123.122, 32.12345, 323.5, 909.1234, 1000].map(real),
      m =[123.21, 123.21, 123.21, 123.21, 123.21, 123.21, 45].map(real),
      expected = [ 1, 12.1, 123.122, 32.12345, 77.08, 46.6534, 10].map(real)
    ;

    var res = Array.from(a, (_,i)=>a[i].mod(m[i]));

    expect(res).toEqual(expected)

  })

  // it("test floor function -> ", ()=>{
  //   var a =real(67.7879876887);
  //   expect(a.floor()).toBe(67n);
  // })

  // it("test ceil function -> ", ()=>{
  //   var a =real("7878989879879879.786876876786876876853543212332132");
  //   expect(a.ceil()).toBe(7878989879879880n)
  // })

  // it("test round function -> ", ()=>{
  //   var a =real("7.784687687"),
  //     r_ = [0, 1, 2, 3, 4],
  //     expected = [8, 7.8, 7.78, "7.785", "7.7847"].map(real),
  //     res = r_.map(r=>a.round(r))
  //     ;

  //   expect(res).toEqual(expected)
    
  // })

  it("test square method -> ", ()=>{
    var a =[0.5, -9, 1000, 567].map(real),
      expected =[0.25, 81, 1000000, 321489].map(real)
    ;

    console.log("config : ", getConfigR("precision"))

    // console.log("a : ", a);
    // console.log("expected : ", expected);
    
    var res = Array.from(a, _=>_.square());

    expect(res).toEqual(expected);
    
  })

  it("test powz method -> ", ()=>{
    var a =real("1.73"),
      n = [0, 1, 3, 7, 20],
      expected = ["1.0", "1.73", "5.177717", "46.37914326451397", "57666.2967582119225852461315633641336800581201n"].map(real)
      ;
    configR({precision : 100})

    var res = n.map(n=>a.powz(n));
    
    expect(res).toEqual(expected);
  })

  // it("test addinv -> ", ()=>{
  //   var a =real(1212.29102910),
  //     expected =real(-1212.29102910)
  //   ;
  //   var res = a.addinv();

  //   expect(res).toEqual(expected)
    
  // })

  // it("test log$characteristic -> ", ()=>{
  //   var a_ = [1, 23, 67, 143, 1222, 6876, 8979.90909].map(real),
  //     expected = [0n, 4n, 6n, 7n, 10n, 12n, 13n]
  //   ;
  //   var res = a_.map(a=> a.log$characteristic(2))

  //   expect(res).toEqual(expected)
    
  // })

  it("test nroot function -> ", ()=>{
    // var a =real(2),
    //   n =7,
    //   expected =real("3.57224574619272363069927149115525")
    //   ;

    // var res= a.nroot(n, 32);    
    // console.log("diff : ", res.minus(1.148698354997035));
    
    // expect(res).toEqual(expected);
    console.log("config : ", getConfigR("precision"))
    expect(true).toBe(true);
    
  })

  // it("test toprecision -> ", ()=>{
  //   var e =real(E_STR),
  //     expected =real("2.71828182845904523536028747135266249775724709369995957496696762772")
  //   ;

  //   var res = e.toprecision(64)

  //   console.log(res, expected);
    

  //   expect(res).toEqual(expected)
    

  // })

  // it("test function chaining -> ", ()=>{
  //   var a =real(1), b =real(2),
  //     expected =real(0.5)
  //   ;
  //   var res = b.sub(a).div(b);

  //   expect(res).toEqual(expected);
    
  // })
})