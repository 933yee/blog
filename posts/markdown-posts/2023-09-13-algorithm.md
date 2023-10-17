---
date: 2023-09-13
title: 演算法筆記
subtitle: 大三資工上學期必修
category: personal-note
frontCover: https://miro.medium.com/v2/resize:fit:2000/1*GdCKWdjHLUGhkPoXjI6vIQ.jpeg
tag: personal-note, courses
---
### Chapter 1 

<br>

#### Algorightm
- Any well-defined computational procedure that takes some value, or set of values, as **input** and produces some value, or set of values, as **output**
  
#### Instances of a problem
- An instance of a problem consists of the input needed to compute a solution to the problem
- 一個問題的輸入

<br>


### Chapter 2

<br>

#### Insertion Sort
```cpp
for i = 2 to n
    key = A[i]
    // Insert A[i] into the sorted subarray A[1:i-1]
    j = j - 1
    while j > 0 and A[j] > key
        A[j + 1] = A[j]
        j = j - 1
    A[j + 1] = key
```

##### Correctness of Insertion Sort
**Three properties for Loop Invariant:**
- **Initialization**: It is true prior to the first iteration of the loop
- **Maintenance**: If it is true before an iteration of the loop, it remains true before the next iteration
- **Termination**: When the loop terminates, array is sorted

##### Loop invariant for Insertion sort: 
At the start of each iteration of the for loop of lines 1-8, the subarray A[1..j-1] consists of the elements originally subarray A[1..j-1], but in sorted order. After the lines 4-8, the subarray A[1..j] consists of the elements originally subarray A[1..j] in sorted order.

##### Running Time
- In most CS research, we concentrate on worst-case time
  - Gives an upper bound of running time
  - Worst case occurs fairly often
- **Remark**: Some people also study average-case running time (they assume input is drawn randomly)


#### Merge Sort 
- **Divide and Conquer**
  - Divide a big problem into smaller subproblem
  - Solve (Conquer) smaller subproblems recursively
  - Combine the results to solve the original one  
- Divide list to two halves, A and B
- Sort A using Merge Sort
- Sort B using Merge Sort
- Merge sorted lists of A and B

```cpp
if p >= r: return
q = (p + r) / 2
Merge_Sort(A, p, q)
Merge_Sort(A, q+1, r)
Merge(A, p, q, r)
```
- Merge Sort is **asymptotically** faster than Insertion Sort

<br>

### Chapter 3

<br>

#### O-notation
- O-notation characterizes an **upper bound** on the asympototic behavior of a function
- it says that a function grows **no faster** than a certain rate. This rate is based on the highest order term
- `latex O(g(n)) = {f(n): \exists \; c, \; n_0}` such that `latex 0 \le f(n) \le cg(n) \; \forall \; n \ge n_0`

#### ꭥ-notation
- ꭥ-notation characterizes a **lower bound** on the asymptotic behavior of a function.
- `latex \Omega(g(n)) = {f(n): \exists \; c, \; n_0}` such that `latex 0 \le cg(n) \le f(n) \; \forall \; n \ge n_0`

#### Θ-notation
- Θ-notation characterizes a **tight bound** on the asympototic behavior of a function
- A function grows precisely at a certain rate, again based on the highest-order term
- If a function is both 𝑂(𝑓(𝑛)) and ꭥ(𝑓(𝑛)), then the function is Θ(𝑓(𝑛))
- `latex \Theta(g(n)) = {f(n): \exists \; c_1, c_2, \; n_0}` such that `latex 0 \le c_1 g(n) \le f(n) \le c_2 g(n) \; \forall \; n \ge n_0`

#### o-notation
- `latex O(g(n)) = {f(n): \exists \; c, \; n_0}` such that `latex 0 \le f(n) < cg(n) \; \forall \; n \ge n_0`
- `latex \lim_{n\to\infty} \frac{f(n)}{g(n)} = 0`

#### o-notation
- `latex O(g(n)) = {f(n): \exists \; c, \; n_0}` such that `latex 0 \le cg(n) < f(n) \; \forall \; n \ge n_0`
- `latex \lim_{n\to\infty} \frac{f(n)}{g(n)} = \infty`

<br>

### Chapter 4

<br>

#### Maximum subarray problem
##### FIND-MAX-CROSSING-SUBARRAY (A, low, mid, high)
```cpp
left_sum = -∞ // Find a maximum subarray of the form A[i..mid] 
sum = 0
for i = mid downto low
  sum = sum + A[i ]
  if sum > left_sum
    left_sum = sum
    max_left = i

right_sum = - ∞ // Find a maximum subarray of the form A[mid + 1 .. j ]
sum =0
for j = mid +1 to high
  sum = sum + A[j]
  if sum > right_sum
    right_sum = sum
    max_right = j
// Return the indices and the sum of the two subarrays
return (max_left, max_right, left_sum + right_sum)
```

