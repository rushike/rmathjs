## Results
## Function with object as param over multiple params
Funtion with multiple paramerter is faster than with function with single parameter as object

### Number.Integer vs n % 1 == 0
Number.Interger is conistent and faster than *n%1==0* for all numbers

### Computing pow as r * a ^ n
Usaully r = 1, so it is equivalent to a ^ n. computing such pow with condition **r** takes more time that a ^ n, by half millisecond over billion operation on mac m1 pro.
So don't modify pow like that.