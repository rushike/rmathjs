## Decimal Representation

```javascript
interface Decimal {
  n : bigint,  // number
  b : bigint,  // number system base
  e : bigint,  // base exponent in number system
  p : bigint
}
```
We will represent number same as floating point numbers.
n -> represents the actual number, it will also have sign information
b -> represents the base of number encoded in.
e -> represents the exponent to base 'b'

So for example
- 121281.212121
  - n = 1212812121
  - b = 10
  - e = 6
  - p = 10

- 0.09098898998
  - n = 9098898998
  - b = 10
  - e = -11
  - p = 10

- -98787.768768768
  - n = 98787768768768
  - b = 10
  - e = 5
  - p = 14

- 787600000
  - n = 7876
  - b = 10
  - e = 9
  - p = 4

## Decimal Parsing
Decimal number contains 3 components.
- sign (+,-,<empty>) 
- integer (everthing before / left decimal point '.')
- fraction (everthing after / right to decimal point '.')

Simple regex will parse the decimal string
```js
/(?<integer>(?<sign>[+-]?)\s*[\d]+)(\.(?<fraction>[\d]+))?/
```
**Prototype** 
Executed below code to parse string with above regex on Mac M1 Pro
```js
var t1, t2, totalTime = 0, iterations = 1000;
var t0 = performance.now()
str = getRandomDecimalStr(2000000);
for(var i = 0; i < iterations; i++) {
  t1 = performance.now();
  // var res = parseDecimaStr(str)
  var res = parseDecimaStr.apply(this, Array.prototype.slice.call([str], 0));
  t2 = performance.now();
  totalTime += (t2 - t1);
}
t3 = performance.now()

console.log("total time : ", t3 - t0);
console.log(totalTime, totalTime / iterations);
```

Got below result
```cmd
total time :  852.6891250014305
763.1353471875191 0.7631353471875191
```

## BigDecimal
BigDecimal implements Decimal interface and is immutable.


## Functions
### nroot
Uses Halley Method to compute the nth root of real number.

It uses below formula: 
  $$x_{n+1} = x_{n} - \frac{f(x)}{f^{'}(x)} \left( 1 - \frac{f(x)}{f^{'}(x)} . \frac{f^{''}(x)}{2f^{'}(x)} \right ) ^{-1}$$

For taking nth root  \\( \sqrt[n]{a} \\) , we use \\(f(x) = x^n - a = 0\\)
Here : 
  $$ \frac{f(x)}{f^{'}(x)} = \frac{1}{n}\left( x_{k} - \frac{a}{x_{k}^{n-1}}  \right) $$
  $$ \frac{f^{''}(x)}{2f^{'}(x)} = \frac{n-1}{2x_{k}} $$

So, 
  $$ x_{k+1} = 
      x_{k} 
      - \frac{1}{n}\left( x_{n} - \frac{a}{x^{n-1}}  \right)  
      \left( 1 -  \frac{n - 1}{n} . \frac{1}{2x_{k}} . \left( x_{k} - \frac{a}{x^{n-1}}  \right) \right)
  $$

**Algorithm uses :**<br>
Compute Constant 
$$
\begin{array}{rcl}
 C_1 & = &  \frac{1}{n} \\\\
 C_2 & = & \frac{n-1}{n} \\\\
\end{array}
 $$ 

For **iter** iterations: Compute
$$
\begin{array}{rcl} 
T_1 & = & x_{k}^{n-1} \\\\
T_2 & = & \frac{1}{2x_{k}} \\\\
T_3 & = & x_{k} - \frac{a}{x_{k}^{n-1}} \\\\
\end{array}
$$
So,
$$ x_{k+1} = x_{k} - C1 \times T_3 . \left( 1 - C_2 \times T_2 \times T_3 \right)^{-1} $$