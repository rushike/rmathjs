import { InvalidNumberFormatError } from "../error";
import { gcd, lcm } from "../functions/basic";
import { N } from "./N";
import { Zi } from "./Z";

export type Qi = Zi | Rational;
export type Q = Rational;

interface Fraction{
  n : bigint, // numerator
  d : bigint // denominator
}

export class Rational extends N implements Fraction{
  private static FRACTION_STRING_MATCH_EXP = /(?<numerator>[\d]+)\s*\/\s*(?<denominator>[\d]+)/

  n : bigint;
  d : bigint;

  constructor (n : Zi, d : Zi, simple = true) {
    super()
    var [n_, d_] = this.simplify(n, d, simple);
    this.n = n_;
    this.d = d_;
  }

  simplify(n : Zi, d : Zi, simple = true) {   
    var n_ = BigInt(n),
      d_ = BigInt(d),
      gcd_ = simple ? BigInt(gcd(n_, d_)) : 1n;
      if (gcd_ < 0) gcd_ *= -1n;
    return [n_ / gcd_, d_ / gcd_];
  }

  set ({n, d} : {n : Zi | undefined, d : Zi | undefined}) {
    if(n) this.n = BigInt(n);
    else if (d) this.d = BigInt(d);
  }

  clone() {
    return new Rational(this.n, this.d)
  }

  static parse(a : Qi, b : Qi | undefined = undefined) {
    if(typeof a === 'string') {
      var match = a.match(Rational.FRACTION_STRING_MATCH_EXP)
      if(!match) throw new InvalidNumberFormatError(`${a} not in fraction format ${Rational.FRACTION_STRING_MATCH_EXP}`)
      return new Rational(match.groups?.numerator || 0, match.groups?.denominator || 1);
    } 
    else if (a instanceof Rational) {
      return new Rational(a.n, a.d);
    }
    else if (a && b && !(b instanceof Rational)) {
      return new Rational(a, b);
    }
    throw new InvalidNumberFormatError(`Can't parse a = ${a}, b = ${b} not statisfied any input condition`);
  }

  add(b : Qi) {
    var a_ = this.clone(),
    b_ = Rational.parse(b),
    d_ = BigInt(lcm(a_.d, b_.d)),
    n_ = a_.n * (d_ / a_.d) + b_.n * (d_ / b_.d)
    ;
    return new Rational(n_, d_);
  }

  sub(b : Qi) {
    var a_ = this.clone(),
    b_ = Rational.parse(b),
    d_ = BigInt(lcm(a_.d, b_.d)),
    n_ = a_.n * (d_ / a_.d) - b_.n * (d_ / b_.d)
    ;
    return new Rational(n_, d_);
  }

  mul(b : Qi) {
    var a_ = this.clone(),
    b_ = Rational.parse(b),
    d_ = a_.d * b_.d,
    n_ = a_.n * b_.n
    ;
    return new Rational(n_, d_);
  }

  div(b : Qi) {
    var a_ = this.clone(),
    b_ = Rational.parse(b),
    d_ = a_.d * b_.n,
    n_ = a_.n * b_.d
    ;
    return new Rational(n_, d_);
  }
}


export const fraction = (a : Qi, b : Qi | undefined = undefined) => {
  return Rational.parse(a,  b);
}

export const rational = () => {

}