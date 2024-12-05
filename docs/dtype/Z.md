## Operations

### _log(n, b)
It compute characteistic (integer part) for log(n). Here we implement it kind of binary search. 
**Algorithm**
```js
var n_ = BigInt(a),
i_ = 1024,
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
```


### _powm(a, n, m)
**_powm** functions returns ( a ** n ) % m. It uses the builting pow operator for a ^ n is less than 2000 bits. For rest it uses squaring pow mod algorithm.
```javascript
if (
  typeof n === 'number' 
  && typeof a === 'number'
  && typeof m === "number"
  && n * _log2(a) < 32 * Math.log2(2)) BigInt(Math.pow(a, n) % m);

if(_log2(a) * b < 2000) return a ** n % m;
var a_ = BigInt(a),
n_ = BigInt(n),
m_ = BigInt(m),
res = 1n;

while(n_ > 0) {
  if (n_ & 0x1n) res = (res * a_) % m_;
  a_ = (a_ * a_) % m_;
  n_ >>= 1n;
}   
return res;
```