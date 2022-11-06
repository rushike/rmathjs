
const { timeit } = require("../performance"); 

const _log2 = (a, b = 10) => {
  var mlog = Math.log2(Number(a));
  if (Number.isFinite(mlog)) return mlog; 
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
    return lg;
}


function _log2String(n) {
  return n.toString(2).length -1;
}


function shiftleft(n, k, b) {
  return n * b ** k
}


function shiftright(n, k, b) {
  return n / b ** k
}

function shiftright2(n, k, b = 10) {
  if (typeof n === "number") return n / 10 ** k;
  return n / 10n ** BigInt(k)
}

function shiftleft2String(n, k) {
  k = Number(k);
  return n.toString() + "0".repeat(k)
}

function opt(fn, ...args) {
  var isanybigint = args.some((a)=>typeof a === 'bigint')
  if(isanybigint) args = args.map(a=>BigInt(a));
  return fn(...args);
}

const opr = (castto = 'number')=>(fn, a, b, c) => {
  if (typeof a === "number") {
    if (typeof b === "number" && castto == 'number') 
      if (typeof c === "number") 
        return fn(a, b, c) // all are numbers
    a = BigInt(a)
  }
  if (typeof b === "number") 
    b = BigInt(b)
  if (typeof c === "number")
    c = BigInt(c)
  return fn(a, b, c); 
};

const _powm = (a, n, m ) => {
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
}

function _powm2(a, n, m) {
  return a ** n % m;
}


MAX = 2n ** 1023n + 12n ** 212n;
MAX = BigInt(Number.MAX_VALUE) * 1212n


// console.log(MAX);

// N = 11290912018029380810835859421211217395823754975983749572309487520948720987354092874590287439752947520934875209384759087094187987519873984179384709837409183n
// console.log(_log(MAX));
// console.log(_log2String(MAX));
// console.log(Math.log2(Number(MAX)));

// var res = timeit(()=>Math.floor(Math.log10(Number(MAX))), [], {name : "math.floor"}).perform(100000); // for some reason not working
// var res = timeit(()=>_log(MAX), [], {name : "Z._log"}).perform(100000); // for some reason not working
// var res = timeit(()=>_log2String(MAX), [], {name : "_log2String"}).perform(100000); // for some reason not working


N = 121121221212, k = 100;
// console.log(opt(shiftright, N, k, 10n));
// console.log(opt(shiftleft2String, N, k, 10n));

// var res = timeit(()=>shiftright2(N, k, 10), [], {name : "shiftright2_div opt1"}).perform(100000); // for some reason not working

var a  = 11121212121212, b = 80, c = 112121212121212121n
console.log(_log2(a) * b);
console.log(opr('bigint')(_powm, a, b, c))
console.log(opr('bigint')(_powm2,a, b, c))
var res = timeit(()=>opr('bigint')(_powm, a, b, c), [], {name : "_powm opr1"}).perform(100000); // for some reason not working
var res = timeit(()=>opr('bigint')(_powm2, a, b, c), [], {name : "powm2 opr"}).perform(100000); // for some reason not working
