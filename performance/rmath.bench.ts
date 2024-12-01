/**
 * @module rmath.bech.ts
 * run cmd :
 *  - deno --unstable-sloppy-imports --allow-read  performance/rmath.ts
 * 
 * 
 * Bench 
 * cmd : 
 *  - deno bench --unstable-sloppy-imports --allow-read performance/rmath.bench.ts
CPU | Apple M1 Pro
Runtime | Deno 2.0.6 (aarch64-apple-darwin)

file:///Users/rushike/workspace/repos/rmathjs/performance/rmath.bench.ts

benchmark   time/iter (avg)        iter/s      (min … max)           p75      p99     p995
----------- ----------------------------- --------------------- --------------------------
real               535.2 ns     1,868,000 (531.7 ns … 581.3 ns) 536.9 ns 546.4 ns 581.3 ns
add                  1.5 µs       674,900 (  1.5 µs …   1.5 µs)   1.5 µs   1.5 µs   1.5 µs
sub                  1.3 µs       778,800 (  1.3 µs …   1.3 µs)   1.3 µs   1.3 µs   1.3 µs
mul                  2.3 µs       427,500 (  2.3 µs …   2.4 µs)   2.3 µs   2.4 µs   2.4 µs
div                  8.9 µs       112,600 (  8.5 µs … 211.2 µs)   8.8 µs  10.0 µs  11.8 µs
powz                15.2 µs        65,870 ( 14.6 µs … 189.9 µs)  15.0 µs  17.3 µs  27.8 µs
sin                356.4 µs         2,806 (344.7 µs … 609.7 µs) 352.5 µs 470.0 µs 493.2 µs
cos                366.9 µs         2,726 (357.2 µs … 610.9 µs) 364.7 µs 466.7 µs 482.6 µs
tan                721.8 µs         1,386 (705.9 µs … 971.1 µs) 719.7 µs 826.3 µs 844.8 µs
sinh               521.7 µs         1,917 (510.9 µs … 638.8 µs) 518.5 µs 612.2 µs 627.7 µs
cosh               520.9 µs         1,920 (510.5 µs … 657.5 µs) 516.8 µs 609.0 µs 618.5 µs
tanh               425.0 µs         2,353 (415.9 µs … 580.2 µs) 421.5 µs 507.2 µs 516.8 µs
arcsin              58.9 µs        16,980 ( 57.3 µs … 177.2 µs)  58.0 µs  75.0 µs 126.3 µs
arccos             858.6 µs         1,165 (847.2 µs …   1.1 ms) 858.5 µs 948.2 µs 959.8 µs
arctan              46.2 ms          21.6 ( 45.8 ms …  49.3 ms)  46.1 ms  49.3 ms  49.3 ms
arsinh               6.4 ms         157.2 (  6.3 ms …   6.5 ms)   6.4 ms   6.5 ms   6.5 ms
arcosh               6.4 ms         157.3 (  6.3 ms …   6.5 ms)   6.4 ms   6.5 ms   6.5 ms
artanh                2.2 s           0.5 (   2.1 s …    2.2 s)    2.2 s    2.2 s    2.2 s
ln                   6.3 ms         158.1 (  6.2 ms …   6.7 ms)   6.4 ms   6.7 ms   6.7 ms
exp                517.0 µs         1,934 (505.1 µs … 849.5 µs) 512.8 µs 702.0 µs 735.4 µs
nroot              203.4 µs         4,917 (190.3 µs … 474.4 µs) 207.8 µs 257.5 µs 344.8 µs
 */

import { randomBytes, randomInt } from "node:crypto";
import * as path from "https://deno.land/std@0.138.0/path/mod.ts";

import {R, Ri} from "../src/dtype/R.ts"
import {Z, Zi} from "../src/dtype/Z.ts"

import { real} from "../src/index.ts";

import {
  sin, cos, tan, sinh, cosh, tanh, arcsin, arsinh, arccos, arcosh, arctan, artanh, ln, exp, nroot

} from "../src/functions/elementary.ts"

import { readJson, getModuleDir} from "./utils.ts";

const elementary = await import("../src/functions/elementary.ts")


const MAX = 281474976710655;


function randomInts(size : number, length : number) {
  const nums : Z[] = [];
  for (let i = 0; i < length; i++) { 
    nums.push(randomInt(MAX));
  }
  return nums;
}

function randomRealStrings(size : number, length : number) {
  const nums : string[] = [];
  for (let i = 0; i < length; i++) { 
    const intSize = randomInt(size - 2) + 1;
    nums.push(
      BigInt("0x" + randomBytes(intSize).toString("hex")).toString(10) + "." + BigInt("0x" + randomBytes(size - intSize).toString("hex")).toString(10)
    )
  }
  return nums;
}



const _REAL_STRINGS = await readJson(path.join(getModuleDir(import.meta), "random-real-strings.json"));
const REAL_STRINGS = [_REAL_STRINGS[0]];



