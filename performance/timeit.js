"use strict";
/**
 * Decimal.js
 * rmathjs.dtype.BigDecimal - v1
 */

const { randomInt } = require("crypto");
const decimaljs = require("./node_modules/decimal.js/decimal.js");
const {decimal} = require("./lib/dtype/R.js");

const MAX = 281474976710655;

const now = () =>{
  const hrtime = process.hrtime();
  // console.log(hrtime);
  return (hrtime[0] * 1e3 + hrtime[1] / 1e6);
}
/**
 * 
 * @param {function} fn 
 * @returns array of res and time taken to execute
 */
const timeit = (fn, args = [], options = {}) => ({
  perform(iterations) {
    // console.log(args());
    // for(var j = 0; j < 10; j++) console.log(args(), typeof args);
    var t1, t2, totalTime = 0, args_ = args;
    t1 = now();
    console.time(`timeit->${fn.name}@${options.name}`)
    for(var i = 0; i < iterations; i++) {
      // console.log(performance.now(), performance.timeOrigin, now());
      var res = fn.apply(this, Array.prototype.slice.call(args_, 0));
    }
    t2 = now();
    console.timeEnd(`timeit->${fn.name}@${options.name}`)
    totalTime = (t2 - t1);
    return {
      total : totalTime,
      avg : totalTime / iterations
    };
  }
})


function group(grp = []){
  var grp = [];
  var stats_all = {total : 0, avg : 0, elements : {}}
  return {
    add(element, functions){
      grp.push([element, functions])
      return this;
    }, 
    eval(iterations = 1000, fn = ()=>[]){
      var stats = {};
      grp.forEach(([element, functions])=>{
        var func, args;
        stats[element] = {total : 0, avg : 0};
        for(var i = 0; i < functions.length; i++) {
          if (Array.isArray(functions[i])) 
            [func, args] = functions[i];
          else if(typeof functions[i] === "function") [func, args] = [functions[i], []]
          else throw Error(`${functions[i]} is not a function or array of function and its args`)
          var perf = timeit(func, args, {name : element}).perform(iterations);
          
          stats[element].total += perf.total;
          stats[element].avg += perf.avg;
          stats[element][func.name] = perf;
        }
        stats_all.elements = stats;
        return stats;
      })
      stats_all.total += stats.total
      stats_all.avg += stats.total
      return this;
    },
    show(element) {
      console.log("Total Time : ", stats_all.total);
      var elements;
      if (element) elements= [element];
      else elements = Object.keys(stats_all.elements);
      elements.forEach((element)=>{
        console.log(`${element}`, stats_all.elements[element]);        
      })
    }, tocsv(){
      throw new Error("Not Yet Implemented")
    }
  }
}

var A = "87687687687687687687687687687.8768768687687687687687687687687687",B ="7687687687687678687687687687687687687.8768768687687687687687687687687687"
// var A = "1921290.1029102", B = "12367763.19218"
var A = randomInt(MAX), B = randomInt(MAX)
var g = group().add("rmathjs@v1", [
  function init(){decimal(A)},
  function add(){decimal(A).add(B)},
  function sub(){decimal(A).sub(B)},
  function mul(){decimal(A).mul(B)},
  function div(){decimal(A).div(B)},
])
// .add("bigint", [
//   function init(){BigInt(A)},
//   function add(){BigInt(A) + BigInt(B)},
//   function sub(){BigInt(A) - BigInt(B)},
//   function mul(){BigInt(A) * BigInt(B)},
//   function div(){BigInt(A) / BigInt(B)},
// ])
// .add("number", [
//   function init(){A},
//   function add(){A + B},
//   function sub(){A - B},
//   function mul(){A * B},
//   function div(){A / B},
// ])
.add("decimaljs", [
  function init(){new decimaljs(A)},
  function add(){(new decimaljs(A)).plus(B)},
  function sub(){(new decimaljs(A)).minus(B)},
  function mul(){(new decimaljs(A)).times(B)},
  function div(){(new decimaljs(A)).div(B)},
])
// .eval(1000000, ()=>[randomInt(MAX), randomInt(MAX)]).show()

/**
 * 
 decimaljs {
  'rmathjs@v1': {
    total: 11451.000116735697,
    avg: 0.011451000116735697,
    init: { total: 477.165013641119, avg: 0.000477165013641119 },
    add: { total: 1194.4209672510624, avg: 0.0011944209672510623 },
    sub: { total: 5135.041694611311, avg: 0.005135041694611311 },
    mul: { total: 1952.9173083007336, avg: 0.0019529173083007337 },
    div: { total: 2691.455132931471, avg: 0.0026914551329314707 }
  },
  decimaljs: {
    total: 10559.968991607428,
    avg: 0.010559968991607428,
    init: { total: 569.4987336397171, avg: 0.0005694987336397171 },
    add: { total: 1553.595253944397, avg: 0.001553595253944397 },
    sub: { total: 1281.672096312046, avg: 0.001281672096312046 },
    mul: { total: 4176.432492285967, avg: 0.004176432492285967 },
    div: { total: 2978.7704154253006, avg: 0.0029787704154253004 }
  }
}
 */

module.exports.timeit = timeit;