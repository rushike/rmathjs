import { InvalidNumberFormatError, NotImplementedError } from "../error";
import { N } from "./N";
import { bignum, Z, _log, _min, _pow} from "./Z";


export type Ri = BigDecimal | string | bigint | number;

export type R = BigDecimal | bigint | number

export type Config = {
  precision : bigint | number
}

const CONFIG : Config = {
  precision : 256
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
export interface Decimal {
  n : bigint,  // number
  b : bigint,  // number system base
  e : bigint,  // base exponent in number system
  p : bigint   // precision
}

export class BigDecimal extends N implements Decimal {
  // @TODO use ^((?<integer>\d+)\.(?<fraction>\d*?[1-9]))0+$
  private static DECIMAL_SIGN_MATCH_EXP = /^\s*(?<sign>-)/
  private static DECIMAL_STRING_MATCH_EXP = /(?<integer>\s*[\d]+)(\.(?<fraction>[\d]+))?/

  n : bigint;
  b : bigint;
  e : bigint;
  p : bigint;
  

  constructor(n : Z, b : Z = 10, e : Z = 0, p : Z | undefined = undefined) {
    super();
    [n, b, e] = BigDecimal.simplify(n, b, e);
    this.n = n; // integer part
    this.b = b; // number system
    this.e = e;  // number exponent
    this.p = _log(this.n, this.b); // precision by default
    // this._precision();
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

  precision(): bigint {
    return BigInt(CONFIG.precision);
  }

  zero() {return ZERO}

  one() {return ONE}

  set({n, b, e, p}: {n : Z | null, b : Z | null, e : Z | null, p : Z | null}) {
    if(n) this.n = BigInt(n);
    else if(b) this.b = BigInt(b);
    else if(e) this.e = BigInt(e);
    else if(p) this.p = BigInt(p);
  }

  static parse(n : Ri) : BigDecimal{
    if(typeof n === 'number' && Number.isInteger(n)) {
      return new BigDecimal(BigInt(n), 10, 0);
    } 
    else if(typeof n === 'number') {
      return BigDecimal.parse(n.toPrecision())
    } 
    else if(typeof n === 'string') {
      const sign = n.match(BigDecimal.DECIMAL_SIGN_MATCH_EXP)?.groups?.sign ? -1n : 1n
      const match = n.match(BigDecimal.DECIMAL_STRING_MATCH_EXP)
      if (!match ) throw new InvalidNumberFormatError(`'${n}' not in decimal format ${this.DECIMAL_STRING_MATCH_EXP}`)
      
      var [int = "", frac = ""] = [match.groups?.integer, (match.groups?.fraction || "").replace(/\B0+$/, "")],
      num  = int + frac,
      base = 10,
      exp  = frac.length;
      return new BigDecimal(sign * bignum(num), BigInt(base), BigInt(exp));
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

  toint() {
    return this.floor();
  }

  private _precision() {
    console.log("this before : ", this);
    
    this.n /= _pow(this.b, this.e - this.p); 
    this.e = this.p;
    console.log("this after : ", this);
    
  }

  toprecision(precision : Z) {
    var a_ = this.clone(),
      p_ = BigInt(precision)
    ;
    a_.n /= _pow(10, a_.e - p_);
    a_.p = _log(a_.n, a_.b);
    a_.e = p_;
    return a_;
  }

  toString() {
    return `BigDecimal(n : ${this.n}, b : ${this.b}, e : ${this.e})`
  }

  lt(b : Ri) {
    var a_ = this.clone(),
    b_ = BigDecimal.parse(b)
    ;
    if (a_.b != b_.b) throw new NotImplementedError(`add method not implemented on different bases a.base : ${a_.b}, b.base : ${b_.b}`)
    return a_.sub(b).n < 1n  
  }

  abs() {
    var a_ = this.clone()
    ;
    if (a_.n < 0n) a_.n = -a_.n;
    return a_ ; 
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

    var swaped = false;
    if (a_.e < b_.e) {
      [a_, b_] = [b_, a_] // swap if a > b
      swaped = true;
    }

    b_.n  = b_.n * BigInt(_pow(a_.b, a_.e - b_.e));
    b_.e  = a_.e ;

    if (swaped) {
      [a_, b_] = [b_, a_] // swap if a > b
      swaped = false;
    }

    return new BigDecimal(a_.n - b_.n, a_.b, a_.e);

  }

  mul(b : Ri, precision : Z = CONFIG.precision) {
    var a_ = this.clone(),
    b_ = BigDecimal.parse(b),
    p_ = BigInt(precision) 
    ;
    if (a_.b != b_.b) throw new NotImplementedError(`mul method not implemented on different number system bases a.base : ${a_.b}, b.base : ${b_.b}`)
    
    var num = a_.n * b_.n,
    index = a_.e + b_.e
    ;

    if (index < 0) { // if index become negative, multiply number by base ^ index
      num = num * BigInt(_pow(a_.b, index));
      index = 0n;
    }

    if( index > p_) { // if index is greater than precision, we decrease precision to required level
      num = num / BigInt(_pow(a_.b, index - p_))
      index = p_;
    }

    return new BigDecimal(num, a_.b, index);
  }

  div(b : Ri, precision : Z = CONFIG.precision) {
    var p_ = BigInt(precision), 
    a_ = this.clone(),
    b_ = BigDecimal.parse(b)
    ;
    if (a_.b != b_.b) throw new NotImplementedError(`mul method not implemented on different number system bases a.base : ${a_.b}, b.base : ${b_.b}`)
    
    var num = (a_.n * _pow(a_.b, b_.e + p_)) / b_.n,
    index = p_ + a_.e
    ;
    
   
    if (index < 0) { // if index is greater than precision, we decrease precision to required level
      num = num * _pow(a_.b, index);
      index = 0n;
    }

    if( index > p_) { // if index is greater than precision, we decrease precision to required level
      num = num / BigInt(_pow(a_.b, index - p_))
      index = p_;
    }

    return new BigDecimal(num, a_.b, index);
  }

  mulinv() : BigDecimal {return super.mulinv()}

  addinv() : BigDecimal {return super.addinv()}

  floor() {
    return this.n / _pow(this.b, this.e);
  }

  ceil() {
    return this.n / _pow(this.b, this.e) + 1n; 
  }

  /**
   * @TODO optimize rounding of number
   * @param precision 
   * @returns rounded decimal
   */
  round(precision : Z) {
    if (precision >= this.e) return this.clone()
    var p_ = BigInt(precision),
      d_ = _pow(this.b, this.e - p_),
      d_1_ = _pow(this.b, this.e - p_ - 1n),
      diff = this.n / d_1_ - this.n / d_ * this.b, // rounding bit val
      rbit = diff >= 5 ? 1n : 0n // rounding bit
    ;

    return new BigDecimal(this.n / d_ + rbit, this.b, p_);
  }

  powz(n: Z) : BigDecimal {return super.powz(n)}

  pow(x : Ri){
    throw new NotImplementedError(`decimal raised to non integer pow not implemented`)
  }

  square() : BigDecimal {return super.square()}

  sqrt(precision : Z | undefined = undefined) {
    // var
    //   n_ = this.clone(),
    //   iter_ = 1000,
    //   nratio = n_.div(2),
    //   x0 = ONE,
    //   xn = x0,
    //   A, B, C
    //   ;
    // /**
    //  * A = ( n / 2 ) * (1 / x)
    //  * B = x / 2
    //  * C = B - A
    //  * xn = xn - C
    //  */
    // for(var i_ = 0; i_ < iter_; i_++) {
    //   A =  ONE.div(xn).mul(nratio);
    //   B = xn.div(2),
    //   C = B.sub(A)

    //   xn = xn.sub(C)
    // } return xn

    return this.nroot(2) // Halley Gives Fast Convergence than Newton - Raphsonß
  }


  /**
   * Compute nth root of this decimal using Halley 2 derivative method.
   * 
   * As 'n' large, root take more time
   * @param n 
   * @param precision 
   * @returns 
   */
  nroot(n : Ri, precision : Z = 10) { //
    var
      t_ = this.clone(),                    // this number
      n_ = BigDecimal.parse(n).toint(),     // nth root
      iter_ = 100000,                           // no of iteration to perform
      nratio_ = BigDecimal.parse(n_ - 1n)
                .div(n_),                   // (n - 1) / n
      x0 = BigDecimal.parse(1),             // initial guess
      xn = x0.clone(),                      // nth guess
      x_n : BigDecimal,                     // x ^ n
      A, B, C, D, E                         // intermidate variables
    ;
    
    var e = new BigDecimal(1, 10, precision);

    /**
     * 
     * A = 1 - t/x^n
     * B = 1 - nratio * A
     * C = A * x / n
     * D = C * B
     * E = xn - D
     * 
     * E is n+1 estimation 
     */
    for(var i_ = 0; i_ < iter_; i_++){
      x_n = xn.powz(n_) as BigDecimal // xn ^ n

      A = ONE.sub(t_.div(x_n));

      B = ONE.sub(A.mul(nratio_));

      C = A.mul(xn).div(n_);

      D = C.mul(B);

      E = xn.sub(D);

      if (E.sub(xn).abs().lt(e)) {       
        xn = E;
        break;
      }

      xn = E;
    }
    return xn;
  }

  log$characteristic(b : Z | undefined){
    var
      a_ = this.clone(), 
      n_ = a_.floor(),
      b_ = b ? BigInt(b) : a_.b,
      lg = 0n
    ;
    while(n_ > 1) {
      n_ /= b_;
      lg++;
    }
    return lg;
  }
}

const ZERO = new BigDecimal(0, 10, 0);

const ONE = new BigDecimal(1, 10, 0);

// export const INFINITY = new BigDecimal(Infinity, 10, 0);