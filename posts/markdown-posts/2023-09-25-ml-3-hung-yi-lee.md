---
date: 2023-09-15
title: 機器學習筆記 (3)
subtitle: ML model issues
category: ML
frontCover: https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9d8Ow4KIqpTLoH9uOKyiS-lKUNgheHP_H3yp13QoCFSK3avHItP0mOkcAbk1IO6qQmA8&usqp=CAU
tag: personal-note, courses, ML
---
```quote
李弘毅老師機器學習教學影片筆記
```
```youtube
https://www.youtube.com/watch?v=QW6uINn7uGk&list=PLJV_el3uVTsMhtt7_Y6sgTHGHp1Vb2P2J&index=4&ab_channel=Hung-yiLee
```

### Optimization Fails
- critical point
  - local minima
  - local maxima
  - saddle point

#### Taylor Series Approximation
- `latex L(\theta) \approx L(\theta^{\prime}) + (\theta - \theta^{\prime})^{T}g + \frac{1}{2}(\theta - \theta^{\prime})^{T}H(\theta-\theta^{\prime})`
  - Gradient **g** is a vector
    - `latex g = \nabla L(\theta^{\prime}) \quad g_i = \frac{\partial{L(\theta^{\prime})}}{\partial{\theta_i}}`
  - Hessian **H** is a matrix
    - `latex H_{ij} = \frac{\partial^{2}}{\partial{\theta_i}\partial{\theta_j}} L(\theta^{\prime})`

- 如果是在 critical point，**g** 會是 0，所以只剩下前面和後面項
- 以 `latex v^{T}Hv 表示 (\theta - \theta^{\prime})^{T}H(\theta-\theta^{\prime})`
  - 如果 for all v， `latex v^{T}Hv > 0`，`latex L(\theta) > L(\theta^{\prime})`，**Local minima**
  - 如果 for all v， `latex v^{T}Hv < 0`，`latex L(\theta) < L(\theta^{\prime})`，**Local maxima**
  - 如果有時 `latex v^{T}Hv < 0` ，有時 `latex v^{T}Hv > 0` ，**Saddle point**
  - 不可能算出所有 `latex v` ，可以看 `latex H` 的值就好
    - H is positive definite, all eigen values are positive, **Local minima**
    - H is negative definite, all eigen values are negative, **Local maxima**
    - some eigen values are positive, some are negative, **Saddle point**

#### Saddle point
- sometimes `latex v^{T}Hv < 0`, sometimes `latex v^{T}Hv > 0` 
- **H may tell us parameter update direction**
- **u** is an eigen vector of **H**, `latex \lambda` is the eigen value of **u**
  - so `latex \textbf{u}^T H \textbf{u} = \textbf{u}^T (\lambda \textbf{u}) = \lambda {\Vert \textbf{u} \Vert}^2`
- find one `latex \lambda < 0`, we know `latex \lambda {\Vert \textbf{u} \Vert}^2 < 0`, then `latex \textbf{u}^T H \textbf{u} < 0`
- `latex L(\theta) \approx L(\theta^{\prime}) + (\theta - \theta^{\prime})^{T}g + \frac{1}{2}(\theta - \theta^{\prime})^{T}H(\theta-\theta^{\prime})`, when we take `latex \theta - \theta^{\prime}` as `latex \textbf{u}`, we get `latex L(\theta) < L(\theta^{\prime})`
- `latex \theta - \theta^{\prime} = \textbf{u} \quad \theta = \theta^{\prime} + \textbf{u}`, decrease L

#### Example
```img
model-example.png
```
- `latex L = (\hat{y} - w_1 w_2 x)^{2} = (1 - w_1 w_2)^{2}`
- Gradient g:
  - `latex \frac{\partial{L}}{\partial{w_1}} = 2(1 - w_1 w_2)(-w_2) = 0`
  - `latex \frac{\partial{L}}{\partial{w_2}} = 2(1 - w_1 w_2)(-w_1) = 0`
- One critical point is `latex w_1` = 0, `latex w_2` = 0
- Hessian H:
  - `latex \frac{\partial^{2}L}{\partial{{w_1}^{2}}} = 2(-w_2)(-w_2)`
  - `latex \frac{\partial^{2}L}{\partial{w_1}\partial{w_2}} = -2 + 4 w_1 w_2`
  - `latex \frac{\partial^{2}L}{\partial{w_2}\partial{w_1}} = -2 + 4 w_1 w_2`
  - `latex \frac{\partial^{2}L}{\partial{{w_2}^{2}}} = 2(-w_1)(-w_1)`
- ```latex
      \begin{bmatrix}
          0 &-2 \\
          -2 &0 \\
      \end{bmatrix} 
      \; \lambda_1 = 2, \; \lambda_2 = -2 \rightarrow \textbf{Saddle Point}
    ```
- ```latex 
    \lambda_2 = -2 ,\quad \textbf u = 
    \begin{bmatrix}
      1\\
      1
    \end{bmatrix} 
  ```
- Update the parameter along the direction of `latex \textbf u`, you can **escape the saddle point** and **decrease the loss**
- This method is seldom used in practice

<br>

### Batch and Momentum
#### Batch
- With **GPU**
  - larger batch size does not require longer time to compute **gradient** unless batch size is too large
  - smaller batch requires longer time for one **epoch**
##### Small batch
- **noisy**
  - better for training
##### Large batch
- **powerful**, **faster**


#### Momentum
- Movement: **movement of last step** minus **gradient at present**
- Example:
  - starting at `latex \theta^0`
  - movement `latex m^0 = 0`
  - compute gradient `latex g^0`
  - movement `latex m^1 = \lambda m^0 - \eta g^0`
  - move to `latex \theta^1 = \theta^0 + m^1`
  - compute gradient `latex g^1`
  - movement `latex m^2 = \lambda m^1 - \eta g^1`
  - move to `latex \theta^2 = \theta^1 + m^2`