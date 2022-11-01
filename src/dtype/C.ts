import { InvalidNumberFormatError } from "../error";
import { N } from "./N"
import { decimal, R, Ri, BigDecimal } from "./R"

export type Ci = Complex | Ri;

export type C = Complex | R;

export interface Cx {
  a : BigDecimal, // real part
  b : BigDecimal // complex part
}

export class Complex extends N implements Cx {
  /** below matches number of form 
  * 1. 6.4i+5.1    --> whole number in imaginary and real
  * 2. 6.4i        --> whole number in imaginary 2
  * 3. 6.4         --> whole number in real 2
  * 4. 6.4+5.1i    --> real part in real 2
  * 5. 6.4 5.1i    --> first number store in real 2 
  * 6. 5.1 i + 8.7 --> whole number in imaginary and real
  */ 
  private static COMPLEX_REAL_STRING_MATCH_EXP = /(?<imaginary>[\-\+]?\s*\d+(\.\d+)?i)\s*(?<real>[\-\+]?\s*\d+(\.\d+\s*)?)|(?<imaginary2>[\-\+]?\s*\d+(\.\d+)?i)|(?<real2>[\-\+]?\s*\d+(\.\d+\s*)?)/
  
  /** below imaginary part of any complex number
   * 1.  5.898i       --> matched 5.898
   * 2. +5.434i       --> matched +5.434
   * 3. -5.434i       --> matched -5.434
   * 4. +  5.434i     --> matched +  5.434
   * 5. 5.898i  + 9.8 --> matches 5.898
   * 6. +9.8-5.898i   --> matches -5.898
   * 7. +9.8+5.898i   --> matches +5.898
   */
  private static COMPLEX_IMAGINARY_STRING_MATCH_EXP = /(?<imaginary>[\-\+]?\s*\d+(\.\d+)?)?\s*i/
  
  // In testing
  private static COMPLEX_STRING_MATCH_EXP = /^(?:(?<real>\d+(?:(?:\.\d+)?(?:e[+\-]\d+)?)?)?(?:[+\-]))?(?<imaginary>\d+(?:(?:\.\d+)?(?:e[+\-]\d+)?)?)?[iI]$/
  a: BigDecimal
  b: BigDecimal

  constructor(a : BigDecimal, b : BigDecimal){
    super();
    this.a = a;
    this.b = b;
  }

  zero(){return ZERO}
  
  one(){return ONE}

  set({a, b} : {a : BigDecimal | undefined, b : BigDecimal | undefined}) {
    if(a) this.a = a;
    else if (b) this.b = b;
  }

  clone() {
    return new Complex(this.a, this.b);
  }

  static parse(a : Ri | Complex , b : Ri | undefined = undefined) {
    if (typeof a === 'string' && !b) { // complex number as string
      var match1 = a.match(Complex.COMPLEX_REAL_STRING_MATCH_EXP)
      var match2 = a.match(Complex.COMPLEX_IMAGINARY_STRING_MATCH_EXP)
      if(!match1 && !match2) throw new InvalidNumberFormatError(`${a} not in fraction format ${Complex.COMPLEX_REAL_STRING_MATCH_EXP} || ${Complex.COMPLEX_IMAGINARY_STRING_MATCH_EXP}`)      
      
      var i_ : number | string = 0, r_ : number | string = 0;

      /**
       * Imaginary Part Matching
       */
      if(match2?.groups && !match2.groups.imaginary) i_ = 1; // matches a + i || i
      else if (match2?.groups && match2.groups.imaginary) { // matches b in xx + bi || bi 
        i_ = match2.groups.imaginary;
      }

      /**
       * Real Part Matching
       */
      if(match1?.groups && match1.groups.imaginary ) {  // matches ai + b
        [i_, r_] = [match1.groups.imaginary, match1.groups.real]; // this matches imaginary part also, which same as above
      }
      else if(match1?.groups && match1.groups.real2) { // matches a in  a + xxi || a
        r_ = match1.groups.real2;
      }

      return new Complex(decimal(r_), decimal(i_))
    } 
    else if (typeof a === "number" && !b) return new Complex(decimal(a), decimal(0));
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


  square() {
    return this.mul(this);
  }

  abs () {
    return this.a.square().add(this.b.square()).sqrt() // sqrt( a ^ 2 + b ^ 2 )
  }

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


const ZERO = complex(0);
const ONE = complex(1);