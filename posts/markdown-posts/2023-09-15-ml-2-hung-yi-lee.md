---
date: 2023-09-15
title: 機器學習筆記 (2)
subtitle: ML General Guide
category: ML
frontCover: https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9d8Ow4KIqpTLoH9uOKyiS-lKUNgheHP_H3yp13QoCFSK3avHItP0mOkcAbk1IO6qQmA8&usqp=CAU
tag: personal-note, courses, ML
---
```quote
李弘毅老師機器學習教學影片筆記
```
```youtube
https://www.youtube.com/watch?v=Ye018rCVvOo&list=PLJV_el3uVTsMhtt7_Y6sgTHGHp1Vb2P2J&index=1&pp=iAQB&ab_channel=Hung-yiLee
```

<br>

## General Guide

```img
general-guide.png
```

### Model Bias
- Cause
  - The model is too simple
- Solution
  - Redesign your model to make it more flexible
    - more features
    - more neurons, layers (deep learning)

<br>

### Optimization Issue
- If deeper networks do not obtain smaller loss on **Training data**, then there is optimization issue. 
- 像是 gradient descent 不給力，沒辦法找到最佳解
```img
optimization-issue.png
```
  - 上面圖片中，對於 **Training data**，56-layer 的結果一定會比 20-layer 的結果好，所以是 **Optimization** 的問題。

<br>

### Overfitting 
```img
overfitting.png
```
- Cause
  - Small loss on training data, large loss on testing data.
- Solution
  - More Training data
  - Data augementation
    - 翻轉、旋轉、縮放、平移、裁減、顏色變換、噪聲增加
  - 增加 model 限制，減少彈性
    - Less parameters, sharing parameters, less neurons (CNN)
    - Less features
    - Early stopping
    - Regularization
    - Dropout
    - 但是給太多限制會造成 **model bias**

<br>

### Cross Validation
```img
cross-validation.png
```

<br>

### Mismatch
- Your training and testing data have different distributions
```img
mismatch.png
```