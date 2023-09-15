---
date: 2023-09-14
title: 機器學習筆記
subtitle: 資工選修
category: personal-note
frontCover: https://kuochuanpan.github.io/ceag/images/logo.png
tag: personal-note, courses
---
```quote
李弘毅老師機器學習教學影片筆記
```
```youtube
https://www.youtube.com/watch?v=Ye018rCVvOo&list=PLJV_el3uVTsMhtt7_Y6sgTHGHp1Vb2P2J&index=1&pp=iAQB&ab_channel=Hung-yiLee
```

## Machine Learning Basic

<br>

### Types of functions
- Regression
  ```def
  The function outputs a scalar
  ```
  - ex: predict PM2.5
- Classification
  ```def
  Given options (classes), the function outputs the correct one
  ```
  - ex: spam filter, AlphaGo
- **Structure Learning**
  ```def
   create something with structure (image, document)
  ```

<br>

### Basic example (Linear model)
#### Step 1: Function with unknown parameters
  - Model: 
    - ```latex
        y = b + wx_1
        ```

    - ***w*** and ***b*** are unknown parameters (learned from data)
  
#### Step 2: Define loss of from training data
  - loss is a function of parameters L(b, w)
  - how good a set of values is
  - Loss: 
    - ```latex
        L = \frac{1}{N}\sum_{n}e_n
        ```
  - Error: 
    - ```latex
      e = \vert y - \hat{y} \vert
        ```
      L is **mean absolute error** (MAE)
    - ```latex
      e = (y - \hat{y})^2	
        ```
      L is **mean square error** (MSE)
  
#### Step 3: Optimization (**Gradient Descent**) 
  - Minimize Loss
  - one parameter
    1. (Randomly) pick an initial value `latex w^0`
    2. Compute `latex \frac{\partial{L}}{\partial{w}}|_{w=w^0}`
       - negative: increase w
       - positive: decrease w
    3. Update w iteratively
       - `latex w^1 = w^0 - \eta\frac{\partial{L}}{\partial{w}}|_{w=w^0} `
       - `latex \eta`: learning rate
  - two parameter
    1. (Randomly) pick initial values `latex w^0`, `latex b^0`
    2. Compute `latex \frac{\partial{L}}{\partial{w}}|_{w=w^0, b=b^0}`, `latex \frac{\partial{L}}{\partial{b}}|_{w=w^0, b=b^0}`
    3. Update w and b iteratively
       - `latex w^1 = w^0 - \eta\frac{\partial{L}}{\partial{w}}|_{w=w^0, b=b^0} `
       - `latex b^1 = b^0 - \eta\frac{\partial{L}}{\partial{b}}|_{w=w^0, b=b^0} `

- 可以加入更多 feature，取得更精確的結果
  - ex: `latex b + \sum_{j = 1}^7 w_j x_j`

<br>

### Activation Functions
#### Sigmoid function
- ```latex
    y &= c \cdot \frac{1}{1 + e^{- (b + wx_1)}}\\
    &= c \cdot sigmoid(b + wx_1)
    ```
```img
sigmoid-function.png
```
 
#### Rectified Linear Unit (ReLU) function
- ```latex
    y &= c \cdot max(0, b+wx_1)
    ```
```img
relu-function.png
```    


<br>

### Advanced example
#### Step 1: Function with unknown parameters
- Linear models have severe limitation called **Model Bias** (只能表示直線), we need a more flexible model
```img
Piecewise-Linear.png
```
- 其中 **藍色線段** 叫做 hard sigmoid，可以用 sigmoid function 表示

- 同樣也可以加入更多 feature
  - `latex y = b + \sum_{i} c_i \cdot sigmoid(b_i + \sum_{j} w_{ij} x_{j})`

- 把上述公式以矩陣表示，會變成
  - `latex y = b + \textbf{c}^T \sigma(\textbf{b} + \textbf{W} \textbf{x})`
  - `latex \textbf{x}` 是 feature
  - `latex \textbf{W}, \textbf{b}, \textbf{c}^T, b` 是 unknown parameters

#### Step 2: Define loss of from training data
- 定義方式跟 **basic example** 一樣
- Loss is a function of parameters `latex L(\theta)`，其中 `latex \theta` 是一個矩陣，是把上述矩陣 `latex \textbf{W}, \textbf{b}, \textbf{c}^T, b` 內容全部攤平的結果
- 所以 Loss 一樣是 `latex L = \frac{1}{N}\sum_{n}e_n` ， `latex e` 的定義方式另外決定
  
#### Step 3: Optimization (**Gradient Descent**) 
- Update
    - ```latex
        \theta 
        &= 
        \begin{bmatrix}
            \theta_1\\
            \theta_2\\
            \theta_3\\
            \vdots
        \end{bmatrix}

        ,\quad
        
        \textbf g 
        &= 
        \begin{bmatrix}
            \frac{\partial L}{\partial \theta_1}|_{\theta=\theta^0}\\
            \frac{\partial L}{\partial \theta_2}|_{\theta=\theta^0}\\
            \vdots
        \end{bmatrix} &= \nabla L(\theta^0)
        ```
    - (Randomly) pick initial values `latex \theta^0`
    - ```latex
        \begin{bmatrix}
            \theta_{1}^{1}\\
            \theta_{2}^{1}\\
            \vdots
        \end{bmatrix} 
        \leftarrow
        \begin{bmatrix}
            \theta_{1}^{0}\\
            \theta_{2}^{0}\\
            \vdots
        \end{bmatrix}     
        -
        \begin{bmatrix}
            \eta \cdot \frac{\partial L}{\partial \theta_1}|_{\theta=\theta^0}\\
            \eta \cdot \frac{\partial L}{\partial \theta_2}|_{\theta=\theta^0}\\
            \vdots
        \end{bmatrix} 
        \quad 可以寫成 \quad 
        \theta^1 \leftarrow \theta^0 - \eta \textbf g
        ```
    - `latex \theta^1 \leftarrow \theta^0 - \eta \textbf g`
    - `latex \theta^2 \leftarrow \theta^1 - \eta \textbf g`
    - `latex \theta^3 \leftarrow \theta^2 - \eta \textbf g`

- Batch
  - 把 **data** 分成很多 **batch**
  - 每次把其中一個 batch 拿出來，算出 Loss，首先叫他 `latex L^1`
  - `latex \textbf g = \nabla L^1 (\theta^0) \quad \theta^1 \leftarrow \theta^0 - \eta \textbf g`
  - `latex \textbf g = \nabla L^2 (\theta^1) \quad \theta^2 \leftarrow \theta^1 - \eta \textbf g`
  - `latex \textbf g = \nabla L^3 (\theta^2) \quad \theta^3 \leftarrow \theta^2 - \eta \textbf g`

- Epoch
  - **1 epoch = see all the batches once**


## Deep Learning basic
```img
deep-learning.png
```

- 原本只有一層時，得到一個 neuron 的結果是 `latex \textbf{a} = \sigma(\textbf{b} + \textbf{W} \textbf{x})`，可以把 `latex \textbf{a}` 當成 input，再做一次，得到 `latex \textbf{a}^\prime = \sigma(\textbf{b}^\prime + \textbf{W}^\prime \textbf{a})`
- 需要增加更多 unknown parameters
- 太多層可能會發生 **Overfitting**
  - Better on training data, worse on unseen data
