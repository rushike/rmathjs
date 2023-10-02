import { LN2_STR, PI_2_STR, PI_STR } from "../constants";
import { C, Ci, complex, Complex } from "../dtype/C";
import { Float, real, Ri, R } from "../dtype/R";
import { Z, _factorial, _gcd, _lcm, _pow, _powm, _log2 } from '../dtype/Z';
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


 export function powz(a : Ci, n : Z, m : Z | undefined = undefined) : C | R | Z {
  if (typeof a === "number" || typeof a === "bigint" ) {
    if(m) return _powm(a, n, m);
    return _pow(a, n);
  } else if(a instanceof Float) {
    return real(a).powz(n);
  } return complex(a).powz(n);
}

/**
 * For small x uses exp1, for large x uses exp0
 * @param x 
 */
export function exp(x : Ci, precision : Z = 100n) : Float {
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
export function exp0(x : Ci)  {
  if (x instanceof Complex) throw new NotImplementedError(`Not implemented for x = ${x} complex data type`)
  var x_ = real(x), // x
    x0 = real(1),  // initial term
    one = x0.one(),   // 1
    xn = x0,          // xn th term
    iter_ = 100
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
  var x_ = real(x), 
    xp = real(1),
    x0 = real(1),
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
  var x_ = real(x),
    x_2 = x_.square(), // x  ^ 2
    x0 = real(1),   // initial term
    one = x0.one(),    // one
    xn = x0.add(x_),   // xn th term
    iter_ = 1000,
    d1 = 1n, d2 = 2n, xt, xk = real(1), xp
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

export function log(n : Ri, b : Ri) {  
  return real(ln(n)).div(ln(b));
}

export function ln(n : Ri) : Float{
  // represent n as 2 ^ r * (1 + f)
  var n_ = real(n),
    r = BigInt(n_.logz(2)),
    f = n_.div(2n ** r).sub(1) // n / 2 ^ r  - 1
  ;

  var
    iter_ = 100n, 
    an = real(iter_).mulinv(), // 1 / i_n
    f_ = f,
    ln2r = real(LN2_STR).mul(r)
    ;

  for(var i_ = iter_ - 1n; i_ > 0n; i_--) { // can reduce term by slight modification
    an = real(i_).mulinv().sub(f_.mul(an));
  }
  
  return ln2r.add(an.mul(f_))
}

export function sin(x : Ri) : R {
  var
    M = real(PI_STR.slice(0, 32)).mul(2),
    x_ = real(x).mod(M),
    // s_ = [0, 1].includes(Number(x_.div(M.div(4)).floor())) ? 1n : -1n,
    x_2 = x_.square(), // x ^ 2
    x0 = real(1),
    one = x0.one(),   // 1
    an = x0,
    iter_ = 100n,
    d1 
    ;
    /**
     * d1 = 2i_ * (2i_ + 1)
     * an = 1 - x ^ 2 / d1
     */
    for (var i_ = iter_; i_ > 0n; i_--) {
      d1 = 4n * i_ * i_ + 2n * i_;
      an = one.sub(x_2.div(d1).mul(an))
    }
    
    return an.mul(x_);
}

export function cos(x : Ri) : R {
  var
    M = real(PI_STR.slice(0, 32)).mul(2),
    x_ = real(x).mod(M),
    // s_ = [0, 3].includes(Number(x_.div(M.div(4)).floor())) ? 1n : -1n,
    x_2 = x_.square(), // x ^ 2
    x0 = real(1),
    one = x0.one(),   // 1
    an = x0,
    iter_ = 100n,
    d1 
    ;

    // console.log("x : ", Number(x_.div(M.div(4)).floor()), s_);
    

    /**
     * d1 = 2i_ * (2i_ - 1)
     * xn = 1 - x ^ 2 / d1
     */
    for (var i_ = iter_; i_ > 0n; i_--) {
      d1 = 4n * i_ * i_ - 2n * i_;
      an = one.sub(x_2.div(d1).mul(an))
    }

    return an;
}

export function tan(x : Ri) : Float {
  return real(sin(x)).div(cos(x))
}

export function arcsin(x : Ri) : R {
  var x_ = real(x),
    x_2 = x_.square(), // x  ^ 2
    iter_ = 4n,
    xn = real(iter_).mulinv(),   // xn th term
    d1
  ;

  /**
   * d1 = (2i - 1) / 2i
   * xn = 1 / (2i -1) - d1 * xn
   */
  for(var i_ = iter_; i_ > 0n; i_--) {
    d1 = real(2n * i_ - 1n);
    xn = d1.mulinv().plus(
      d1.div(2n * i_).mul(x_2).mul(xn)
    )
  } return xn.mul(x_);
}


export function arccos(x : Ri) : R {
  return real(PI_2_STR).minus(arcsin(x))
}

export function arctan(x : Ri) : R {
  var x_ = real(x),
    x_2 = x_.square(), // x  ^ 2
    iter_ = 100n,
    xn = real(iter_).mulinv(),   // xn th term
    d1 = 1n, d2 = 2n, xt, xk = real(1), xp
  ;
  /**
   * d1 = 2i + 1
   * xn = 1 / d1 - xn * x^2
   */
  for(var i_ = iter_ - 1n; i_ >= 0n; i_--) {
    d1 = 2n * i_ + 1n;
    
    xn = real(d1).mulinv().minus(
      x_2.mul(xn)
      ) // xn = 1 / (2i + 1) - x^2 * xn
      // console.log("d1 : ", d1, xn, xn.mul(x_));
  }
  return xn.mul(x_)
}


/**
 * sinh (x) = (e ^ 2x  - 1 ) / (2 * e ^ x)
 * @param x 
 * @returns 
 */
export function sinh(x : Ri) : R  {
  var e_x_ = exp(x),
    e_2x_ = e_x_.square()
  ;
  
  return e_2x_.minus(1).div(
    e_x_.mul(2)
  )
}

export function cosh(x : Ri) : R {
  var e_x_ = exp(x),
    e_2x_ = e_x_.square()
  ;
  
  return e_2x_.plus(1).div(
    e_x_.mul(2)
  )
}

export function tanh(x : Ri) : R {
  var x_ = real(x),
    e_2x_ = exp(x_.mul(2)); 
  ;
  return e_2x_.sub(1).div(e_2x_.add(1));
}


export function arsinh(x : Ri) : R{
  var x_ = real(x),
    xi = x_.plus(
          x_.square().plus(1).sqrt()
        ) // x + sqrt ( x ^ 2 + 1)
  ;
  return ln(xi);
}

export function arcosh(x : Ri) : R{
  var x_ = real(x),
    xi = x_.plus(
          x_.square().minus(1).sqrt()
        ) // x + sqrt ( x ^ 2 + 1)
  ;
  return ln(xi);
}

export function artanh(x : Ri) : R{
  var x_ = real(x),
    xi = x_.plus(1).div(
              x_.minus(1).addinv()
            ) // ( x + 1 ) / (x - 1)
  ;
  
  return ln(xi).div(2);
}
/**
 * Complex Functions
 * aim to define all real function over complex
 */