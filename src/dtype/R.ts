import { InvalidNumberFormatError, NotImplementedError } from "../error";
import { N } from "./N";
import { bignum, Z, _min, _pow} from "./Z";


export type Ri = BigDecimal | string | bigint | number;

export type R = BigDecimal | bigint | number

export type Config = {
  precision : bigint | number
}

const CONFIG : Config = {
  precision : 128n
}

export function config(c = {}) {
  Object.entries(c).forEach(([key, val]) =>{ 
    // @ts-ignore
    if (key in CONFIG) CONFIG[key] = val;
  })
}

export const bigdecimal = (x : Ri)=>{  
  return BigDecimal.parse(x);
}

export const real = bigdecimal;

export const decimal = bigdecimal;


/**
 * Decimal 'd' represented as :
 *    d = n * b ^ -e
 * 
 * e.g. 
 *  0.323928398 = 323928398 * 10 ^ -9
 *        here n = 323928398, b = 10, e = 9
 */
export interface Decimal  extends N{
  n : bigint,  // number
  b : bigint,  // number system base
  e : bigint,  // base exponent in number system
  p? : bigint   // precision
}

export class BigDecimal implements Decimal {
  // @TODO use ^((?<integer>\d+)\.(?<fraction>\d*?[1-9]))0+$
  private static DECIMAL_STRING_MATCH_EXP = /(?<integer>\-?\s*[\d]+)(\.(?<fraction>[\d]+))?/

  n : bigint;
  b : bigint;
  e : bigint;
  p? : bigint;
  

  constructor(n : Z, b : Z = 10, e : Z = 0, p : Z | undefined = undefined) {
    [n, b, e] = BigDecimal.simplify(n, b, e);
    this.n = n; // integer part
    this.b = b; // number system
    this.e = e;  // number exponent
    if (p) this.p = BigInt(p); // not seting precision by default
  }

  /**
   * Removes traling zeros from BigDecimal object
   * @param n number
   * @param b base
   * @param e exponent
   * @returns [n, b, e] simplified BigDecimal Coeff
   */
  static simplify(n : Z, b : Z, e : Z) {
    var n_ = BigInt(n), b_ = BigInt(b), e_ = BigInt(e);
    while(n_ && e_ > 0 && n_ % b_ == 0n) {
      // console.log(n, b, e);
      n_ /= b_;
      e_--;
    } return [n_, b_, e_];
  }

  set({n, b, e, p}: {n : Z | null, b : Z | null, e : Z | null, p : Z | null}) {
    if(n) this.n = BigInt(n);
    else if(b) this.b = BigInt(b);
    else if(e) this.e = BigInt(e);
    else if(p) this.p = BigInt(p);
  }

  static parse(n : Ri) : BigDecimal{
    if(typeof n === 'string') {
      const match = n.match(BigDecimal.DECIMAL_STRING_MATCH_EXP)
      if (!match ) throw new InvalidNumberFormatError(`'${n}' not in decimal format ${this.DECIMAL_STRING_MATCH_EXP}`)
      
      var [int = "", frac = ""] = [match.groups?.integer.replace(/\s*/g, ""), (match.groups?.fraction || "").replace(/\B0+$/, "")],
      num  = int + frac,
      base = 10,
      exp  = frac.length;
      return new BigDecimal(bignum(num), bignum(base), bignum(exp));
    }
    else if(typeof n === 'number') {
      return BigDecimal.parse(n.toPrecision())
    } 
    else if (typeof n === 'bigint') {
      return new BigDecimal(n);
    } 
    
    else if (n instanceof BigDecimal) {
      return new BigDecimal(n.n, n.b, n.e);
    }
    
    throw new InvalidNumberFormatError(`Can't parse n = ${n} as real number, not statisfied any input condition`);
  }

  clone() {
    return new BigDecimal(this.n, this.b, this.e);
  }

  toString() {
    return `BigDecimal(n : ${this.n}, b : ${this.b}, e : ${this.e})`
  }

  add(b : Ri) {
    var a_ = this.clone(),
      b_ = BigDecimal.parse(b)
      ;
    if (a_.b != b_.b) throw new NotImplementedError(`add method not implemented on different bases a.base : ${a_.b}, b.base : ${b_.b}`)
    
    if (a_.e < b_.e) [a_, b_] = [b_, a_] // swap if a > b
    
    b_.n  = b_.n * BigInt(_pow(a_.b, a_.e - b_.e));
    b_.e  = a_.e ;
    
    return new BigDecimal(a_.n + b_.n, a_.b, a_.e);
  }

  sub(b : Ri) {
    var a_ = this.clone(),
    b_ = BigDecimal.parse(b)
    ;
    if (a_.b != b_.b) throw new NotImplementedError(`sub method not implemented on different number system bases a.base : ${a_.b}, b.base : ${b_.b}`)
    
    if (a_.e < b_.e) [a_, b_] = [b_, a_] // swap if a > b

    b_.n  = b_.n * BigInt(_pow(a_.b, a_.e - b_.e));
    b_.e  = a_.e ;

    return new BigDecimal(a_.n - b_.n, a_.b, a_.e);

  }

  mul(b : Ri, precision : Z = CONFIG.precision) {
    var a_ = this.clone(),
    b_ = BigDecimal.parse(b),
    p_ = BigInt(precision) 
    ;
    if (a_.b != b_.b) throw new NotImplementedError(`mul method not implemented on different number system bases a.base : ${a_.b}, b.base : ${b_.b}`)
    
    var num = a_.n * b_.n,
    ind = _min(a_.e + b_.e, p_)
    ;

    if (ind && ind < 0) {
      num = num * BigInt(_pow(a_.b, ind));
      ind = 0n;
    }

    return new BigDecimal(num, a_.b, ind);
  }

  div(b : Ri, precision : Z = CONFIG.precision) {
    var p_ = BigInt(precision), 
    a_ = this.clone(),
    b_ = BigDecimal.parse(b)
    ;
    if (a_.b != b_.b) throw new NotImplementedError(`mul method not implemented on different number system bases a.base : ${a_.b}, b.base : ${b_.b}`)
    
    var num = (a_.n * _pow(a_.b, p_)) / b_.n,
    ind = a_.e - b_.e + p_
    ;

    if (ind < 0) {
      num = num * _pow(a_.b, ind);
      ind = 0n;
    }

    return new BigDecimal(num, a_.b, ind);
  }

  addinv() { // this + this.addinv() = 0
    return new BigDecimal(-this.n, this.b, this.e, this.p);  
  }
  
  // negate = this.addinv;
  
  mulinv() { // this * this.mulinv() = 1
    return ONE.div(this);
  }

  // reciprocal = this.mulinv;

  square() {
    return this.mul(this);
  }

  powz(n : Z) {
    var a_ = this.clone(),
    n_ = BigInt(n),
    acc =ONE;

    if(n_ == 0n) return ONE;
  
    while(n_ > 1) {
      if (n_ & 0x1n) acc = acc.mul(a_);
      a_ = a_.mul(a_);
      n_ = n_ >> 1n;
    }   
    return a_.mul(acc);
  }
  pow(x : R){
    throw new NotImplementedError(`decimal raised to non integer pow not implemented`)
  }
}

export const ZERO = new BigDecimal(0, 10, 0);

export const ONE = new BigDecimal(1, 10, 0);

// export const INFINITY = new BigDecimal(Infinity, 10, 0);