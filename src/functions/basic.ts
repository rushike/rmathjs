import { C, Ci, complex, Complex } from "../dtype/C";
import { BigDecimal, decimal, R, Ri } from "../dtype/R";
import { Z, _factorial, _gcd, _lcm, _pow, _powm } from "../dtype/Z";
import { NotImplementedError } from "../error";

/**
 * Integer Function
 */

/**
 * Computes GCD using euclidean algorithm
 * @param a 
 * @param b 
 * @returns 
 */
 export function gcd(a : Z, b : Z) : Z {
  return _gcd(a, b);
}

export function lcm(a : Z, b : Z) : Z{
  return _lcm(a, b);
}

/**
 * Compute factorial of number
 * @Todo add limit on n, else it will take ages if passed arbitary large number
 * @param n 
 * @returns n!
 */
export function factorial(n : Z) : Z{
  return _factorial(n);
}




/**
 * Real Functions
 */

/**
 * 
 * @param n 
 * @returns (-1) ^ n
 */
export function pow$_1(n : number | bigint) {
  var n_ = BigInt(n);
  if (n_ & 1n) return -1;
  return 1
}

/**
 * 
 * @param n 
 * @returns 1 ^ n = 1
 */
export function pow$1(n : number | bigint) {
  return 1;
}

/**
 * Compute a ^ b for arbitarily large number
 * @param a base
 * @param n index
 * @param m modulo
 * @returns 
 */
export function pow(a : bigint | number, n : bigint | number, m : number | bigint | undefined = undefined) {
  if (
    typeof n == 'number' 
    && typeof a == 'number'
    && n * Math.log2(a) < 32 * Math.log2(2)) return Math.pow(a, n);
  
  var a_ = BigInt(a),
  n_ = BigInt(n),
  m_ = BigInt(m || 0),
  acc = 1n;
  

  while(n_ > 1) {
    if (n_ & 0x1n) acc *= a_;
    a_ *= a_;
    n_ = n_ >> 1n;

    if(m_) { // Mod the output
      acc %= m_;
      a_ %= m_;
    }
  }   
  if(m_) return (a_ * acc ) % m_;
  return ( a_ * acc ) ;
}



/**
 * Complex Functions
 * aim to define all real function over complex
 */


 export function powz(a : Ci, n : Z, m : Z | undefined = undefined) : C {
  if (typeof a === "number" || typeof a === "bigint" ) {
    if(m) return _powm(a, n, m);
    return _pow(a, n);
  } else if(a instanceof BigDecimal) {
    return decimal(a).powz(n);
  } return complex(a).powz(n);
}

/**
 * For small x uses exp1, for large x uses exp0
 * @param x 
 */
export function exp(x : Ci, precision : Z = 100n) : R {
  if (x instanceof Complex) throw new NotImplementedError(`Not implemented for x = ${x} complex data type`)
  return exp0(x)
}

/**
// computing e ^ 1 took 1869 ms over 1000 iteration
// Uses :
//   e ^ x = 1 + x (1 + x/2(1 + x/3 (1+x/4(1 + x/5(...)))))
 * 
 * @param x complex
 * @returns e ^ x
 */
export function exp0(x : Ci) : R {
  if (x instanceof Complex) throw new NotImplementedError(`Not implemented for x = ${x} complex data type`)
  var x_ = decimal(x),
    x0 = decimal(1),
    one = x0.one(),
    xn = x0,
    iter_ = 1000
  ;

  for(var i_ = iter_; i_ > 0; i_--) {
    xn = one.add(xn.mul(x_.div(i_)))
  }

  return xn;
}

/**
 * Uses :
 *  e ^ x = 1 + x + x^2 / 2 ! + x^3 / 3! + ...
 * @param x complex
 * @returns e ^ x
 */
export function exp1(x : Ci) : R {
  if (x instanceof Complex) throw new NotImplementedError(`Not implemented for x = ${x} complex data type`)
  var x_ = decimal(x), 
    xp = decimal(1),
    x0 = decimal(1),
    iter_ = 600,
    xn = x0,
    d = 1n
    ;
  for (var i_ = 1n; i_ < iter_; i_++) {
    xp = xp.mul(x_);
    xn = xn.add(xp.div(d));
    d *= ( i_ + 1n);
  } return xn;
}

export function exp2(x : C) : R{
  if (x instanceof Complex) throw new NotImplementedError(`Not implemented for x = ${x} complex data type`)
  var x_ = decimal(x),
    x_2 = x_.square(),
    x0 = decimal(1),
    one = x0.one(),
    xn = x0.add(x_),
    iter_ = 1000,
    d1 = 1n, d2 = 2n, xt, xk = decimal(1), xp
  ;

  for (var i_ = 1n; i_ < iter_; i_++){
    d2 = d1 * d2 * i_;
    d1 = 2n * i_ + 1n
    xt = one.add(x_.div(d1))
    xk = xk.mul(x_2)
    xp = xk.div(d2)
    xn = xn.add(xp.mul(xt))
  } return xn
}