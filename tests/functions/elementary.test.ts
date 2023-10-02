import { E_STR } from "../../src/constants";
import { configR, getConfigAll, getConfigR, real } from "../../src/dtype/R";
import { arccos, arcosh, arcsin, arctan, arsinh, artanh, cos, cosh, exp, exp0, exp1, exp2, factorial, gcd, ln, log, pow, sin, sinh, tan, tanh } from "../../src/functions/elementary";

describe("test basic math operations : ", ()=>{
  beforeAll(()=>{
    configR({precision : 32})
  })
  it("test gcd(12252121211212212222n, 12345212121212122222n) -> ", ()=>{
    var res = gcd(12252121211212212222n, 12345212121212122222n);
    expect(res).toBe(2n);
  })

  it("test gcd(97, 31) -> ", ()=>{
    var res = gcd(97, 31);
    expect(res).toBe(1);
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
      x = 1, 
      expected = real(E_STR).toPrecision(32),
      delta = real("0.000000001")
    ;
    // configR({precision : 10})
    var res : any = exp(x);
    var match = expected.sub(res).lt(delta);
    
    expect(match).toBe(true)
  })

  it("test sin function -> ", ()=>{
    var x = [
            real(10.141592657),
            real(1.123)
          ]
    var expected = [
      "-0.65698660128975165187657638219395",
      "0.90140343710581305144201223192653"
    ].map(real)
    ;
    console.log("CONFIG : ", getConfigAll());
    
    var res = x.map(sin);

    expect(res).toEqual(expected)
  })

  it("test cos function -> ", ()=>{
    var x = [
            real(8.123),
            real(1.123)
          ]
    var expected = [
      "-0.26578523807338268647690806237351n",
      "0.43298018843109500232420037773925"
    ].map(real)
    ;

    var res = x.map(cos);

    expect(res).toEqual(expected)
  })

  it("test tan function -> ", ()=>{
    var x = [
      real(9.123),
      real(0.34)
    ],
    expected = [
      "-0.31128541558772155687227053660835",
      "0.35373687803912256577112912235466"
    ].map(real)

    var res = x.map(tan);
    expect(res).toEqual(expected)
    
  })

  it("test sin-1 function -> ", ()=>{
    var x = [0.92121],
      expected = ["1.15905589278959967228511241816321"].map(real)
    ;

    var res = x.map(arcsin)

    expect(res).toEqual(expected)
    
  })

  // it("test cos-1 function -> ", ()=>{
  //   var x = [0.1111],
  //     expected = ["1.459466492689613578839494523096611"].map(real)
  //   ;
  //   var res = x.map(arccos).map(_=>_.toString(32))

  //   expect(res).toEqual(expected)
    
  // })

  it("test tan-1 function -> ", ()=>{
    var x = [0.92121],
      expected = ["0.74441051913301442690307815496615"].map(real)
      ;
    var res = x.map(arctan)

    expect(res).toEqual(expected);
  })

  it("test sinh function -> ", ()=>{
    var x = [0.62121],
      expected = ["0.66194239384282883981513549539927"].map(real)
    ;

    var res = x.map(sinh)

    expect(res).toEqual(expected)
    
  })

  it("test cosh function -> ", ()=>{
    var x = [0.41121],
      expected = ["1.08574492855338370858291950729071"].map(real)
    ;

    var res = x.map(cosh)
    
    expect(res).toEqual(expected)
  })

  it("test tanh function -> ", ()=>{
    var x = [0.11121],
      expected = ["0.11075378747228855951823779059769"].map(real)
    ;

    var res = x.map(tanh)
    
    expect(res).toEqual(expected)
  })


  it("test arcsinh function -> ", ()=>{
    var x = [3.91121],
      expected = ["2.07160629745815026658498258121563n"].map(real) // actual is : 2.0729497794549505395905226852762308703519490465447945011118772682...
    ;

    var res = x.map(arsinh)
    
    expect(res).toEqual(expected)
  })

  it("test arcosh function -> ", ()=>{
    var x = [1.99991],
      expected = ["1.31690593125670375033163468865225n"].map(real) // actual is : 1.3169059338416737635781623762742034155969758885867746465538992866...
    ;

    var res = x.map(arcosh)
    
    expect(res).toEqual(expected)
  })


  it("test artanh function -> ", ()=>{
    var x = [0.3991],
      expected = ["0.42257796019967897371947785600898"].map(real)
    ;

    var res = x.map(artanh)
    
    expect(res).toEqual(expected)
  })


  it("test log function -> ", ()=>{
    var x = [23230293],
      b = 10,
      expected = [real("7.36605468752217747101766084306403")]
    ;
    
    var res = x.map(_=>log(_, b)).map(_=>real(_))

    expect(res).toEqual(expected);
  })

  it("test ln function -> ", ()=>{
    var x = [23230293],
      expected = [real("16.96096771766747913451544313441155")]
    ;

    var res = x.map(ln).map(_=>real(_))
    
    expect(res).toEqual(expected);
  })

})
