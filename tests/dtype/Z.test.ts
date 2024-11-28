import { Z, _factorial, _log, _oddprod, _pow, _serialfactorial, _rightshift, 
  _leftshift, _powm, opr, _plus, _minus, _mul, _div} from "../../src/dtype/Z"

describe("test integer (Z) functions : ", ()=>{
  it("test opr", ()=>{
    var argsarr = [[1, 2, 3, 6], [1n, 2, 3, 6], [1, 2n, 3, 6], 
              [1, 2, 3n, 6], [1, 2, 3, 6n], [1n, 2n, 3n, 6n]],
    fn = (...args : Z[])=>args,
    expected = [[1, 2, 3, 6], [1n, 2n, 3n, 6n], [1n, 2n, 3n, 6n], 
              [1n, 2n, 3n, 6n], [1n, 2n, 3n, 6n], [1n, 2n, 3n, 6n]]
    ;

    var res = Array.from(argsarr, (args : Z[])=>opr(fn, args[0], args[1], args[2], args[3]))

    expect(res).toEqual(expected)
    
  })


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
    var n = [
      1, 123, 129093, 910291221212, 23230293, 121219218928212n, 4121323827947628374682736582763857687265287367867464353424324325657n,
        1811447330133520437185244409047202839350082129106077461837843285664105969862940011082085402705255713970631397157758675193141100287599885013373180624760597160380157751357168864783739382922854764657658719405282973423981447859125433193843972777408028280705279318311530185394414767124602775394239096634311612353312890181881761657378252433231260310449839814860537717164404816857698156937216n
    ],
      b_ = 10n,
      expected = [ 0, 2, 5, 11, 7, 14, 66, 384 ]
    ;
    var res = n.map(n_ =>_log(n_, b_));
    // console.log("a, ", n);
    // console.log("res, ", res);
    // console.log("expected, ", expected);
    
    
    expect(res).toEqual(expected);
  })

  it("test _powm function -> ", ()=>{
    var a = [1, 2, 4, 5, 7],
      n = [0, 1, 2n, 674, 1112],
      m = [12123, 19090990, 928098131, 89798723, 392892928392],
      expected = [1, 2, 16, 38944147n, 233407131721n]
      ;

    var res = n.map((_, i)=>_powm(a[i], n[i], m[i]))

    expect(res).toEqual(expected);
    
  })

  it("test _pow function -> ", ()=>{
    var n = [0, 1, 2, 5, 12, 60],
      expected = [1, 2, 4, 32, 4096, 1152921504606846976n]
      ;
    var res = n.map(n_=>_pow(2, n_));

    expect(res).toEqual(expected);
  })

  it("test rightshift function -> ", ()=>{
    var n = [1, 2, 300, 70000, 5700000000, 61e18], 
      x = [1, 1, 2, 3, 4, 11],
      expected = [0n, 0n, 3n, 70n, 570000n, 610000000n]
    ;
    
    var res = Array.from(n, (_, i) => _rightshift(n[i], x[i])); 
    expect(res).toEqual(expected);
    
    
  })

  it("test leftshift function ->", ()=>{
    var n = [1, 2, 3, 7n, 57, 61], 
      x = [17, 2, 5n, 9, 1, 0],
      expected = [1e17, 200, 300000n, 7000000000n, 570, 61]
    ;
    
    var res = Array.from(n, (_, i) => _leftshift(n[i], x[i]));

    expect(res).toEqual(expected)  
  })

  it("test plus functions -> ", ()=>{
    var a : Z[] = [1, 2n, 3, 4n],
      b : Z[] = [1, 2, 3n, 4n],
      expected : Z[] = [2, 4n, 6n, 8n]
      ;
    var res = Array.from(a, (_,i)=>_plus(a[i], b[i]))

    expect(res).toEqual(expected)
  })

  it("test minus functions -> ", ()=>{
    var a : Z[] = [1, 2n, 13, 24n],
      b : Z[] = [1, 12, 3n, 14n],
      expected : Z[] = [0, -10n, 10n, 10n]
      ;
    var res = Array.from(a, (_,i)=>_minus(a[i], b[i]))
      
    expect(res).toEqual(expected)
  })

  it("test mul functions -> ", ()=>{
    var a : Z[] = [1, 2n, -13, -24n],
      b : Z[] = [1, -12, 3n, -14n],
      expected : Z[] = [1, -24n, -39n, 336n]
      ;
    var res = Array.from(a, (_,i)=>_mul(a[i], b[i]))
      
    expect(res).toEqual(expected)
  })

  it("test div functions -> ", ()=>{
    var a : Z[] = [1, 1112n, -113, -221214n],
      b : Z[] = [167, -12, 3n, -14n],
      expected : Z[] = [0, -92n, -37n, 15801n]
      ;
    var res = Array.from(a, (_,i)=>_div(a[i], b[i]))
    
    console.log("res : ", res);

    expect(res).toEqual(expected)
  })
})

