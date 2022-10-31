import { Z } from "./Z";

export class N {
  set(obj : object = {}) : any {};
  clone(): N {return this}


  precision() : bigint {return 128n}
  zero() : N {return this};
  one() : N {return this};

  add(a : any, p : any) : any {};
  sub(a : any, p : any) : any {};
  mul(a : any, p : any) : any {};
  div(a : any, p : any) : any {};
  

  addinv() { // this + this.addinv() = 0
    return this.zero().sub(this, this.precision()); 
  }
  
  mulinv() { // this * this.mulinv() = 1
    return this.one().div(this, this.precision());
  }

  square() {return this.mul(this, undefined)}

  powz(n : Z) {
    var a_ = this.clone(),
    n_ = BigInt(n),
    one = this.one(),
    acc = one
    ;

    if(n_ == 0n) return one;

    while(n_ > 1) {
      if (n_ & 0x1n) acc = acc.mul(a_, this.precision());
      a_ = a_.mul(a_, this.precision());
      n_ = n_ >> 1n;
    }   
    return a_.mul(acc, this.precision());
  }
}