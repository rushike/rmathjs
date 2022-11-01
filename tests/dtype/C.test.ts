import {complex} from "../../src/dtype/C"
import { decimal } from "../../src/dtype/R";

describe("test complex (C) dtype : ", ()=>{
  it("test add method -> ", ()=>{
    var a = complex("3+4i"),
      b = complex("2+3i"),
      expected = complex("5+7i")
      ;
    var res = a.add(b)

    expect(res).toEqual(expected);

  })

  it("test sub method -> ", ()=>{
    var a = complex("7+11i"),
      b = complex("2+3i"),
      expected = complex("5+8i")
      ;
    var res = a.sub(b)

    expect(res).toEqual(expected);
  })


  it("test mul method -> ", ()=>{
    var a = complex("7+11i"),
      b = complex("2+3i"),
      expected = complex("-19+43i")
      ;
    var res = a.mul(b)
    
    expect(res).toEqual(expected);
  })

  it("test div method -> ", ()=>{
    var a = complex("7+11i"),
      b = complex("2+3i"),
      expected = complex(
        `3.61538461538461538461538461538461`+
        `+0.07692307692307692307692307692307i`
        )
        ;
    var res = a.div(b)
    
    expect(res).toEqual(expected);
  })

  it("test square function -> ", ()=>{
    var a = complex("1+i"),
      expected = complex("2i");
    ;
    var res = a.square();

    expect(res).toEqual(expected)
    
  })

  it("test powz function -> ", ()=>{
    var a = complex("1+i"),
    expected = [complex(1), a, complex("2i"), complex(-4), complex("8-8i"), complex(16)]
    ;
    var  res = [0, 1, 2, 4, 7, 8].map(n=>a.powz(n))

    expect(res).toEqual(expected);
    
  })

  it("test conjugate function -> ", ()=>{
    var a = complex("5656.5+89.89i"),
      expected = complex("5656.5 - 89.89i")
    ;
    var res = a.conjugate();
    
    expect(res).toEqual(expected)
    
  })

  it("test real function -> ", ()=>{
    var a = complex(" - 78.788 + 78787i"),
    expected = decimal("-78.788")
    ;

    var res = a.real();
    expect(res).toEqual(expected);
  })

  it("test complex function -> ", ()=>{
    var a = complex(" - 78.788 + 985 i"),
    expected = decimal("985")
    ;

    var res = a.imaginary();
    
    expect(res).toEqual(expected);
  })
})