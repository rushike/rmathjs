import { InvalidNumberFormatError } from "../error";
import { N } from "./N"
import { decimal, R, Ri, BigDecimal } from "./R"

export type Ci = Complex | Ri;

export interface C extends N {
  a : BigDecimal, // real part
  b : BigDecimal // complex part
}

class Complex implements C {
  // private static COMPLEX_STRING_MATCH_EXP = /(?<real>\-?\d+)\s*([+]?\s*(?<imaginary>\d*)i)?/
  private static COMPLEX_STRING_MATCH_EXP = /(?<real>(?<integer_r>\-?\s*[\d]+)(\.(?<fraction_r>[\d]+))?)\s*([+]?\s*(?<imaginary>((?<integer_i>\-?\s*[\d]+)(\.(?<fraction_i>[\d]+))?)\s*)i)?/

  a: BigDecimal
  b: BigDecimal

  constructor(a : BigDecimal, b : BigDecimal){
    this.a = a;
    this.b = b;
  }

  set({a, b} : {a : BigDecimal | undefined, b : BigDecimal | undefined}) {
    if(a) this.a = a;
    else if (b) this.b = b;
  }

  clone() {
    return new Complex(this.a, this.b);
  }

  static parse(a : Ri | Complex , b : Ri | undefined = undefined) {
    if (typeof a === 'string' && !b) { // complex number as string
      var match = a.match(Complex.COMPLEX_STRING_MATCH_EXP)
      if(!match) throw new InvalidNumberFormatError(`${a} not in fraction format ${Complex.COMPLEX_STRING_MATCH_EXP}`)      
      return new Complex(decimal(match.groups?.real || 0), decimal(match.groups?.imaginary || 0));
    } 
    else if (a instanceof Complex) { // as complex number
      return a.clone();
    }
    else if (a && !b) {
      return new Complex(decimal(a), decimal(0));
    }
    else if (a && b) { // as real (a) and imaginary (b) part
      return new Complex(decimal(a), decimal(b));
    }

    throw new InvalidNumberFormatError(`Can't parse a = ${a}, b = ${b} as complex number, not satified any condition`)
  }

  add(b: Ci) {
    var a_ = this.clone(),
    b_ = Complex.parse(b)
    ;
    
    return new Complex(a_.a.add(b_.a), a_.b.add(b_.b))
  }

  sub(b: Ci) {
    var a_ = this.clone(),
    b_ = Complex.parse(b)
    ;
    return new Complex(a_.a.sub(b_.a), a_.b.sub(b_.b))
  }

  mul(b: Ci) {
    var a_ = this.clone(), // a1 + ib1
    b_ = Complex.parse(b), // a2 + ib2
    r_ = a_.a.mul(b_.a).sub(a_.b.mul(b_.b)), // a1 * a2 - b1 * b2
    i_ = a_.a.mul(b_.b).add(a_.b.mul(b_.a))  // a1 * b2 + b1 * a2
    ;
    
    return new Complex(r_, i_);
  }

  div(b: Ci) {
    var a_ = this.clone(), // a1 + ib1
    b_ = Complex.parse(b), // a2 + ib2
    c_ = b_.conjugate(), // a2 - ib2
    s_ = b_.a.square().add(b_.b.square()), // a2 * a2 + b2 * b2
    n_ = a_.mul(c_) // a_ * ^b_

    return new Complex(n_.a.div(s_), n_.b.div(s_)); // n_.a / s_ + i n_.b / s_
  }

  conjugate() { // ^a = this.conjugate
    return new Complex(this.a, this.b.addinv());
  }

  modulus () {
    return 
  }

  // mag = this.modulus;

  // abs = this.modulus;

  real () {
    return this.a.clone();
  }

  imaginary() {
    return this.b.clone();
  }

}

export const complex = (a :Ci , b : Ri | undefined = undefined)=>{
  return Complex.parse(a, b);
}