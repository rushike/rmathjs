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
 * Computes GCD using euclidean algorithm
 * @param a 
 * @param b 
 * @returns 
 */
export function gcd(a : number | bigint, b : number | bigint) {
  var a_ = BigInt(a),
  b_ = BigInt(b),
  r_;

  while(b_) {
    r_ = a_ % b_;
    console.log(a_, b_, r_)
    a_ = b_;
    b_ = r_;
  } return a_;
}

export function lcm(a : number | bigint, b : number | bigint) {
  var a_ = BigInt(a), b_ = BigInt(b);
  return (a_ * b_) / gcd(a_, b_);
}

/**
 * Compute factorial of number
 * @Todo add limit on n, else it will take ages if passed arbitary large number
 * @param n 
 * @returns n!
 */
export function factorial(n : number | bigint) {
  var n_ = 1n,
  i_ = 1n;
  while (i_ <= n) {
    n_ *= i_;
    i_+=1n;
  } return n_;
}

export function is_prime_slow(n : number | bigint) {
  var n_ = Number(n),
  i_ = 2,
  root_n = Math.sqrt(n_);
  while(i_ < root_n && n_ % i_ != 0) i_++;
  return n_ % i_ != 0;
}

export function primes(n : number | bigint) {
  return sieve_of_eratosthenes(n)
}

export function sieve_of_eratosthenes(n : number | bigint) {
  var n_ = Number(n),
  i_ = 3,
  j_,
  is_prime = new Int8Array(n_  + 1), // to accomadate last number
  primes = [2];
  while(i_ <= n) {
    primes.push(i_);
    j_ = i_ * i_;
    while(j_ <= n) {
      is_prime[j_] = 1;
      j_ += 2 * i_;
    }
    i_ += 2; // skipping all even
    while (i_ <= n_ && is_prime[i_]) i_ += 2;
  }
  return primes;
}