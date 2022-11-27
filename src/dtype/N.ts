import { NotImplementedError } from "../error";
import { Z } from "./Z";

export type ConfigType = {
  precision : number,
  base : number
}

const CONFIG : ConfigType = {
  precision : 32, // in mode of base. So by default 32 digits.
  base : 10
}

export function config(c = {}) {
  Object.entries(c).forEach(([key, val]) =>{ 
    // @ts-ignore
    if (key in CONFIG) CONFIG[key] = val;
  })
}

export class N {
  set(obj : object = {}) : any {};
  clone() : any {return this}


  toString() : any {throw new NotImplementedError("Base class 'N' doesn't implement toString method.")}
  
  // toPrecision() : any {return this}

  zero() : any {return this};
  one() : any {return this};

  add(a : any, p? : any) : any {};
  sub(a : any, p? : any) : any {};
  mul(a : any, p? : any) : any {};
  div(a : any, p? : any) : any {};
  

  addinv() { // this + this.addinv() = 0
    return this.zero().sub(this, CONFIG.precision); 
  }

  neg(){
    return this.addinv();
  }
  
  mulinv() { // this * this.mulinv() = 1
    return this.one().div(this, CONFIG.precision);
  }

  square() {return this.mul(this, CONFIG.precision)}

  powz(n : Z) {
    var
      a = this,
      one = this.one(),
      res = one,
      ODD_MASK = typeof n === 'number' ? 1 : 1n;
    ;
    if(n == 0) return one;

    while(n > 0) {
      //@ts-ignore n & 1
      if (n & ODD_MASK) res = res.mul(a);
      a = a.square();
      // console.log("this --> ", this, a);
      
      //@ts-ignore n >> 1
      n >>= ODD_MASK;
    }   
    return res;
  }
}