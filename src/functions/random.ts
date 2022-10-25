export function random_int(a : number | bigint = 0, b : number | bigint = 1<<30 ){
  var a_ = Number(a), b_ = Number(b);
  return a_ + Math.ceil((b_ - a_) *  Math.random())
}