import { InvalidNumberFormatError, InvalidParameterError, NotImplementedError, NumberCastError } from "../error";
import { Try } from "../utils";
import { N, ConfigType as ConfigTypeN, config as configN } from "./N";
import { bignum, Z, _abs, _add, _div, _isinteger, _log, _max, _min, _mod, _mul, _mul3, _pow, _powz, _sub} from "./Z";


export type Ri = Float | FloatingTypeObject | FloatingTypeArray |  string | bigint | number;

export type R = Float | bigint | number;


export type ConfigType = ConfigTypeN & {}

const CONFIG : ConfigType = {
  precision : 30, // in mode of base. ~ 100 bits.
  base : 10,
}

export function configR(c = {}) {
  configN(c);
  Object.entries(c).forEach(([key, val]) =>{ 
    // @ts-ignore
    if (key in CONFIG) CONFIG[key] = val;
  })
}

export function getConfigR(key : keyof ConfigType) {
  return CONFIG[key]
}

/**
 * TODO : add deepcopy
 * @returns 
 */
export function getConfigAll() {
  return {...CONFIG}
}
/**
 * FloatingTypeObject 'd' represented as :
 *    d = n * b ^ (e - p)
 * 
 * e.g. 
 *  - 0.323928398 = 0.323928398 * 10 ^ 0 = 3239283980 * 10 ^ (0 - 9)
 *      - here n = 323928398, b = 10, e = 0, p = 9
 *      - here n = 3239283980, b = 10, e = 0, p =10
 *  - 787600000 = 0.7876 * 10 ^ 9 = 7876 * 10 ^ (9 - 4)
 *      - here n = 7876, b = 10, e = 9, p = 4
 *  
 *  Object implemeting should store it in reduc form, i.e. to least value of |p - e|
 * 
 *  This implementation will perform comparisons faster than FloatingBType objects 
 */
 export interface FloatingTypeObject {
   n : bigint | number,  // number
   b : number,  // number system base
   e : number,  // base exponent in number system
   p : number   // precision
}

/**
 * FloatingBTypeObject 'd' represented as :
 *    d = n * b ^ e
 * 
 * e.g. 
 *  0.323928398 = 323928398 * 10 ^ -9 = 3239283980 * 10 ^ - 10
 *      here n = 323928398, b = 10, e = -9, p = 9
 *      here n = 3239283980, b = 10, e = -10, p = 10
 *  787600000 = 7876 * 10 ^ 5 
 *      here n = 7876, b = 10, e = 5, p = 4
 *  
 *  Object implemeting should store it in reduc form, i.e. to least value of |p + e|
 */
export interface FloatingBTypeObject {
  n : bigint | number,  // number
  b : number,  // number system base
  e : number,  // base exponent in number system
  p : number   // precision
}

export type FloatingTypeArray = [Z, number, number, number];

function __create(n : Z, b : number, e : number, p : number){
  return new Float(n, b, e, p);
}

  /**
   * n is parse from string
   * Removes traling zeros from n and return new Real object
   * TODO : Improve the Logic 
   * @param n number
   * @param b base
   * @param e exponent
   * @returns Simplified Real
   */
function simplify(n : Z, b? : number, e? : number, p? : number) {
    if (n == 0) return ZERO;
    if(!b) throw new InvalidParameterError(`Base 'b' should provided for all numbers other than, ZERO, Infinity, -Infinity, NaN. Passed 'b' = ${b}`)
    while( _mod(n, b) == 0) n = _div(n, b);
    p = _log(_abs(n), b);
    
    return new Float(n, b, e, ++p);
  }

function simplifyint(n : Z, b? : number) {
  if (n == 0) return ZERO;
  if(!b) throw new InvalidParameterError(`Base 'b' should provided for all numbers other than, ZERO, Infinity, -Infinity, NaN. Passed 'b' = ${b}`)
  var e = 0;
  while( _mod(n, b) == 0 && ++e) n = _div(n, b);

  var p = _log(_abs(n), b) + 1; // getting precision of number
  return new Float(n, b, e + p, p);
}

/**
 * 
 * @param n num
 * @param b base
 * @param f represents number of fraction precision from right. f must be <= 0
 * @returns simplified Real object.
 */
function simplifyfrac(n : Z, b : number, f : number, precision? : number) {
  if (n == 0) return ZERO;
  if(!b) throw new InvalidParameterError(`Base 'b' should provided for all numbers other than, ZERO, Infinity, -Infinity, NaN. Passed 'b' = ${b}`)
  var e = 0;
  while( _mod(n, b) == 0) {
    if(f <= 0) f++;
    else e++; 
    n = _div(n, b);
  }
  
  var p = _log(_abs(n), b) + 1; // getting precision of number

  if (precision) return toprecision(n, b, p + f + e, p, precision);
  return new Float(n, b, p + f + e, p);
}

