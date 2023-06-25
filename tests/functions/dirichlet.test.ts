import { mu, phi, u } from "../../src/functions/arithmetic"
import { dirichlet } from "../../src/functions/dirichlet"

describe("test dirichlet function and its property : ", ()=>{
  it("test dirichlet function -> ", ()=>{
    var n = dirichlet.f(phi).g(u)(100);
    expect(n).toBe(n);
    var totient = dirichlet.f(mu).g((d) =>d)(25);
    expect(totient).toBe(20n);
    var zero = dirichlet.f(mu).g(u)(25);
    expect(zero).toBe(0n);    
  })
})