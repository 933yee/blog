---
date: 2023-09-13
title: 演算法筆記
subtitle: 大三資工上學期必修
category: personal-note
frontCover: https://miro.medium.com/v2/resize:fit:2000/1*GdCKWdjHLUGhkPoXjI6vIQ.jpeg
tag: personal-note, courses
---
## Chapter 1 

<br>

### Algorightm
- Any well-defined computational procedure that takes some value, or set of values, as **input** and produces some value, or set of values, as **output**
  
### Instances of a problem
- An instance of a problem consists of the input needed to compute a solution to the problem
- 一個問題的輸入

<br>


## Chapter 2

<br>

### Insertion Sort
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

#### Correctness of Insertion Sort
**Three properties for Loop Invariant:**
- **Initialization**: It is true prior to the first iteration of the loop
- **Maintenance**: If it is true before an iteration of the loop, it remains true before the next iteration
- **Termination**: When the loop terminates, array is sorted

#### Loop invariant for Insertion sort: 
At the start of each iteration of the for loop of lines 1-8, the subarray A[1..j-1] consists of the elements originally subarray A[1..j-1], but in sorted order. After the lines 4-8, the subarray A[1..j] consists of the elements originally subarray A[1..j] in sorted order.

#### Running Time
- In most CS research, we concentrate on worst-case time
  - Gives an upper bound of running time
  - Worst case occurs fairly often
- **Remark**: Some people also study average-case running time (they assume input is drawn randomly)


### Merge Sort 
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

## Chapter 3

<br>

### O-notation
- O-notation characterizes an **upper bound** on the asympototic behavior of a function
- it says that a function grows **no faster** than a certain rate. This rate is based on the highest order term
- `latex O(g(n)) = {f(n): \exists \; c, \; n_0}` such that `latex 0 \le f(n) \le cg(n) \; \forall \; n \ge n_0`

### ꭥ-notation
- ꭥ-notation characterizes a **lower bound** on the asymptotic behavior of a function.
- `latex \Omega(g(n)) = {f(n): \exists \; c, \; n_0}` such that `latex 0 \le cg(n) \le f(n) \; \forall \; n \ge n_0`

### Θ-notation
- Θ-notation characterizes a **tight bound** on the asympototic behavior of a function
- A function grows precisely at a certain rate, again based on the highest-order term
- If a function is both 𝑂(𝑓(𝑛)) and ꭥ(𝑓(𝑛)), then the function is Θ(𝑓(𝑛))
- `latex \Theta(g(n)) = {f(n): \exists \; c_1, c_2, \; n_0}` such that `latex 0 \le c_1 g(n) \le f(n) \le c_2 g(n) \; \forall \; n \ge n_0`

### o-notation
- `latex O(g(n)) = {f(n): \exists \; c, \; n_0}` such that `latex 0 \le f(n) < cg(n) \; \forall \; n \ge n_0`
- `latex \lim_{n\to\infty} \frac{f(n)}{g(n)} = 0`

### o-notation
- `latex O(g(n)) = {f(n): \exists \; c, \; n_0}` such that `latex 0 \le cg(n) < f(n) \; \forall \; n \ge n_0`
- `latex \lim_{n\to\infty} \frac{f(n)}{g(n)} = \infty`

<br>

## Chapter 4

<br>

### Maximum subarray problem
#### FIND-MAX-CROSSING-SUBARRAY (A, low, mid, high)
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
Return (max_left, max_right, left_sum + right_sum)
```

#### FIND-MAX-SUBARRAY (A, low, high)
```cpp
if low == high
  
```
