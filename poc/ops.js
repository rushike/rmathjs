
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
function opr( fn, a, b = 1, c = 1, d = 1){
  if (typeof c === "number") {
    if (typeof b === "number") 
      if (typeof a === "number") 
        if(typeof d === "number")
          return fn(a, b, c, d) // all are numbers
    c = BigInt(c)
  }
  if (typeof b === "number") 
    b = BigInt(b)
  if (typeof a === "number")
    a = BigInt(a)
  if (typeof d === "number")
  d = BigInt(d)
  return fn(a, b, c, d); 
}



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
// console.log(_log2(a) * b);
// console.log(opr('bigint')(_powm, a, b, c))
// console.log(opr('bigint')(_powm2,a, b, c))
// var res = timeit(()=>opr('bigint')(_powm, a, b, c), [], {name : "_powm opr1"}).perform(100000); // for some reason not working
// var res = timeit(()=>opr('bigint')(_powm2, a, b, c), [], {name : "powm2 opr"}).perform(100000); // for some reason not working


function A (a1, a2, a3, a4, b1, b2, b3, b4 ) {
  return {a : a1+b1, b : a2+b2, c : a3+b3,d: a4+b4}
}

function B({a1, a2, a3, a4}, {b1, b2, b3,b4}) {
  return {a : a1+b1, b : a2+b2, c : a3+b3,d: a4+b4}
  // return {a : a.a1 + b.b1, b : a.a2 + b.b2, c : a.a3 + b.b3, d : a.a4 + b.b4}
}

function C(a1, a2, a3, a4, b1, b2, b3, b4) {
  if (typeof a1 === "object" && typeof a2 === "object") {
    var {b1, b2,b3, b4} = a2;
    var {a1, a2, a3, a4} = a1;
  }
  return {a : a1+b1, b : a2+b2, c : a3+b3,d: a4+b4}
}

var a1 = 1, a2 = 2, a3 = 3, a4 = 4, b1 = 5, b2 = 6, b3 = 7, b4 = 8 ;
a = {a1, a2, a3, a4}, b = {b1, b2, b3, b4 }
// console.log(A(a1, a2, a3, a4, b1, b2, b3, b4 ));
// console.log(B(a, b));
// console.log(C(a.a1, a.a2,a.a3,a.a4,b.b1, b.b2,b.b3,b.b4));

// var res = timeit(()=>A(a1, a2, a3, a4, b1, b2, b3, b4), [], {name : "many args"}).perform(100000); // for some reason not working
// var res = timeit(()=>B(a, b), [], {name : "2 object args"}).perform(100000); // for some reason not working
// var res = timeit(()=>C(a.a1, a.a2,a.a3,a.a4,b.b1, b.b2,b.b3,b.b4), [], {name : "3 object args"}).perform(100000); // for some reason not working

const isInt = (n) => n % 1 == 0


var N = 21029102909039849038490039810920900129801982019809291092212387928739874928739482798;

// console.log(Number.isInteger(N));
// console.log(isInt(N), !(N % 1));
// var res = timeit(()=>Number.isInteger(N), [], {name : "Number.isInterger"}).perform(100000); // for some reason not working
// var res = timeit(()=>!(N % 1)/*isInt(N)*/, [], {name : "isInt"}).perform(100000); // for some reason not working

function fn (a, b, c){
  return c == 1? a ** b : c * a ** b
}
a = 2n;
b = 1022n;
c= 1n;
var res = timeit(()=>a ** b, [], {name : "as is"}).perform(100000); // for some reason not working
var res = timeit(()=>a ** b, [], {name : "as is"}).perform(100000); // for some reason not working
var res = timeit(()=>a ** b, [], {name : "as is"}).perform(100000); // for some reason not working
var res = timeit(()=>a ** b, [], {name : "as is"}).perform(100000); // for some reason not working
var res = timeit(()=>c * a ** b , [], {name : "c mul as is"}).perform(100000); // for some reason not working
var res = timeit(()=>c == 1? a ** b : c * a ** b, [], {name : "condn check as is"}).perform(100000); // for some reason not working
var res = timeit(()=>fn(a, b, c), [], {name : "fn condn as is"}).perform(100000); // for some reason not working