/**
 * This function will reduce Repr A of floating number in simple form.
 * 
 * e.g. 
 * | Input                             | Output                           |
 * | ---                               | ---                              |
 * | n = 1000,   b = 10, e = 3, p = ?  |  n = 1,    b = 10, e = 7,  p = 1 |
 * | n = 102400, b = 10, e = 10, p = ? |  n = 1024, b = 10, e = 16, p = 4 |
 * | n = 10400,  b = 10, e = 10, p = ? |  n = 104,  b = 10, e = 15, p = 3 |
 * TODO use value of 'p' if passed for faseter _log
 * @param n number 
 * @param b base
 * @param e exponent
 * @param p number precision
 * @param options ConfigType
 * @returns 
 */
function reduceA(n : Z, b : number, e : number, p? : number, precision?: number) {
  if (n === 0) return ZERO;

  if(!b) throw new InvalidParameterError(`Base 'b' should provided for all numbers other than, ZERO, Infinity, -Infinity, NaN. Passed 'b' = ${b}`)

  while( _mod(n, b) == 0 && ++e) n = _div(n, b);

  console.log(" n : ", n, " e : ", e)

  p = _log(_abs(n), b) + 1; // getting precision of number
  if (precision) return toprecision(n, b, e, p, precision);
  return new Float(n, b, e, p);
}

function toprecision(n : Z, b : number, e : number, p : number, precision : number) {
  if (p <= precision) return simplify(n, b, e, p);

  var n = _div(n, _pow(b, p - ++precision));
  
  n = _add(_mod(n, b) > 5 ? 1 : 0, _div(n, 10));

  return simplify(n, b, e)
}

function parseargs(a : Ri) : Float {
  const INTEGER_STRING_MATCH_EXP = "";
  // const DECIMAL_STRING_MATCH_EXP = /(?<sign>[+-]?)([0]*)(?<integer>\d+)(\.(?<fraction>[\d]+))?(e(?<exp>[+-]?\d+))?/
  const DECIMAL_STRING_MATCH_EXP = /(?<sign>[+-]?)\s*([0]*)(?<integer>\d+)(\.(?<fraction>(?<leading_frac_zeros>[0]*)?[\d]+))?(e(?<exp>[+-]?\d+))?/
  
  if (typeof a === "object") {
    if (Array.isArray(a)) return simplify(a[0], a[1], a[2], a[3]);
    if(a instanceof Float) return a;
    return simplify(a.n, a.b, a.e, a.p);
  }
  else if (typeof a === "string") {
    var match = a.match(DECIMAL_STRING_MATCH_EXP)
    if (!match ) throw new InvalidNumberFormatError(`'${a}' not in decimal format ${DECIMAL_STRING_MATCH_EXP}`)
    var s = match.groups?.sign || "", 
      i = match.groups?.integer || "0",
      f = match.groups?.fraction || "",
      lfz = Number(match.groups?.leading_frac_zeros?.length || 0),
      e = Number(match.groups?.exp || 0)
    ;
    var nstr =  i + f,
      p = nstr.length,
      n = nstr.length > 15 ? BigInt(s + nstr) : Number(s + nstr),
      b = CONFIG.base
    ;
    e += i === "0" ? -lfz : i.length;
    return simplify(n, b, e);
  }
  else if(_isinteger(a)) {
    return simplifyint(a, CONFIG.base);
  } 
  else if(typeof a === 'number') {
    return parseargs(a.toString());
  }

  throw new InvalidNumberFormatError(`Number a : ${a} not in any specified number format -- {string|number|bigint|Real}`)
}

function __additive(n1 : Z, b1 : number, e1 : number, p1 : number, n2 : Z, b2 : number, e2 : number, p2 : number, fn : (a : Z, b : Z)=>Z) {
  if (b1 != b2) throw new NotImplementedError(`add method not implemented on different bases a.base : ${b1}, b.base : ${b2}`)
  var e = e1 > e2 ? e1 : e2,
    p = p1 > p2 ? p1 : p2
  ;

  
  // if is integer
  if (e1 >= p1 && e2 >= p2) 
    return simplifyint(fn(n1, n2), b1) 

  // fraction part / offset calculations
  var f = 0, 
    f1 = p1 - e1, 
    f2 = p2 - e2

  if(f1 >= f2) { // num1.fraction > num2.fraction
    f = f1;
    n2 = _mul(n2, _pow(b2,  f1 - f2 )); 
  }
  else if(f2 > f1) { // num2.fraction > num1.fraction
    f = f2;
    n1 = _mul(n1, _pow(b1, f2 - f1));
  }
  var num = fn(n1, n2), // add n1 and n2
  exp = Number(_log(_abs(num), b1)) - f + 1; // calculate the integer size of res {num}

  return simplify(num, b1, exp);
}