Deno.bench({
  name: "real",
  fn(b) {
    let res;
    for (let i = 0; i < REAL_STRINGS.length; i++) {
      res = real(REAL_STRINGS[i]);
    }
    res;
  },
});

Deno.bench({
  name: "add",
  fn(b) {
    let res;
    for (let i = 0; i < REAL_STRINGS.length; i++) {
      res = real(REAL_STRINGS[i]).add(REAL_STRINGS[REAL_STRINGS.length - i - 1]);
    }
    res;
  },
});

Deno.bench({
  name: "sub",
  fn(b) {
    let res;
    for (let i = 0; i < REAL_STRINGS.length; i++) {
      res = real(REAL_STRINGS[i]).sub(REAL_STRINGS[REAL_STRINGS.length - i - 1]);
    }
    res;
  },
});

Deno.bench({
  name: "mul",
  fn(b) {
    let res;
    for (let i = 0; i < REAL_STRINGS.length; i++) {
      res = real(REAL_STRINGS[i]).mul(REAL_STRINGS[REAL_STRINGS.length - i - 1]);
    }
    res;
  },
});

Deno.bench({
  name: "div",
  fn(b) {
    let res;
    for (let i = 0; i < REAL_STRINGS.length; i++) {
      res = real(REAL_STRINGS[i]).div(REAL_STRINGS[REAL_STRINGS.length - i - 1]);
    }
    res;
  },
});

Deno.bench({
  name: "powz",
  fn(b) {
    let res;
    for (let i = 0; i < REAL_STRINGS.length; i++) {
      res = real(REAL_STRINGS[i]).powz(10);
    }
    res;
  },
});


Deno.bench({
  name: "sin",
  fn() {
    let res;
    
    for (let i = 0; i < REAL_STRINGS.length; i++) {
      res = sin(REAL_STRINGS[i]);
    }
    res;
  },
});

Deno.bench({
  name: "cos",
  fn() {
    let res;
    
    for (let i = 0; i < REAL_STRINGS.length; i++) {
      res = cos(REAL_STRINGS[i]);
    }
    res;
  },
});

Deno.bench({
  name: "tan",
  fn() {
    let res;
    
    for (let i = 0; i < REAL_STRINGS.length; i++) {
      res = tan(REAL_STRINGS[i]);
    }
    res;
  },
});

Deno.bench({
  name: "sinh",
  fn() {
    let res;
    
    for (let i = 0; i < REAL_STRINGS.length; i++) {
      res = sinh(REAL_STRINGS[i]);
    }
    res;
  },
});

Deno.bench({
  name: "cosh",
  fn() {
    let res;
    
    for (let i = 0; i < REAL_STRINGS.length; i++) {
      res = cosh(REAL_STRINGS[i]);
    }
    res;
  },
});

Deno.bench({
  name: "tanh",
  fn() {
    let res;
    
    for (let i = 0; i < REAL_STRINGS.length; i++) {
      res = tanh(REAL_STRINGS[i]);
    }
    res;
  },
});


Deno.bench({
  name: "arcsin",
  fn() {
    let res;
    
    for (let i = 0; i < REAL_STRINGS.length; i++) {
      res = arcsin(REAL_STRINGS[i]);
    }
    res;
  },
});


Deno.bench({
  name: "arccos",
  fn() {
    let res;
    
    for (let i = 0; i < REAL_STRINGS.length; i++) {
      res = arccos(REAL_STRINGS[i]);
    }
    res;
  },
});


Deno.bench({
  name: "arctan",
  fn() {
    let res;
    
    for (let i = 0; i < REAL_STRINGS.length; i++) {
      res = arctan(REAL_STRINGS[i]);
    }
    res;
  },
});


Deno.bench({
  name: "arsinh",
  fn() {
    let res;
    
    for (let i = 0; i < REAL_STRINGS.length; i++) {
      res = arsinh(REAL_STRINGS[i]);
    }
    res;
  },
});



Deno.bench({
  name: "arcosh",
  fn() {
    let res;
    
    for (let i = 0; i < REAL_STRINGS.length; i++) {
      res = arcosh(REAL_STRINGS[i]);
    }
    res;
  },
});


Deno.bench({
  name: "artanh",
  fn() {
    let res;
    
    for (let i = 0; i < REAL_STRINGS.length; i++) {
      res = artanh(REAL_STRINGS[i]);
    }
    res;
  },
});


Deno.bench({
  name: "ln",
  fn() {
    let res;
    
    for (let i = 0; i < REAL_STRINGS.length; i++) {
      res = ln(REAL_STRINGS[i]);
    }
    res;
  },
});


Deno.bench({
  name: "exp",
  fn() {
    let res;
    
    for (let i = 0; i < REAL_STRINGS.length; i++) {
      res = exp(REAL_STRINGS[i]);
    }
    res;
  },
});


Deno.bench({
  name: "nroot",
  fn() {
    let res;
    
    for (let i = 0; i < REAL_STRINGS.length; i++) {
      res = nroot(REAL_STRINGS[i]);
    }
    res;
  },
});

