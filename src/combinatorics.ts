import { constant } from "lodash";

export function* combinations<T>(array: T[], length: number = array.length): IterableIterator<T[]> {
  const cset = new Set<string>();
  for (let i = 0; i < array.length; i++) {
    if (length === 1) {
      var c = [array[i]];
      cstring = [array[i]].toString();
      if (!cset.has(cstring)) {
        cset.add(cstring);
        yield c;
      }
    } else {
      const remaining = combinations(array.slice(i + 1, array.length), length - 1);
      for (let next of remaining) {
        var c = [array[i], ...next], cstring = c.toString();
        if (!cset.has(cstring)) {
          cset.add(cstring);
          yield c;
        };
      }
    }
  }
}

export function combinations_all<T>(array : T[]) : T[][]{
  const N_ = array.length;
  const cset = new Set<string>();
  var res :T[][] = [];
  for (var k_ = 1; k_ <= N_; k_++) {
    var temp = combinations(array, k_);
    res = [...res, ...temp]
  } return res;
}
