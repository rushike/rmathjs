from functools import reduce
import math
import random
from time import time

def x0_(n, t):
  lg = math.floor(math.log2(n))
  n_ = 2 ** lg
  frac = (n - n_ ) /  n_
  x_ = lg // t + frac
  print(lg, n_, frac, x_)
  return math.pow(2, x_)

def f(n, t ):
  x0 = 1 # x0_(n, t)
  xn = x0
  r = (t - 1) / t
  print("x0 : ", x0, r)
  for _ in range(10000): 
    # print(_)
    x_n = math.pow(xn, t)
    A_ = n / x_n
    A = 1 - n / x_n
    B = 1 - r * A
    C_ = xn * A
    # print("C_, xn : ", C_, xn, C_ / t, t)
    C = C_ / t
    D = C * B
    t_ = ((math.pow(xn, t) - n) / (t * math.pow(xn, t - 1))) * (1 - ((t - 1) / t) * (1 - n / math.pow(xn, t)))
    xn = xn - t_ # t_
    # print("x_n : ", x_n)
    # print("A : ", A, " B : ", B)
    # print("C : ", C,  "D : ",D)
    # print("xn : ", xn)

  return xn

print(f(3, 2), math.sqrt(3))
err = []
for _ in range(100):
  t =  random.randint(1, 10)
  n = random.random() * 100000
  math_ = math.pow(n, 1/t)
  my_ = f(n, t)
  print(n, t, math_, my_, math_ - my_)
  err.append(math_ - my_)

print("-" * 67)
print(math.sqrt(reduce(lambda x, y : x + y ** 2, err)))

a = 94726.60004000209
# a = 8388608
# a = 2
# print(f(a, 2), math.pow(a, 1/2))
# x0 :  8.593463986856397
# 1147.9315138152554 12.838602500623567

# 16 65536 0.4454132086181959 1.4454132086181959
# x0 :  2.7234081445835376
# 94726.60004000209 9 3.5722457461927233 10.382821204548142 -6.8105754583554186


def sqrt(n, iter = 10) :
  x0 = 1
  xn = x0

  for i in range(iter):
    xn = xn - (xn ** 2 - n) / (2 * xn)

  return xn

def sqrt2(n, iter = 10) :
  x0 = 1
  xn = x0

  for i in range(iter):
    xn = xn - xn / 2 + n / 2 * 1 / xn
  return xn

# n = 290900890889879879789
# t = time()
# r1 = sqrt(n)
# d1 = time()
# r2 = sqrt2(n)
# d2 = time()
# r3 = math.sqrt(n)
# d3 = time()
# print("sqrt1 : ", r1, d1 - t)
# print("sqrt2 : ", r1, d2 - d1)
# print("math.sqrt : ", r1, d3 - d2)