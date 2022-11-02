import { min } from "lodash";
import { POW_10 } from "../constants";
import { NotImplementedError } from "../error";
import { factorial } from "../functions/elementary";

export type Zi = number | bigint | string;

export type Z = number | bigint;


/**
 * Computes GCD using euclidean algorithm
 * @param a 
 * @param b 
 * @returns 
 */
 export function _gcd(a : Z, b : Z) {
  var a_ = BigInt(a),
  b_ = BigInt(b),
  r_;

  while(b_) {
    r_ = a_ % b_;
    a_ = b_;
    b_ = r_;
  } return a_;
}

export function _lcm(a : Z, b : Z) {
  var a_ = BigInt(a), b_ = BigInt(b);
  return (a_ * b_) / _gcd(a_, b_);
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

export const _factorial = (n : Z) => {
  var n_ = BigInt(n);
  
  function fact(x : bigint) : bigint{
    if (x == 0n || x ==1n) return 1n;
    if (x < 103n) return _serialfactorial(x);
    var half = x / 2n;
    
    return fact(half) * _pow(2, half) * _oddprod(1n, x);
  }
  return fact(n_);
}

export const _log = (a : Z, b : Z = 10) => {
  var n_ = BigInt(a),
    b_ = BigInt(b),
    d_ = BigInt(b),
    i_ = 1n,
    lg = 0n,
    temp,
    iter = 0
    ;
    while(n_ > 1n) {
      n_ /= d_;
      lg += i_;
      d_ *= b_;
      i_++;
      iter++;
      temp = n_ / d_;
      if (n_ < b_) break;
      
      while(temp == 0n && i_ > 0n) { // fallback
        d_ /= b_;
        i_--;
        temp = n_ / d_;
        iter++;
      }
    } return lg;
}

export const _powm = (a : bigint | number, n : bigint | number, m : number | bigint ) : bigint => {
  if (
    typeof n === 'number' 
    && typeof a === 'number'
    && typeof m === "number"
    && n * Math.log2(a) < 32 * Math.log2(2)) BigInt(Math.pow(a, n) % m);
  
  var a_ = BigInt(a),
  n_ = BigInt(n),
  m_ = BigInt(m),
  acc = 1n;

  while(n_ > 1) {
    if (n_ & 0x1n) acc = (acc * a_) % m_;
    a_ = (a_ * a_) % m_;
    n_ = n_ >> 1n;
  }   
  return ( a_ * acc ) % m_;
}

export const _pow = (a : bigint | number, n : bigint | number) : bigint => {
  if (
    typeof n == 'number' 
    && typeof a == 'number'
    && n * Math.log2(a) < 32 * Math.log2(2)) BigInt(Math.pow(a, n));

  var a_ = BigInt(a),
  n_ = BigInt(n),
  acc = 1n;

  if(n == 0) return 1n;

  while(n_ > 1) {
    if (n_ & 0x1n) acc *= a_;
    a_ *= a_;
    n_ = n_ >> 1n;
  }   
  return a_ * acc;
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

export function shiftleft(n : number | bigint,x : number | bigint, b = 10) {
  return BigInt(n) * _pow(b, x);
}

/**
 * For non int n it returns [n]
 * @param n number | bigint | string
 * @returns [n] bigint
 */
export const bignum =  (n : Zi) => {
  if(typeof n === 'number') return BigInt(Math.floor(n));
  return BigInt(n);
}