function sub(a : Ri, b : Ri) {

}

function __mul(n1 : Z, b1 : number, e1 : number, p1 : number, n2 : Z, b2 : number, e2 : number, p2 : number, precision? : number) {
  if (b1 != b2) throw new NotImplementedError(`mul method not implemented on different bases a.base : ${b1}, b.base : ${b2}`)
  var
    p = p1 > p2 ? p1 : p2
  ;

  // fraction part / offset calculations
  var 
    f1 = e1 - p1, 
    f2 = e2 - p2,
    f = f1 + f2
    ;
  
  return simplifyfrac(_mul(n1, n2), b1, f, precision);
}

function __div(n1 : Z, b1 : number, e1 : number, p1 : number, n2 : Z, b2 : number, e2 : number, p2 : number, precision : number) {
  if (b1 != b2) throw new NotImplementedError(`mul method not implemented on different bases a.base : ${b1}, b.base : ${b2}`)

  if(p2 > e2) {
    n1 = _mul(n1 ,_pow(b1, p2 - e2)) // multiplying numerator by b ^ frac part denominator
    e1 += p2 - e2
    p1 += p2 - e2
    e2 += p2 - e2
  }
  return simplifyfrac(
    _div(
      _mul(n1, _pow(b1, precision))
      , n2
      ), // num
    b1, // base
    (e1 - p1) - (e2 - p2) - precision, // fraction part,
    precision
  )
}

function __mod(n1 : Z, b1 : number, e1 : number, p1 : number, n2 : Z, b2 : number, e2 : number, p2 : number) {
  if (b1 != b2) throw new NotImplementedError(`mul method not implemented on different bases a.base : ${b1}, b.base : ${b2}`)
  var f1 = p1 - e1, 
    f2 = p2 - e2,
    f = 0,
    p = p1 > p2 ? p1 : p2
    ;
  if (f1 > f2) {
    f = f1;
    n2 = _mul(n2, _pow(b2, f1 - f2)); // n2 * b2 ^ f2
  } else if (f2 > f1) {
    f = f2;
    n1 = _mul(n1, _pow(b1, f2 - f1)); // n1 * b1 ^ f1
  }
  
  return simplifyfrac(
    _mod(n1, n2), // (n1 * b2 ^ (p1 - e1 - p2 + e2)) % n2 = ( n1 % n2 * b2 ^ (p2 - e2) % n2 ) % n2 
    b1,
    -f,
    p
    )
}



/**
 * Float Class is immutable
 */
export class Float extends N  implements FloatingTypeObject {
  
  /**
   * This regex matches any decimal representation for form 
   * sign int[.frac][e32]
   */
  private static DECIMAL_STRING_MATCH_EXP = /(?<sign>[+-]?)([0]*)(?<integer>\d+)(\.(?<fraction>[\d]+))?/

  readonly n : bigint | number;
  readonly b : number;
  readonly e : number;
  readonly p : number;
  

  constructor(n : Z, b : number = 10, e : number = 0, p : number) {
    super();
    this.n = n < Number.MAX_SAFE_INTEGER && n > Number.MIN_SAFE_INTEGER ? Number(n) : BigInt(n);  // integer part
    this.b = b;  // number system
    this.e = e;  // number exponent
    this.p = p;  // precision 
  }

  /** Number / Object methods */
  toString()  {
    return `Float { n = ${this.n}, b = ${this.b}, e = ${this.e}, p = ${this.p}}`
  }


  toFixed() {
    throw new NotImplementedError
  }


  toPrecision(precision : number): Float {
    if (this.p < precision) return this;
    return toprecision(this.n, this.b, this.e, this.p, precision);
  }

  isInteger() : boolean {
    return this.p <= this.e
  }

  parseFloat(a : Ri){
    throw new NotImplementedError
  }

  zero() {return ZERO}

  one() {return ONE}

  get() {
    return [this.n, this.b, this.e, this.p];
  }

  static parse(n : Ri) : Float{
    return parseargs(n);
  }

  clone() : Float {
    return this;
  }