##### FIND-MAXIMUM-SUBARRAY (A, low, high)
```cpp
if low == high
  return (low, high, A[low])
else
  mid = (low + high) / 2
  (left_low, left_high, left_sum) = FIND_MAXIMUM_SUBARRAY(A, low, mid)
  (right_low, right_high, right_sum) = FIND_MAXIMUM_SUBARRAY(A, mid + 1, high)
  (cross_low, cross_high, cross_sum) = FIND_MAX_CROSSING_SUBARRAY(A, low, mid, high)

if left_sum >= right_sum and left_sum >= cross_sum
  return (left_low, left_high, left_sum)
else if right_sum >= left_sum and right_sum >= cross_sum
  return (right_low, right_high, right_sum)
else
  return (cross_low, cross_high, cross_sum)
```

#### Matrix multiplication
##### Strassen’s method
- Steps
  - `latex S_1 = B_{12} - B_{22}, \; S_2 = A_{11} - A_{12}, \; S_3 = A_{21} - A_{22}, \\ S_4 = B_{21} - B_{11}, \; S_5 = A_{11} - A_{22}, \; S_6 = B_{11} - B_{22}, \\ S_7 = A_{12} - A_{22}, \; S_8 = B_{21} - B_{22}, \; S_9 = A_{11} - A_{21}, \\ S_{10} = B_{11} - B_{12}`

  - `latex P_1 = A_{11}S_1, \; P_2 = B_{22}S_2 \; P_3 = B_{11}S_3, \\ P_4 = A_{22}S_4  \; P_5 = S_5S_6  \; P_6 = S_7S_8`

  - `latex C_{11} = P_5 + P_4 - P_2 + P_6, \\ C_{12} = P_1 + P_2, \\ C_{21} = P_3 + P_4 , \\ C_{22} = P_5 + P_1 - P_3 - P_7`

- Time Complexity
  - `latex T(n) = 7T(n/2) + \Theta(n^2) \\ \qquad\; = \Theta(n^{lg 7}) \\\qquad\;= \Theta(n^{2.81})`

- Strassen’s method is based on the fact that we can multiply two 2  2 matrices using only 7 multiplications (instead of 8)


#### Substitution Method
1. `latex T(n) = 2T(\lfloor n/2 \rfloor) + n` with `latex T(1) = 1`
     - Guess `latex T(n) = O(n lgn)`
     - Show it by **induction**
       - for `latex n = 2`, `latex T(2) = 4`
       - for `latex c = 2`, `latex T(2) \le c n lgn`
     - Base case: `latex n_0 = 2` hold
     - Induction case
       - Assume the guess is true for all `latex n = 2, 3, ..., k`
       - For `latex n = k + 1`, we have
         - `latex T(n) = 2T(\lfloor n/2 \rfloor) + n \\ \qquad\; \le 2c\lfloor n/2 \rfloor lg \lfloor n/2 \rfloor + n \\\qquad\; \le c n lg n/2 + n = c n lgn - c n + n \\ \qquad\; \le c n lg n`

<br>

2. `latex T(n) = T(\lfloor n/2 \rfloor) + T(\lceil n/2 \rceil) + 1`, `latex T(1) = 1`
   - 可以發現當 `latex  n = 16 ` 時
     - `latex T(16) = 2T(8) + 1 \\\qquad\;\; = 4T(4) + 2 + 1 \\\qquad\;\; = 8T(2) + 4 + 2 + 1 \\\qquad\;\; = 16T(1) + 8 + 4 + 2 + 1`
     - 當 n 夠大時， `latex T(1)` 項可以被省略，所以可以猜 `latex T(n) = O(n)`
   - Base case: for `latex c = 1`, `latex T(1) = 1 \le cn = 1`
   - Inductive case: 
     - `latex T(n) = T(\lfloor n/2 \rfloor) + T(\lceil n/2 \rceil) + 1 \\\qquad\; = c\lfloor n/2 \rfloor + c \lceil n/2 \rceil + 1 \\\qquad\; = cn + 1 \not\le cn` 
   - Solution:  prove a **stronger** statement
     - `latex T(n) \le cn - b`
   - Base case: for `latex c = 2, \; b = 1`, `latex T(2) = 3 \le cn - b = 3`
   - Improved Inductive case:
     - `latex T(n) = T(\lfloor n/2 \rfloor) + T(\lceil n/2 \rceil) + 1 \\\qquad\; = c\lfloor n/2 \rfloor - b + c \lceil n/2 \rceil - b + 1 \\\qquad\; = cn - b \le cn`, for `latex b \ge 1`

<br>

3. `latex T(n) = 2T(\sqrt{n}) + lgn`
   - Set `latex m = lgn`, we get `latex T(2^m) = 2T(2^{m/2}) + m`
   - Rename `latex S(m) = T(2^m) = T(n)`, `latex S(m) = 2S(m/2) + m`
   - We solve `latex S(m) = O(mlgm)`, `latex T(n) = O(lgn \cdot lg(lgn)`

