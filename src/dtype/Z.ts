import { min } from "lodash";
import { POW_10 } from "../constants";
import { NotImplementedError } from "../error";
import { factorial, pow$1 } from "../functions/elementary";

export type Zi = number | bigint | string;

export type Z = number | bigint;

export type Fn3 = (a1 : Z, a2 : Z, a3 : Z) => Z;

/**
 * opr cast any input args of type number to bigint,
 * and call and return result of function {fn}
 * 
 * ? If all are number it will call {fn} with all number args
 * 
 * @TODO -> handle overflow in case all args are of type 'number' for all arithmetic operations
 * @param fn 
 * @param a 
 * @param b 
 * @param c 
 * @returns Z
 */
export function opr( fn : Function, a : Z, b : Z = 1, c : Z = 1, d : Z = 1) : Z{
  if(typeof d === "number")
    if (typeof c === "number") 
      if (typeof b === "number") 
        if (typeof a === "number") 
          return fn(a, b, c, d) // all are numbers
    d = BigInt(d)
  
  if (typeof b === "number") 
    b = BigInt(b)
  if (typeof a === "number")
    a = BigInt(a)
  if (typeof c === "number")
    c = BigInt(c)
  return fn(a, b, c, d); 
}

function _int(n : Z, q : bigint) {
  return BigInt(n) * q;
}

export function _isinteger(a : Z) {
  return typeof a ==='bigint' || Number.isInteger(a);
}

export function eq (a : Z, b : Z) {
  return a == b;
}

export function _leftshift(n : Z, k : Z, b : Z= 10) {
  //@ts-ignore
  return opr((a1, a2, a3)=>a1 * a3 ** a2, n, k, b);
}

export function _rightshift(n : Z, k : Z, b : Z = 10n) {
  //@ts-ignore
  return opr((a1, a2, a3)=>a1 / a3 ** a2, n, k, b);
}

export function _abs(n : Z) {
  return n < 0 ? -n : n;
}

export function _add(a : Z, b : Z) {
  //@ts-ignore
  return opr((a1, a2)=>a1 + a2, a, b);
}

export const _plus = _add;

export function _sub(a : Z, b : Z) {
  //@ts-ignore
  return opr((a1, a2)=>a1 - a2, a, b);
}

export const _minus = _sub;

export function _mul(a : Z, b : Z) : Z {
  if (typeof a === 'number' && typeof b === 'number') {
    var res = a * b;
    if (res < Number.MAX_SAFE_INTEGER && res > Number.MIN_SAFE_INTEGER) return res;
    return BigInt(a) * BigInt(b);
  }
  //@ts-ignore
  return opr((a1, a2)=> a1 * a2, a, b, 1n);
}

export const _times = _mul;

export function _mul3(a : Z, b : Z, c : Z) : bigint {
  //@ts-ignore
  return opr((a1, a2, a3)=> a1 * a2 * a3, a, b, c, 1n);
}

export const _multipliedby = _mul;


function _mulq(a : bigint, b : bigint, q : bigint) {
  return a * b / q;
}

export function _div(a : Z, b : Z) {  
  if(typeof a === 'number' && typeof b === 'number') return Math.floor(a / b);
  //@ts-ignore
  return opr((a1, a2)=>a1 / a2, a, b);
}

export const _dividedby = _div;

function _divq(a : bigint, b : bigint, q : bigint) {
  return a * q / b;
}

export function _mod(a : Z, m : Z) : Z{
  if ((a < 0 && m < a) || (a > 0 && m > a)) return a; // trival case
  if (a < Number.MAX_SAFE_INTEGER) return Number(a) % Number(m);
  return BigInt(a) % BigInt(m);
}

export function _modz(a : Z, m : Z) : Z{
  if ((a < 0 && m < a) || (a > 0 && m > a)) return a; // trival case
  if (a < Number.MAX_SAFE_INTEGER) return Math.floor(Number(a)) % Math.floor(Number(m));
  return BigInt(a) % BigInt(m);
}


/**
 * Computes GCD using euclidean algorithm
 * @param a 
 * @param b 
 * @returns 
 */
 export function _gcd(a : Z, b : Z) : Z{
  //@ts-ignore
  function gcd_(a_, b_) : Z{
    var r_;

    while(b_) {
      r_ = a_ % b_;
      a_ = b_;
      b_ = r_;
    } return a_;
  }
  //@ts-ignore
  return opr(gcd_, a, b);
}

export function _lcm(a : Z, b : Z) : Z {
  //@ts-ignore
  return opr((a1, a2)=> (a1 * a2) / _gcd(a1, a2), a, b);
}



export const _oddprod = (m : bigint = 1n, n:bigint = 10n) : bigint => {
  function prod(m : bigint, n : bigint) {
    var i_ = m&1n ? m : (m + 1n), 
      n_ = n&1n ? n : (n - 1n),
    res = 1n;
    
    while(i_ <= n_) {
      res *= i_;
      i_ += 2n;
    } 
    
    return res;
  }
  var mid = (n + m) / 2n,
    diff =  n - m
  ;

  if (diff < 103) return prod(m, n);
  return _oddprod(m, mid) * _oddprod(mid + 1n, n)
}

