---
date: 2023-07-12
title: ML & DL nouns
subtitle: basic nouns explanation
category: ML
frontCover: study.png
tag: ML, DL
---
```youtube
https://www.youtube.com/watch?v=FjizPOgzplA&ab_channel=%E5%91%A8%E9%81%A0%E5%90%8C
```

<hr style="border-color: rgb(161, 161, 161, 0.5); width: 100%;">

## Entropy
```def
發生機率越小的事件包含的資訊量越大(bits)
```
-   ```latex
    I(x) = -log_2p(x)
    ```

<br>

### Shannon Entropy
```def
整個系統中不確定的程度、資訊量
```
-   ```latex
    H(x) = E_{x{\sim}p}[I(x)]=-E_{x{\sim}p}[\log_{2}{p(x)}]
    = -\sum\limits_{i}p_i\log_{2}{p_i}
    ```
- 最有效率 (lower bound)

#### Example: Who ate the apple
- case 1: P(A) = 1
  - ```latex
    H = -1, \log{2}{1} = 0
    ```
    <li style="list-style-type:none;">共需要 0 bit 來記錄</li>
  
<br>

- case 2: P(A) = P(B) = 0.5
  - ```latex
    H = - \frac{1}{2}\log_{2}{\frac{1}{2}} - \frac{1}{2}\log_{2}{\frac{1}{2}} = 1
    ```

    <li style="list-style-type:none;">共需要 1 bit 來記錄</li>
  
<br>

- case 3: P(A) = P(B) = P(C) = P(D) = 0.25
  - ```latex
    H = - \frac{1}{4}\log_{2}{\frac{1}{4}} - \frac{1}{4}\log_{2}{\frac{1}{4}} - \frac{1}{4}\log_{2}{\frac{1}{4}} - \frac{1}{4}\log_{2}{\frac{1}{4}} = 2
    ```
    <li style="list-style-type:none;">共需要 2 bits 來記錄</li>

<br>

### Cross Entropy
```def
p(x): 目標分布，真實的機率分布，通常為未知
q(x): model 的輸出分布 (machine learning 訓練出來的)
```
```latex
H(p, q) = -E_{x{\sim}p}[\log_{2}{q(x)}]
```

#### Example

<pre>
    p(x) = [0.35, 0.40, 0.05, 0.20]
    q(x) = [0.32, 0.38, 0.14, 0.16]
</pre>

- ```latex
  H(p, p) = -0.35\log_{2}{0.35}-0.40\log_{2}{0.40}-0.05\log_{2}{0.05}-0.20\log_{2}{0.20} = 1.739
  ```
- ```latex
  H(p, q) = -0.35\log_{2}{0.32}-0.40\log_{2}{0.38}-0.05\log_{2}{0.14}-0.20\log_{2}{0.16} = 1.804
  ```

- 可以發現 H(p, q) 會比 H(p, p) = H(p) 大，因為 H(p) 是 lower bound，所以訓練目標是讓 H(p, q) 越接近 H(p) 越好

<br>

### KL Divergence (Kullback_Leiber Divergence)
```def
衡量兩個分布的差異程度
Cross Entropy - Shannon Entropy
```
-   ```latex
    D_{KL}(p||q)
    ```
    ```latex
    = -E_{x{\sim}p}[\ln{\frac{q(x)}{p(x)}}]
    ```
    ```latex
    = -E_{x{\sim}p}[\ln{q(x)}-\ln{p(x)}]
    ```
    ```latex
    = -E_{x{\sim}p}[\ln{q(x)}]-(-E_{x{\sim}p}[\ln{p(x)}])
    ```
    ```latex
    = H(p, q) - H(p)
    ```
- 表示目前編碼方式 q 最多還可以減少多少 bits

<br>

### Why Optimize Cross Entropy Not KL Divergence
- Minimize Cross Entropy 和 Minimize KL Divergence 是等價的
- 在 classification 中，H(p) 對 model 來說是 constant，沒有gradient 
- 只算 Cross Entropy 會比較快

<br>
<hr style="border-color: rgb(161, 161, 161, 0.5); width: 100%;">

## Activation Functions
- Step Function
  ```def
  Not used in practice
  ```
- Sigmoid
  ```def
  Typically in the last layer of a binary classfication problems
  ```
- TanH
  ```def
  Hidden layers
  ```
- ReLU
  ```def
  If you don't know what to use, just use a ReLU for hidden layers 
  ```
- Leaky ReLU
  ```def
  Improved version of ReLU. Tries to solve the vanishing gradient problem
  ```
- Softmax
  ```def
  Good in last layer in multi class classfication problems
  ```

<br>
<hr style="border-color: rgb(161, 161, 161, 0.5); width: 100%;">

## Optimizers

<br>

### SGD
  ```def
  每次隨機從訓練數據中選擇一個小批量（mini-batch）的樣本來計算梯度，然後使用該梯度來更新模型參數。
  
  更新公式為：θ = θ - learning_rate * gradient，其中θ是參數，learning_rate是學習率，gradient是損失函數對參數的梯度。
  
  缺點是它對於不同參數的更新速度相同，無法自適應地調整學習率，可能會導致在訓練過程中收斂速度較慢或陷入局部最小值。
  ```
### Adam
  ```def
  基於梯度的優化算法，結合了梯度的一階矩估計（mean）和二階矩估計（variance）來更新模型參數。
  
  更新公式為：θ = θ - learning_rate * m / (sqrt(v) + epsilon)，其中θ是參數，learning_rate是學習率，m是梯度的一階矩估計，v是梯度的二階矩估計，epsilon是一個很小的數值，用於避免除以零的情況。
  
  根據梯度的一階矩估計和二階矩估計自適應地調整學習率。對梯度的一階矩估計和二階矩估計進行指數移動平均，並使用這些估計值來調整學習率。
  
  另外還有一些超參數，如beta1和beta2，用於控制梯度的一階矩估計和二階矩估計的衰減速度。
  ```


<br>
<hr style="border-color: rgb(161, 161, 161, 0.5); width: 100%;">

## Datasets

<br>

### MNIST (Modified National Institute of Standards and Technology)
  ```def
  MNIST 是一個常用的手寫數字資料集。

  由兩個部分組成：訓練集（training set）和測試集（test set）。訓練集包含 60000 張手寫數字圖像，測試集包含 10000 張圖像。每張圖像的尺寸都是 28x28 像素，並且包含一個單一的手寫數字（從 0 到 9）。

  MNIST 資料集通常用於機器學習的數字識別和圖像分類任務。研究人員和開發者可以使用這個資料集來訓練模型，評估模型的性能，以及進行各種圖像處理和機器學習的實驗。
  ```

### CIFAT10 (Canadian Institute for Advanced Research 10)
  ```def
  CIFAR-10 是一個常用的圖像分類數據集。
  
  由10個不同類別的60000個32x32彩色圖像組成。這些類別包括飛機、汽車、鳥類、貓、鹿、狗、青蛙、馬、船和卡車。每個類別有6000個圖像，其中50000個圖像用於訓練，10000個圖像用於測試。CIFAR-10數據集常用於測試和評估圖像分類模型的性能。
  ```


## Convolution
  ```def
  (W + F + 2P)/S + 1
  ```