#### Recursion Tree Method
1. `latex T(n) = 2T(n/2) + n^2`, with `latex T(1) = 1`
  - Expanding the terms
  - `latex T(n) = 2T(n/2) + n^2 \\\qquad\; = n^2 + n^2/2 + 4T(n/4) \\\qquad\; = n^2 + n^2/2 + n^2/4 + 8T(n/8) \\\qquad\; = ... \\\qquad\; = \sum_{k=0}^{lgn - 1} (1/2)^k n^2 + 2^{lgn}T(1) \\\qquad\; = \Theta(n^2) + \Theta(n) = \Theta(n^2)`
```img
recursive1.png
```

2. `latex T(n) = T(n/3) + T({2n}/3) + n`, with `latex T(1) = 1`
   - 深度是 `latex log_{3/2}n`，因為右邊項都是原本的 2/3
```img
recursive2.png
```

#### Master Method
- When the **recurrence** is in a special form, we can apply the **Master Theorem** to solve the recurrence immediately
- `latex T(n) = aT(n/b) + f(n)` with `latex a \ge 1` and `latex b > 1`, where `latex n/b` is either `latex \lfloor n/b \rfloor` or `latex \lceil n/b \rceil`
- There are three cases
  
1. Case 1
   - `latex f(n) = O(n^{{log_{b}^{a}} - \epsilon})` for some constant `latex \epsilon > 0`
   - 這代表的意義是，recursion 通常最後可以分成兩項
     1. **最後一層的數量**，也就是 Divide
     2. **每一層要做的計算**，也就是 Conquer
   - 比較兩者，Case 1 代表 Divide 的計算量比 Conquer 大，所以可以忽略 Conquer 的時間複雜度
   - 方程式中的 `latex n^{log_{b}{a}}` 代表最後一層有幾個 node，也可以看成 `latex a^{log_b{n}}`，代表每一層 **會增加 a** 倍的 node，且總共有 `latex log_b{n}`層 
   - Example
     1. `latex T(n) = 9T(n/3) + n`, T(1) = 1
        - We have `latex a = 9, \; b = 3, \; f(n) = n`
        - Since `latex n^{log_b{a}} = n^{log_3{9}} = n^2`, `latex f(n) = n = O(n^{2-\epsilon})`, we have `latex T(n) = \Theta(n^2)`, where `latex \epsilon = 1` 
     2. `latex T(n) = 8T(n/2) + n^2`, T(1) = 1
        - We have `latex a = 8, b = 2 and f(n) = \Theta(n^2)`
        - Since `latex n^{log_b{a}} = n^{log_2{8}} = n^3`, `latex f(n) = n^2 = O(n^{3-\epsilon})`, we have `latex T(n) = \Theta(n^3)`, where `latex \epsilon = 1` 
     3. `latex T(n) = 7T(n/2) + n^2`
        - We have `latex a =7, b = 2`, `latex n^{log_b{a}} = n^{lg 7} \approx n^{2.81}`
        - Hence, `latex T(n) = \Theta({n^{2.81}})`
2. Case 2
   - Divide 和 Conquer 計算量一樣
   - If `latex f(n) = O(n^{log_{b}^{a}})`, then `latex T(n) = \Theta(f(n) lg n)`
   - Example
     1. `latex T(n) = T(2n/3) + 1`  
        - `latex a = 1, b = 3/2, f(n) = 1`, and `latex n^{log_b{a}} = n^{log_{3/2}{1}} = 1`
        - We have `latex f(n) = \Theta(n^{log_b{a}}) = \Theta(1)`
        - Thus `latex T(n) = \Theta(lg n)`
3. Case 3
   - Conquer 計算量比 Divide 大
   - If `latex f(n) = \Omega(n^{log_b{a} + \epsilon})` for some constant `latex \epsilon > 0`
   - And if `latex a f(n/b \le cf(n))` for some constant `latex c < 1`
   - Then `latex T(n) = \Theta(f(n))`
   - Example
    1. `latex T(n) = 3T(n/4) + nlgn` 
      - `latex a = 3, b = 4`, `latex f(n) = n lg n`, and `latex n^{log_4{3}} = O(n^{0.793})`
      - `latex f(n) = \Omega(n^{0.793 + \epsilon})`
      - `latex af(n/b) = 3f(n/4) = 3(n/4)lg(n/4) \le (3/4)n lgn = cf(n) = cf(n)`, for c = 3/4
      - Hence, `latex T(n) = \Theta(n lg n)`
4. 不能用的情況
   1. `latex f(n)` is smaller than `latex n^{log_b{a}}` but **not polynomial smaller** 
      - Example
        - `latex T(n) = 2T(n/2) + n/lgn`
          - `latex n^{log_b{a}} = n^{log_2{2}} = n`, **n/lgn** is smaller than **n** but **not polynomial smaller**
          - Hence you can't use Master theorem
   2. `latex f(n)` is larger than `latex n^{log_b{a}}` but **not polynomial larger**
      - Example
        - `latex T(n) = 2T(n/2) + nlgn`
          - `latex n^{log_b{a}} = n^{log_2{2}} = n`, **n/lgn** is larger than **n** but **not polynomial larger**
        - Hence you can't use Master theorem