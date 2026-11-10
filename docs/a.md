# Documentation: Custom Numeric Utilities and Class `Float`

This module provides utility functions and classes to handle numeric operations in both JavaScript `number` and `BigInt` contexts, particularly suited for high-precision or base-sensitive computations.

---

## Utility Functions

### `opr(fn, a, b = 1, c = 1, d = 1)`

Executes the given function `fn` with parameters `a`, `b`, `c`, and `d`, converting all to `BigInt` if needed for safe computation.

### `_isinteger(a)`

Checks if `a` is an integer or `BigInt`.

### `_abs(n)`

Returns the absolute value of `n`.

### `_add(a, b)`

Returns the sum of `a` and `b`, handling type conversion.

### `_sub(a, b)`

Returns the difference `a - b`.

### `_mul(a, b)`

Performs multiplication with `BigInt` fallback when necessary.

### `_div(a, b)`

Performs integer division.

### `_mod(a, m)`

Returns `a mod m`.

### `_gcd(a, b)`

Calculates the greatest common divisor using the Euclidean algorithm.

### `_lcm(a, b)`

Returns the least common multiple.

### `_oddprod(m = 1n, n = 10n)`

Returns the product of all odd numbers from `m` to `n`.

### `_serialfactorial(n)`

Computes factorial of `n` iteratively.

### `_factorial(n)`

Efficient factorial computation using divide-and-conquer and `_oddprod`.

### `_log2(n)`

Computes base-2 logarithm of `n`.

### `_log(a, b = 10)`

Computes logarithm of `a` to the base `b`.

### `_powm(a, n, m)`

Modular exponentiation.

### `_pow(a, n)`

Exponentiation of `a` to the power of `n`.

### `bignum(n)`

Converts `n` to `BigInt`.

---

## Error Classes

### `InvalidNumberFormatError`

Error thrown for invalid number formats.

### `InvalidParameterError`

Error for missing or invalid function parameters.

### `NumberCastError`

Error related to invalid number conversions.

### `NotImplementedError`

Thrown when a method is not implemented.

---

## Class: `N`

Base class for numerical objects.

### Methods

* `set(obj)`: Configures object with optional properties.
* `clone()`: Returns `this` (should be overridden).
* `toString()`: Throws `NotImplementedError`.
* `zero()`, `one()`: Identity values.
* `add(a, p)`, `sub(a, p)`, `mul(a, p)`, `div(a, p)`: Arithmetic (unimplemented in base class).
* `addinv()`: Additive inverse.
* `neg()`: Negation.
* `mulinv()`: Multiplicative inverse.
* `square()`: Square of the number.
* `powz(n)`: Exponentiation.

---

## Global Configurations

### `CONFIG`

* `precision`: Default precision (digits).
* `base`: Base used for arithmetic.

---

## Functions for Float Arithmetic

### `simplify(n, b, e, p)`

Simplifies number `n` by removing base `b` factors.

### `simplifyint(n, b)`

Simplifies an integer `n` based on base `b`.

### `simplifyfrac(n, b, f, precision)`

Simplifies a fraction.

### `toprecision(n, b, e, p, precision)`

Rounds a number to given precision.

### `parseargs(a)`

Parses input into valid Float representation.

---

## Arithmetic Internal Helpers

### `__additive(...)`

Handles addition/subtraction of two Float numbers.

### `__mul(...)`

Handles multiplication of two Float numbers.

### `__div(...)`

Handles division of two Float numbers.

### `__mod(...)`

Handles modulo of two Float numbers.

---

## Class: `_Float` (extends `N`)

Implements a custom float representation using digits, base, exponent, and precision.

### Constructor

```js
new _Float(n, b = 10, e = 0, p)
```

* `n`: Numerical value.
* `b`: Base.
* `e`: Exponent.
* `p`: Precision.

### Methods

* `toString()`: String representation.
* `toFixed()`: Not implemented.
* `toPrecision(precision)`: Returns a `Float` rounded to specified precision.
* `isInteger()`: Checks if value is an integer.
* `parseFloat(a)`: Not implemented.
* `zero()`: Returns zero value in Float format.

---

## Notes

* All arithmetic supports both standard numbers and BigInt.
* Most functions promote to BigInt when number size exceeds safe integer limits.
* Supports scientific notation parsing.
