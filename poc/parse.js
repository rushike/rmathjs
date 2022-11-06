const { randomInt } = require("crypto");
const { decimal } = require("../lib/dtype/R");
const { timeit } = require("../performance");

// parse decimal



function getRandomIntStr(length) {
  var numstr = "1234567890";
  return Array(length).fill(1).map(a=>numstr.charAt(Math.floor(Math.random() * 10))).join("")
}

function getRandomDecimalStr(length = 20) {
  var int = Math.floor(Math.random() * length),
  frac = length - int,
  intstr = getRandomIntStr(int);
  sign = Math.random() > 0.5 ? "-" : ""
  return `${sign}${ intstr || "0" }.${getRandomIntStr(frac)}`
}

function parseDecimalNumber(n){
  return n.length > 15 ? BigInt(n) : Number(n)
}

class R {
  constructor(p, n, e, b) {
    this.p = p;
    this.n = n // p < 15 ? Number(n) : BigInt(n);
    this.e = e;
    this.b = b;
  }
  A(){
    var r = 1219029 * 238239;
    var j = r * 2192818928;
    return j
  }

 B(){
    var r = 1219029 * 238239;
    var j = r * 2192818928;
    return j
  }

  C(){
    var r = 1219029 * 238239;
    var j = r * 2192818928;
    return j
  }

  E(){
    var r = 1219029 * 238239;
    var j = r * 2192818928;
    return j
  }

  K(){
    var r = 1219029 * 238239;
    var j = r * 2192818928;
    return j
  }
}

function parseDecimaStr(str = "7876.3432") {
  // regex = /(?<integer>(?<sign>[+-]?)[\d]+)(\.(?<fraction>[\d]+))?/;
  if (str.includes(".")) regex = /(?<sign>[+-]?)([0]*)(?<integer>\d+)(\.(?<fraction>[\d]+))?/
  else regex = /(?<sign>[+-]?)([0]*)(?<integer>\d+)/
  // console.log(regex);
  var res = str.match(regex)
  var s = res.groups?.sign, 
    i = res.groups?.integer
    f = res.groups?.fraction
    ;
  var nstr =  s + i + f;
  // // var sign_bit = s === "-" ? -1 : 1
  // var n = Number(nstr) // 146 ms
  // var n = BigInt(nstr) // 195 ms
  // // var n = parseDecimalNumber(nstr); // 150 ms
  var p = nstr.length;
  var n = p < 15 ? Number(nstr) : BigInt(nstr);// 147 ms
  var e = i.length;
  var b = 10;
  // n++;
  // taking 160 ms
  // console.log(`str : ${str}, nstr : ${nstr}, n : ${n}, p : ${p}, e : ${e}, b : ${b}`);
  // return {p, n : p < 15 ? Number(nstr) : BigInt(nstr), e, b} // 244.1620416343212 ms 0.00024416204163432123 ms
  // return new R(p, n, e, b);
  return new R(p, n, e, b);
  
}


var t1, t2, totalTime = 0, iterations = 1000000;
var t0 = performance.now();
var MAX = 28147497671065512121211118103489179851682788803846149394804921102577480971614825985529686707207185998498614697281637026896279327000140508787567305876327774738877068973930471798551421630797856424965966399666670778513347602805087727324204209641113826500883207926530022060311388041915004920629766457321813103488371553121226475521195299631487339137834646723230600208000872038503930101035043188510749748482180834692375297051617968354828056678884301974011338154601803968719904572258712589015292324664837394050228730532857456596017182227358990446975661753026813348579306977209328862084829044223110169501115841331732424221440744997160612543095160567516799545240446110655978074853829029773894519619923888198019759047013143159686328816749805481195394714894200391364661080232108371244542628074765288347168493405981656733659850372613286 ;
str = getRandomDecimalStr(14);
// str = getRandomIntStr(14);
for(var i = 0; i < iterations; i++) {
  // N = randomInt(MAX)
  t1 = performance.now();
  // decimal(str)
  // Math.floor(Math.log10(MAX))
  // _log(N)
  // MAX.toString()
  var res = parseDecimaStr(str)
  // var res = parseDecimaStr.apply(this, Array.prototype.slice.call([str], 0));
  t2 = performance.now();
  totalTime += (t2 - t1);
}
t3 = performance.now()

console.log("total time : ", t3 - t0);


// var res = timeit(()=>Math.floor(Math.log10(MAX))).perform(1000000); // for some reason not working
var res = timeit(()=>parseDecimaStr(str)).perform(1000000); // for some reason not working

console.log(totalTime, totalTime / iterations);

console.log(res);