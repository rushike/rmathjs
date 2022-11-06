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