  /**
   * TODO: this will break for high precision, where bigint stored is > Max Number.
   * @returns aprox number representing Float
   */
  toNumber() : number {
    if (this.ge(Number.MAX_VALUE) && this.le(Number.MIN_VALUE)) 
      throw new NumberCastError(`Can't cast this : ${this} to Number. Probably this < ${Number.MIN_VALUE} or this > ${Number.MAX_VALUE}`);
    return Number(this.n) * Number(this.b) ** (this.e - this.p)
  }


  lt(b : Ri) {
    b = parseargs(b);
    if (this.b != b.b) throw new NotImplementedError(`add method not implemented on different bases a.base : ${this.b}, b.base : ${b.b}`)
    return this.e < b.e ||(this.e == b.e && this.n < b.n)
  }

  le(b : Ri) {
    b = parseargs(b);
    if (this.b != b.b) throw new NotImplementedError(`add method not implemented on different bases a.base : ${this.b}, b.base : ${b.b}`)
    return this.e < b.e ||(this.e == b.e && this.n <= b.n)
  }


  gt(b : Ri) {
    b = parseargs(b);
    if (this.b != b.b) throw new NotImplementedError(`add method not implemented on different bases a.base : ${this.b}, b.base : ${b.b}`)
    return this.e > b.e ||(this.e == b.e && this.n > b.n)
  }

  ge(b : Ri) {
    b = parseargs(b);
    if (this.b != b.b) throw new NotImplementedError(`add method not implemented on different bases a.base : ${this.b}, b.base : ${b.b}`)
    return this.e > b.e ||(this.e == b.e && this.n >= b.n)
  }

  eq(b : Float) : boolean {
    return this.n == b.n && this.b == b.b && this.e == b.e && this.p == b.p
  }

  ne(b : Ri) {
    b = parseargs(b);
    if (this.b != b.b) throw new NotImplementedError(`add method not implemented on different bases a.base : ${this.b}, b.base : ${b.b}`)
    return this.e != b.e ||(this.e == b.e && this.n != b.n)
  }

  abs() {
    return simplify(-this.n, this.b, this.e, this.p)
  }

  plus(b : Ri) {return this.add(b)}

  add(b_ : Ri) {
    var b = parseargs(b_); // parsing other operand

    if (this.eq(ZERO)) return b; // since 0 + b = b
    
    if (b.eq(ZERO)) return this; // since a + 0 = a

    return __additive(
      this.n, this.b, this.e, this.p,
      b.n, b.b, b.e, b.p,
      _add
    )
  }


  minus(b : Ri) {return this.sub(b)}

  sub(b : Ri) {

    b = parseargs(b);
    return __additive(
      this.n, this.b, this.e, this.p,
      b.n, b.b, b.e, b.p,
      _sub
    )
  }

  mul(b_ : Ri, precision = CONFIG.precision) {
    if (this.n === 0 ) return ZERO // 0 * b = 0

    if (this.n === 1 && this.e === this.p) return real(b_); // since 1 * b = b
    
    var b = real(b_); // parsing other operand

    if(b.n === 0) return ZERO; // since a * 0 = 0    
    
    if (b.n === 1 && b.e === b.p) return this; // since a * 1 = a

    return __mul(
      this.n, this.b, this.e, this.p,
      b.n, b.b, b.e, b.p,
      precision
    )
  }
  // by(b : Ri) {return this.div(b)}

  div(b_ : Ri, precision = CONFIG.precision) {
    var b = parseargs(b_);
    return __div(
      this.n, this.b, this.e, this.p,
      b.n, b.b, b.e, b.p,
      precision
    )
  }

  mod(n : Ri) {
    n = parseargs(n)
    if (this.b != n.b) throw new NotImplementedError(`mod method not implemented on different number system bases a.base : ${this.b}, b.base : ${n.b}`)
    return __mod(
      this.n, this.b, this.e, this.p, 
      n.n, n.b, n.e, n.p
      )
  }

  mulinv() : Float {return super.mulinv()}

  addinv() : Float {return super.addinv()}

  floor() {
    if (this.e - this.p < 0) return 0n;
    var d = _pow(this.b, this.e - this.p)
    ;
    return BigInt(this.n) * BigInt(d)
  }

  ceil() {
    return BigInt(this.n) * BigInt(_pow(this.b, this.e - this.p)) + 1n; 
  }

  /**
   * @TODO optimize rounding of number
   * @param precision 
   * @returns rounded decimal
   */
  // round(precision : Z) {
  //   if (precision >= this.e) return this.clone()
  //   var p_ = BigInt(precision),
  //     d_ = _pow(this.b, this.e - p_),
  //     d_1_ = _pow(this.b, this.e - p_ - 1n),
  //     diff = this.n / d_1_ - this.n / d_ * this.b, // rounding bit val
  //     rbit = diff >= 5 ? 1n : 0n // rounding bit
  //   ;

