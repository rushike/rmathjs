import _ from "lodash";
import { combinations, combinations_all } from "../src/combinatorics";

describe("combinatorics functions testing : ", ()=>{
  it("test combinations of size 'k' from array -> ", ()=>{
    var res : number[][] = [...combinations([2, 2, 3, 3], 2)];
    expect(res).toEqual([[2, 2,], [2, 3], [3, 3]]);
  })

  it("test combinations of 'all' length from array ->", ()=>{
    var res : number[][] = [...combinations_all([2, 2, 3, 3])];
    var expected = [
      [ 2 ],
      [ 3 ],
      [ 2, 2 ],
      [ 2, 3 ],
      [ 3, 3 ],
      [ 2, 2, 3 ],
      [ 2, 3, 3 ],
      [ 2, 2, 3, 3 ]
    ];
    expect(res).toEqual(expected);
  })
});