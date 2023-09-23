---
date: 2023-09-13
title: 演算法筆記
subtitle: 大三資工上學期必修
category: personal-note
frontCover: https://miro.medium.com/v2/resize:fit:2000/1*GdCKWdjHLUGhkPoXjI6vIQ.jpeg
tag: personal-note, courses
---
## Chapter 1

### Algorightm
- Any well-defined computational procedure that takes some value, or set of values, as **input** and produces some value, or set of values, as **output**
  
### Instances of a problem
- An instance of a problem consists of the input needed to compute a solution to the problem
- 一個問題的輸入

<br>

### Exercises
- **1.1-1 Describe your own real-world example that requires sorting. Describe one that requires finding the shortest distance between two points**
  - 倉庫找手機型號、送貨

- **1.1-2 Other than speed, what other measures of efûciency might you need to consider in a real-world setting?**
  - 效能使用率、彈性、維護性
     
- **1.1-3 Select a data structure that you have seen, and discuss its strengths and limitations.**
  - hash table，可以快速插入、找尋資料，但是可能會有 collision 且依賴 hash function
  
- **1.1-4 How are the shortest-path and traveling-salesperson problems given above similar? How are they different?**
  - 兩者都是要找尋最佳解，前者是找兩點之間的最短距離，後者是找尋經過所有點的最小距離，且最後要回到原點 
  
- **1.1-5 Suggest a real-world problem in which only the best solution will do. Then come up with one in which the best solution is good enough.**
  - 航空調度效率、導航路線 

- **1.1-6 Describe a real-world problem in which sometimes the entire input is available before you need to solve the problem, but other times the input is not entirely available in advance and arrives over time.**
  - 道路壅塞偵測，原本是只透過車流量、時間去判定，如果突然發生車禍，那結果會不如預期 

- **1.2-1 Give an example of an application that requires algorithmic content at the application level, and discuss the function of the algorithms involved.**
  - youtube，影片推薦演算法、廣告推薦演算法 

- **1.2-2 Suppose that for inputs of size n on a particular computer, insertion sort runs in `latex 8n^2` steps and merge sort runs in `latex 64n \lg({n})` steps. For which values of n does insertion sort beat merge sort?**
  - `latex 2\le n\le43`

- **1.2-3 What is the smallest value of n such that an algorithm whose running time is `latex 100n^2` runs faster than an algorithm whose running time is `latex 2n` on the same machine?**
  - `latex n = 15` 

### Problems
- **1-1 Comparison of running times For each function f .n/ and time t in the following table, determine the largest size n of a problem that can be solved in time t, assuming that the algorithm to solve the problem takes f .n/ microseconds.**
  

## Chapter 2
### Insertion Sort
```cpp
for i D 2 to n
    key D A[i]
    // Insert A[i] into the sorted subarray A[1:i-1]
    j = j - 1
    while j > 0 and A[j] > key
        A[j + 1] = A[j]
        j = j - 1
    A[j + 1] = key
```

#### Correctness of Insertion Sort
**Three properties for Loop Invariant:**
– **Initialization**: It is true prior to the first iteration of the 
loop
– **Maintenance**: If it is true before an iteration of the loop, it 
remains true before the next iteration
– **Termination**: When the loop terminates, array is sorted

#### Loop invariant for Insertion sort: 
At the start of each iteration of the for loop of lines 1-8, the subarray A[1..j-1] consists of the elements originally subarray A[1..j-1], but in sorted order. After the lines 4-8, the subarray A[1..j] consists of the elements originally subarray A[1..j] in sorted order.