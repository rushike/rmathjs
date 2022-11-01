
/**
 * Decimal.js
 * rmathjs.dtype.BigDecimal - v1
 */

const { randomInt } = require("crypto");
const decimaljs = require("./node_modules/decimal.js/decimal.js");
const {decimal} = require("./lib/dtype/R.js");

var totalTime = {
    "smallint" : {
      "number" : {
        "total" : 0,
        "avg" : 0,
        "ops" : {
          "init" : {
            "total" : 0,
            "avg" : 0
          },
          "add" : {
            "total" : 0,
            "avg" : 0
          },
          "sub" : {
            "total" : 0,
            "avg" : 0
          },
          "mul" : {
            "total" : 0,
            "avg" : 0
          },
          "div" : {
            "total" : 0,
            "avg" : 0
          },
        }
      },
      "bigint" : {
        "total" : 0,
        "avg" : 0,
        "ops" : {
          "init" : {
            "total" : 0,
            "avg" : 0
          },
          "add" : {
            "total" : 0,
            "avg" : 0
          },
          "sub" : {
            "total" : 0,
            "avg" : 0
          },
          "mul" : {
            "total" : 0,
            "avg" : 0
          },
          "div" : {
            "total" : 0,
            "avg" : 0
          },
        }
      },
      "decimaljs" : {
        "total" : 0,
        "avg" : 0,
        "ops" : {
          "init" : {
            "total" : 0,
            "avg" : 0
          },
          "add" : {
            "total" : 0,
            "avg" : 0
          },
          "sub" : {
            "total" : 0,
            "avg" : 0
          },
          "mul" : {
            "total" : 0,
            "avg" : 0
          },
          "div" : {
            "total" : 0,
            "avg" : 0
          },
        }
      },
      "rmathjs@v1" : {
        "total" : 0,
        "avg" : 0,
        "ops" : {
          "init" : {
            "total" : 0,
            "avg" : 0
          },
          "add" : {
            "total" : 0,
            "avg" : 0
          },
          "sub" : {
            "total" : 0,
            "avg" : 0
          },
          "mul" : {
            "total" : 0,
            "avg" : 0
          },
          "div" : {
            "total" : 0,
            "avg" : 0
          },
        }
      }
    },
    
    "largeint" : {
      "number" : {
        "total" : 0,
        "avg" : 0,
        "ops" : {
          "init" : {
            "total" : 0,
            "avg" : 0
          },
          "add" : {
            "total" : 0,
            "avg" : 0
          },
          "sub" : {
            "total" : 0,
            "avg" : 0
          },
          "mul" : {
            "total" : 0,
            "avg" : 0
          },
          "div" : {
            "total" : 0,
            "avg" : 0
          },
        }
      },
      "bigint" : {
        "total" : 0,
        "avg" : 0,
        "ops" : {
          "init" : {
            "total" : 0,
            "avg" : 0
          },
          "add" : {
            "total" : 0,
            "avg" : 0
          },
          "sub" : {
            "total" : 0,
            "avg" : 0
          },
          "mul" : {
            "total" : 0,
            "avg" : 0
          },
          "div" : {
            "total" : 0,
            "avg" : 0
          },
        }
      },
      "decimaljs" : {
        "total" : 0,
        "avg" : 0,
        "ops" : {
          "init" : {
            "total" : 0,
            "avg" : 0
          },
          "add" : {
            "total" : 0,
            "avg" : 0
          },
          "sub" : {
            "total" : 0,
            "avg" : 0
          },
          "mul" : {
            "total" : 0,
            "avg" : 0
          },
          "div" : {
            "total" : 0,
            "avg" : 0
          },
        }
      },
      "rmathjs@v1" : {
        "total" : 0,
        "avg" : 0,
        "ops" : {
          "init" : {
            "total" : 0,
            "avg" : 0
          },
          "add" : {
            "total" : 0,
            "avg" : 0
          },
          "sub" : {
            "total" : 0,
            "avg" : 0
          },
          "mul" : {
            "total" : 0,
            "avg" : 0
          },
          "div" : {
            "total" : 0,
            "avg" : 0
          },
        }
      }
    }
    
},

SIZE = 1000000,
MAX = 281474976710655,
// MAX = 2814,
A, B, a, b, t1, t2, t3, t4, res
;

