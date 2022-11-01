import _ from "lodash";
import { combinations_all } from "../combinatorics";
import { u } from "./arithmetic";
import { factorize } from "./factors";

type Fn = (n : number | bigint) => (number | bigint);

/**
 * Dirichlet Convolution / Product
 * @TODO implement multiple level dirichelt convolution
 */
class Dirichlet {
  fx : Fn;
  fx_ : Fn[] = [];
  gx : Fn = u;

  constructor(fx : Fn) {
    this.fx = fx;
  }

  f(fx : Fn) {
    this.fx = fx;
    return this;
  }

  f_(fx : Fn) {
    this.fx_.push(fx);
    return this
  }

  g(gx : Fn) {
    this.gx = gx;
    const self = this;

    return (n : number) =>{      
      var n_ = BigInt(n);
      var factors = factorize(n_);

      var factors_flat = factors
                        .map(factor => {                           
                          return Array(factor.k).fill(factor.p).map(v=>BigInt(v))
                        }) // convert Factor type to array of array
                        .reduce((acc, val)=> {
                          return acc.concat(val)
                        }, []); // convert 2 D factor arrays to flat list

      var divisors = combinations_all(factors_flat).filter(factors_=>factors_.length == 1 || !factors_.includes(1n));
      
      return divisors.reduce((acc, factors_)=>{
          var d_ : bigint= factors_.reduce((acc, factor_)=> acc * factor_, 1n);
          var fi =  BigInt(self.fx(d_)) 
          var gi =  BigInt(self.gx(n_ / d_));
          
          return acc + BigInt(self.fx(d_)) * BigInt(self.gx(n_ / d_));
        }, 
      0n);
    }

    // return this.compute;
  }

  compute(n : number | bigint) {
    
  }
}


export const dirichlet = {
  f(fn : Fn) {
    return new Dirichlet(fn);
  }
}