---
date: 2023-07-09
title: Machine Learning Python Practice
subtitle: Machine learning basic practice
category: personal note
frontCover: study.png
---
```citation
最近看了一堆 ML 理論，完全沒有實作，所以想先從簡單的下手。
```

```youtube
https://www.youtube.com/watch?v=wm9yR1VspPs
```

<hr style="border-color: rgb(161, 161, 161, 0.5);">

## Data preprocessing

```python
import pandas as pd
url = "https://raw.githubusercontent.com/GrandmaCan/ML/main/Resgression/Salary_Data.csv"
data = pd.read_csv(url) # 把 csv 轉成 pandas dataframe格式

x = data['YearsExperience']
y = data['Salary']
```

```python
import matplotlib.pyplot as plt

def plot_pred(w, b):
  y_pred = x*w+b
  plt.plot(x, y_pred, label='predict') # 連續
  plt.scatter(x, y, marker='x', color = 'red', label = 'data'); # 非連續
  plt.title('exp-salary')
  plt.xlabel('exp')
  plt.ylabel('salary')
  plt.xlim([0, 12]) # 限制 x 範圍
  plt.ylim([-60, 140]) # 限制 y 範圍
  plt.legend() # 增加圖例
  plt.show()

plot_pred(0, 10);
```
```img
1.png
```

<br>
<hr style="border-color: rgb(161, 161, 161, 0.5);">

## Cost Function

```python
def compute_cost(x, y, w, b):
  y_pred = w*x+b
  cost = (y-y_pred)**2
  cost = cost.sum()/len(x)
  return cost
```
```python
costs = []
for w in range(-100, 101):
  cost = compute_cost(x, y, w, 0)
  costs.append(cost)

plt.plot(range(-100, 101), costs)
plt.title('cost function b=0 w=-100~100')
plt.xlabel("w")
plt.ylabel("cost")
plt.show()
```
```img
2.png
```
```python
import numpy as np

# 列出ws -100 ~ 100 , bs -100 ~ 100 的 cost
ws = np.arange(-100, 101) # 跟 range 類似
bs = np.arange(-100, 101)
costs = np.zeros((201, 201))

i = 0
for w in ws:
  j = 0
  for b in bs:
    cost = compute_cost(x, y, w, b)
    costs[i, j] = cost
    j = j + 1
  i = i + 1
```

```python
plt.figure(figsize=(7, 7)) # figure 大小
ax = plt.axes(projection="3d") # 3D 圖
ax.view_init(45, -120) # 圖片視角
ax.xaxis.set_pane_color((1.0, 1.0, 1.0)) # x plane 顏色
ax.yaxis.set_pane_color((1.0, 1.0, 1.0)) # y plane 顏色
ax.zaxis.set_pane_color((1.0, 1.0, 1.0)) # z plane 顏色
b_grid, w_grid = np.meshgrid(bs, ws) # 接收兩個一維向量，產生一個座標矩陣
                                     # https://wangyeming.github.io/2018/11/12/numpy-meshgrid/   
ax.plot_surface(w_grid, b_grid, costs, cmap="Spectral_r", alpha=0.7) # cost 的顏色
ax.plot_wireframe(w_grid, b_grid, costs, color="black", alpha=0.1) # grid 的邊框

ax.set_title("w, b to cost")
ax.set_xlabel("w")
ax.set_ylabel("b")
ax.set_zlabel("cost")

print(np.min(costs)) # cost 最小點 (暴力)

w_index, b_index = np.where(costs == np.min(costs)) 
ax.scatter(ws[w_index], bs[b_index], costs[w_index, b_index], color='red', s=40)

plt.show()
print(f"when w = {ws[w_index]}, y = {bs[b_index]}, we have min cost:{costs[w_index, b_index]}")
# when w = [9], y = [29], we have min cost:[32.69484848]
```

```img
3.png
```


<br>
<hr style="border-color: rgb(161, 161, 161, 0.5);">

## Gradient descent

```python
def compute_gradient(x, y, w, b):
  w_gradient = (x*(w*x+b-y)).mean() # ((wx+b-y)^2)/2 對 w 微分
  b_gradient = ((w*x+b-y)).mean() # ((wx+b-y)^2)/2 對 b 微分
  return w_gradient, b_gradient
```

```python
# 持續更新 gradient
def gradient_descent(x, y, w_init, b_init, learning_rate, cost_function, gradient_function, run_iter, p_iter=1000):
  c_hist = []
  w_hist = []
  b_hist = []

  w = w_init
  b = b_init

  for i in range(run_iter):
    w_gradient, b_gradient = gradient_function(x, y, w, b)
    w = w - w_gradient*learning_rate
    b = b - b_gradient*learning_rate
    cost = cost_function(x, y, w, b)

    w_hist.append(w)
    b_hist.append(b)
    c_hist.append(cost)

    if i % p_iter == 0:
      print(f"Iteration {i:5} : Cost {cost: .4e}, w: {w: .2e}, b:{b: .2e}, w_gradient: {w_gradient: .2e}, b_gradient: {b_gradient: .2e}")

  return w, b, w_hist, b_hist, c_hist
```

```python
w_init = 0
b_init = 0
learning_rate = 1.0e-3
run_iter = 20000
w_final, b_final, w_hist, b_hist, c_hist = gradient_descent(x, y, w_init, b_init, learning_rate, compute_cost, compute_gradient, run_iter)
```
```img
4.png
```

```python
# iteration 和 cost 的關係
plt.plot(np.arange(0, 100), c_hist[:100])
plt.title("iteration vs cost")
plt.xlabel("iteration")
plt.ylabel("cost")
plt.show()
```
```img
5.png
```

```python
# 初始點改成 -100, -100
w_init = -100
b_init = -100
learning_rate = 1.0e-3
run_iter = 20000
w_final, b_final, w_hist, b_hist, c_hist = gradient_descent(x, y, w_init, b_init, learning_rate, compute_cost, compute_gradient, run_iter)
```

```python
# 觀察 cost 逐步更新的結果
ax = plt.axes(projection="3d")
ax.view_init(30, -60)
ax.xaxis.set_pane_color((1.0, 1.0, 1.0))
ax.yaxis.set_pane_color((1.0, 1.0, 1.0))
ax.zaxis.set_pane_color((1.0, 1.0, 1.0))
b_grid, w_grid = np.meshgrid(bs, ws)
ax.plot_surface(w_grid, b_grid, costs, alpha=0.1)
ax.set_title("w, b to cost")
ax.set_xlabel("w")
ax.set_ylabel("b")
ax.set_zlabel("cost")

w_index, b_index = np.where(costs == np.min(costs))
ax.scatter(ws[w_index], bs[b_index], costs[w_index, b_index], color='red', s=40)
ax.scatter(w_hist[0], b_hist[0], c_hist[0], color="green", s=40)
ax.plot(w_hist, b_hist, c_hist)

plt.show()
```
```img
6.png
```

