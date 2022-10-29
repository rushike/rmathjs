import { min } from "lodash";
import { factorial } from "../functions/basic";

export type Zi = number | bigint | string;

export type Z = number | bigint;


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
  }); return BigInt(min_)
}

export const bignum =  (n : Zi) => {
  if(typeof n === 'number') return BigInt(Math.floor(n));
  return BigInt(n);
}