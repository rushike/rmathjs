# v1
1. Data Types 
- BigDecimal
- Fraction
- Complex

2. Function
- Basic Function
  - powz, pow, gcd, lcm, exp, log, sin, cos, tan, arcsin, arccos,arctan
- Arithmetic Function
  - u, mu, phi, mangoldt, dirichlet
- Factorization
  - factor_out, factorize
- Primes
  - is_prime, is_relatively_prime, primes

# v2@Draft
1. Decimal Type redfine
  - Decimal currently has **n, b, e**
  - add **p** precision
  - enable **e** to be negative, implement like floating arithmetic
  - create the shift operators over decimal / int over all bases
2. Optimize Basic Ops over DataTypes define
  - reduce object init time
  - don't create object for primitive type, unless needed. (lazy eval)
3. Add more arithmetic function
4. Basic function support over complex numbers