function run(A, B, loc, num = false) {
  var a, b, t1, t2, t3, t4, res
  if(num){
    // console.log("Number");
    t3 = performance.now();
    t1 = performance.now();
    a = A;
    b = B;
    t2 = performance.now();
    totalTime[loc].number.ops.init.total += t2 - t1;
    res = a + b
    // console.log("Add : ", res.toString());
    t1 = performance.now()
    totalTime[loc].number.ops.add.total += t1 - t2;
    res = a - b
    // console.log("Sub : ", res.toString());
    t2 = performance.now()
    totalTime[loc].number.ops.sub.total += t2 - t1;
    res = a * b
    // console.log("Mul : ", res.toString());
    t1 = performance.now()
    totalTime[loc].number.ops.mul.total += t1 - t2
    res = a / b
    // console.log("Div : ", res.toString());
    t2 = performance.now()
    totalTime[loc].number.ops.div.total += t2 - t1;
    t4 = performance.now();
    totalTime[loc].number.total += t4 - t3;
    // console.log("---------------------------------");
  }

  // console.log("BigInt");
  t3 = performance.now();
  t1 = performance.now();
  a = BigInt(A);
  b = BigInt(B);
  t2 = performance.now();
  totalTime[loc].bigint.ops.init.total += t2 - t1;
  res = a + b
  // console.log("Add : ", res.toString());
  t1 = performance.now()
  totalTime[loc].bigint.ops.add.total += t1 - t2;
  res = a - b
  // console.log("Sub : ", res.toString());
  t2 = performance.now()
  totalTime[loc].bigint.ops.sub.total += t2 - t1;
  res = a * b
  // console.log("Mul : ", res.toString());
  t1 = performance.now()
  totalTime[loc].bigint.ops.mul.total += t1 - t2
  res = a / b
  // console.log("Div : ", res.toString());
  t2 = performance.now()
  totalTime[loc].bigint.ops.div.total += t2 - t1;
  t4 = performance.now();
  totalTime[loc].bigint.total += t4 - t3;
  // console.log("---------------------------------");

  // console.log("decimaljs");
  t3 = performance.now();
  t1 = performance.now();
  a = new decimaljs(A);
  b = new decimaljs(B);
  t2 = performance.now();
  totalTime[loc].decimaljs.ops.init.total += t2 - t1;
  res = a.plus(b)
  // console.log("Add : ", res.toString());
  t1 = performance.now()
  totalTime[loc].decimaljs.ops.add.total += t1 - t2;
  res = a.minus(b)
  // console.log("Sub : ", res.toString());
  t2 = performance.now()
  totalTime[loc].decimaljs.ops.sub.total += t2 - t1;
  res = a.times(b)
  // console.log("Mul : ", res.toString());
  t1 = performance.now()
  totalTime[loc].decimaljs.ops.mul.total += t1 - t2
  res = a.div(b)
  // console.log("Div : ", res.toString());
  t2 = performance.now()
  totalTime[loc].decimaljs.ops.div.total += t2 - t1;
  t4 = performance.now();
  totalTime[loc].decimaljs.total += t4 - t3;
  // console.log("---------------------------------");
  
  // console.log("rmathjs@v1");
  t3 = performance.now();
  t1 = performance.now();
  a = decimal(A);
  b = decimal(B);
  t2 = performance.now();
  totalTime[loc]["rmathjs@v1"].ops.init.total += t2 - t1;
  res = a.add(b)
  // console.log("Add : ", res);
  t1 = performance.now()
  totalTime[loc]["rmathjs@v1"].ops.add.total += t1 - t2;
  res = a.sub(b)
  // console.log("Sub : ", res);
  t2 = performance.now()
  totalTime[loc]["rmathjs@v1"].ops.sub.total += t2 - t1;
  res = a.mul(b)
  // console.log("Mul : ", res);
  t1 = performance.now()
  totalTime[loc]["rmathjs@v1"].ops.mul.total += t1 - t2
  res = a.div(b);
  // console.log("Div : ", res);
  t2 = performance.now()
  totalTime[loc]["rmathjs@v1"].ops.div.total += t2 - t1;
  t4 = performance.now();
  totalTime[loc]["rmathjs@v1"].total += t4 - t3;  
  // console.log("---------------------------------");

}

// inititalization, add, mul, sub, div
for(var i = 0; i < SIZE; i++) {
  A = randomInt(MAX);
  B = randomInt(MAX);
  run(A, B, "smallint", true)
  
}

console.log("Total Time number : ", totalTime.smallint.number.total);
console.log("Total Time bigint : ", totalTime.smallint.bigint.total);
console.log("Total Time decimal.js : ", totalTime.smallint.decimaljs.total);
console.log("Total Time rmathjs@v1.js : ", totalTime.smallint["rmathjs@v1"].total);
console.log("number : ", totalTime.smallint.number.ops);
console.log("bigint : ", totalTime.smallint.bigint.ops);
console.log("decimal : ", totalTime.smallint.decimaljs.ops);
console.log("rmathjs@v1 : ", totalTime.smallint["rmathjs@v1"].ops);


// Small Ints

// Small Decimal


// Large Int
// var l = 30, As, Bs,
// s = "0123456789"
// for(var i = 0; i < SIZE; i++) {
//   As = Array(l).fill(1).map(a=>s.charAt(Math.floor(Math.random() * 10))).join("")
//   Bs = Array(l).fill(1).map(a=>s.charAt(Math.floor(Math.random() * 10))).join("")
//   run(As, Bs, "largeint")
// }

console.log("Total Time bigint : ", totalTime.largeint.bigint.total);
console.log("Total Time decimal.js : ", totalTime.largeint.decimaljs.total);
console.log("Total Time rmathjs@v1.js : ", totalTime.largeint["rmathjs@v1"].total);
console.log("bigint : ", totalTime.largeint.bigint.ops);
console.log("decimal : ", totalTime.largeint.decimaljs.ops);
console.log("rmathjs@v1 : ", totalTime.largeint["rmathjs@v1"].ops);

// Large Decimal