  //   return new Real(this.n / d_ + rbit, this.b, p_);
  // }

  powz(n: Z) : Float {return super.powz(n)}

  pow(x : Ri){
    throw new NotImplementedError(`decimal raised to non integer pow not implemented`)
  }

  square() : Float {
    return __mul(
      this.n, this.b, this.e, this.p,
      this.n, this.b, this.e, this.p
    )
  }

  sqrt(precision : Z | undefined = undefined) {
    return this.nroot(2) // Halley Gives Fast Convergence than Newton - Raphsonß
  }


  /**
   * Compute nth root of this decimal using Halley 2 derivative method.
   *   $$ x_{k+1} = 
   *     x_{k} - \frac{1}{n}\left( x_{n} - \frac{a}{x^{n-1}}  \right)  
   *    \left( 1 -  \frac{n - 1}{n} . \frac{1}{2x_{k}} . \left( x_{k} - \frac{a}{x^{n-1}}  \right) \right)
   *   $$
   * - A = 1 - t/x^n     
   * - B = 1 - nratio * A
   * - C = A * x / n     
   * - D = C * B         
   * - E = xn - D        
   * 
   * E is n+1 estimation 
   *
   * 
   * As 'n' large, root take more time
   * @param n 
   * @param precision 
   * @returns 
   */
  nroot(n : number, precision : number = CONFIG.precision) {
    var 
      C0 = ONE,
      C1 = C0.div(n), 
      C2 = real(n - 1).mul(C1),
      xn = real(1),
      iter = 9
      ;
    var T1, T2, T3;

    for(var i = 0; i < iter; i++) {

      T1 = xn.powz(n - 1); // xn ^ (n - 1)
      var I01 = xn.mul(2, precision);

      T2 = C0.div(xn.mul(2, precision), precision); // 1 / (2 * xn)

      T3 = xn.minus(this.div(T1, precision)); // xn - k / T1

      var I0 = C2.mul(T2, precision).mul(T3, precision)
      var I001 = C0.minus(I0)
      var I1 = C0.div(
        I001, precision
        )
      var I2 = T3.mul(C1, precision).mul(
        I1
      )
      
      xn = xn.minus(
        T3.mul(C1, precision).mul(
          C0.div(
            C0.minus(
              C2.mul(T2, precision).mul(T3, precision)
              ),
            precision
            ),
          precision
        )
      )
    }
    return xn;
      // 
  }

  // nroot(n : Ri, precision : Z = 10) { //
  //   var
  //     t_ = this.clone(),                    // this number
  //     n_ = Real.parse(n).toint(),     // nth root
  //     iter_ = 100000,                           // no of iteration to perform
  //     nratio_ = Real.parse(n_ - 1n)
  //               .div(n_),                   // (n - 1) / n
  //     x0 = Real.parse(1),             // initial guess
  //     xn = x0.clone(),                      // nth guess
  //     x_n : Real,                     // x ^ n
  //     A, B, C, D, E                         // intermidate variables
  //   ;
    
  //   var e = new Real(1, 10, precision);

  //   /**

  //   for(var i_ = 0; i_ < iter_; i_++){
  //     x_n = xn.powz(n_) as Real // xn ^ n

  //     A = ONE.sub(t_.div(x_n));

  //     B = ONE.sub(A.mul(nratio_));

  //     C = A.mul(xn).div(n_);

  //     D = C.mul(B);

  //     E = xn.sub(D);

  //     if (E.sub(xn).abs().lt(e)) {       
  //       xn = E;
  //       break;
  //     }

  //     xn = E;
  //   }
  //   return xn;
  // }

  logz(b : Z | undefined){
    var
      a_ = this.clone(), 
      n_ = a_.floor(),
      b_ = b ? BigInt(b) : a_.b
    ;
    
    return _log(n_, b_)
  }
}

const NAN = new Float(0, 10, 0, -1);

const INFINITY = new Float(1, 10, 0, -1);

const NEG_INFINITY = new Float(-1, 10, 0, -1);

const ZERO = new Float(0, 10, 0, 0);

const ONE = new Float(1, 10, 1, 1);


/**
 * decimal is like factory to create Real object.
 * 
 * @optimze could cache the most used value. since decimal is immutable
 * 
 * @param a 
 * @returns new Real object
 */
export const real = (a : Ri)=>{  
  return parseargs(a);
}

export const decimal = real;
export const bigdecimal = real;