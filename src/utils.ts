export type Fn = (a : any)=>any;

export type ErrorObj = {
  getOrElse : (res : any) => any;
}

export function Try(fn :Fn) : ErrorObj {
  return {
    getOrElse(res : any) {
      try {
        return fn(0);
      } catch {
        return res;
      }
    } 
  }
}