export const _serialfactorial= (n : Z) => {
  var n_ = BigInt(n), i_ = 1n, res =1n
  ;
  while(i_ <= n_) res *= i_++;
  return res;
}

/**
 * Compute n! of integer number.
 * Uses formula : 
 *  (2n)! = 2 ^ n * n! * (odd_product till n)
 * 
 * & not using opr since
 * @param n 
 * @returns n!
 */
export const _factorial = (n : Z) => {
  var n_ = BigInt(n);
  
  function fact(x : bigint) : bigint{
    if (x == 0n || x ==1n) return 1n;
    if (x < 103n) return _serialfactorial(x);
    var half = x / 2n;
    
    return fact(half) * BigInt(_pow(2, half)) * _oddprod(1n, x);
  }
  return fact(n_);
}


export function _log2(n : Z) {
  var mathlog = Math.floor(Math.log2(Number(n)));
  if (Number.isFinite(mathlog)) return mathlog; 
  var n_ = BigInt(n),
    i_ = 1024n,
    lg = 0n,
    temp
    // iter = 1
    ;
    while(n_ > 1n) {
      temp = n_ >> i_;
      if(temp == 0n) {
        i_ >>= 1n;
        continue;
      }
      n_ = temp;
      lg += i_;
      i_ <<= 1n;
    }
    return lg;
}

export const _log = (a : Z, b : Z = 10) : number => {
  b = Number(b);
  
  if(b == 2) return Number(_log2(a));
  var mathlog = Math.floor(Math.log(Number(a)) / Math.log(b));
  if (Number.isFinite(mathlog)) return mathlog; 

  var a_ = BigInt(a),
    b_ = BigInt(b),
    i_ = 1024n,
    lg = 0n,
    temp
    // iter = 1
    ;
    
    while(a_ > 1n) {
      if (a_ < Number.MAX_VALUE) return Number(lg + BigInt(Math.floor(Math.log(Number(a_)) / Math.log(b))));
      // console.log("a_ : ", a_, "b : ", b, ", b  ^ i : ", b_ ** i_);
      
      temp = a_ / ( b_ ** i_);

      if(temp == 0n) {
        i_ /= 2n;
        continue;
      }
      a_ = temp;
      lg += i_;
      i_ *= 2n;
    }
    
    return Number(lg);
}

function powq(a : bigint, n : bigint, q : bigint) {
  var res = _int(1, q);

  while(n > 0) {
    if (n & 1n) res = (res * a) / q;
    a = (a * a) / q;
    n >>= 1n; // n = n >> 1n
  } return res;
}

export const _powm = (a : Z, n : Z, m : Z ) : Z => {
  // @ts-ignore
  function _powm_(a_, n_, m_, o_){
    
    if(o_ > 1) throw Error("Can't perform powm operation with odd bit > 1")
    var res = 1n;

    while(n_ > 0) {
      if (n_ & o_) res = (res * a_) % m_;
      a_ = (a_ * a_) % m_;
      n_ >>= o_; // n = n >> 1n
    }   
    return res;
  
  }

  var nbits = _mul(_log2(a), n);
  // @ts-ignore
  if (nbits < 53) return Number(a) ** Number(n) % Number(m)
  
  // @ts-ignore
  if( nbits < 2000) return opr((a_, n_, m_)=>a_ ** n_ % m_, a, n,  m, 1n);
  return opr(_powm_, a, n, m, 1n)
}

export const _powz = (a : Z, n : Z) => {
  var nbits = _mul(_log2(a), n);
  // @ts-ignore
  if (nbits < 53) return Math.floor(Number(a)) ** Math.floor(Number(n))
  return BigInt(a) ** BigInt(n);
}

export const _pow = (a : bigint | number, n : bigint | number)  => {
  var nbits = _mul(_log2(a), n);
  // @ts-ignore
  if (nbits < 53) return Math.floor(Number(a)) ** Math.floor(Number(n))
  
  var a_ = BigInt(a),
  n_ = BigInt(n);
  return a_ ** n_;
}

export const _min = (...rest : Z[]) => {
  var min_ : Z = Infinity;
  rest.forEach(num=>{
    if(num < min_) min_ = BigInt(num);
  }); return BigInt(min_);
}

export const _max = (...rest : Z[]) => {
  var max_ : Z = -Infinity;
  rest.forEach(num=>{
    if(num > max_) max_ = BigInt(num);
  }); return BigInt(max_);
}

/**
 * For non int n it returns [n]
 * @param n number | bigint | string
 * @returns [n] bigint
 */
export const bignum =  (n : Zi) => {
  if(typeof n === 'number') {
    // return
  };
  return BigInt(n);
}

