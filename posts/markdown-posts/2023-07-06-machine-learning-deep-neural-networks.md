---
date: 2023-07-06
title: Deep Neural Networks
subtitle: [CGV/MIS] 2023 Summer Internship Entrance Test for Project Students
category: personal note
frontCover: study.png
---

## Neural Network Architecture
- Neuron
- Perceptron
- Perceptron Learning Algorithm (PLA)
- Multiple Neurons

<br>
<hr style="border-color: rgb(161, 161, 161, 0.5); width: 100%;">

## Optimization and Back Propagation            
- Formulate the Neural Networks
- Find the Optimal Parameter
  - Linear Activation Function
  - Non-Linear Activation Function
- Chain Rules and Back Propagation

<br>
<hr style="border-color: rgb(161, 161, 161, 0.5); width: 100%;">

## Computational Graph and Tensor Differential
- Forward Mode Differential 
- Backward Mode Differential 
  - 常用，可以省去某些節點的運算
- Tensor

<br>
<hr style="border-color: rgb(161, 161, 161, 0.5); width: 100%;">

## Gradient Vanishing Problem
```citation
低維度空間特徵訓練
1. Pretraining
2. Fine-Tune
```
- Auto-Encoder
  - Stacked Denosing Autoencoder
- Restricted Boltzmann Machine (RBM)
- Rectified Linear Unit (ReLU)

<br>
<hr style="border-color: rgb(161, 161, 161, 0.5); width: 100%;">

## Normalization Problem
- Initialization of Parameters
- Bach Normalization

<br>
<hr style="border-color: rgb(161, 161, 161, 0.5); width: 100%;">

## Convolution Neural Network (CNN)
- convolution
  - stride convolution
  - dilated convolution
  
- pooling
  
- AlexNet
  - Dropout
  
- GoogleLeNet
  - Inception Module

- ResNet
  - Residual Learning 
  
- DenseNet
- SENet
- MobileNet
  - 相同網路層，簡化運算
- Xecption
  - 相同參數，提高準確率