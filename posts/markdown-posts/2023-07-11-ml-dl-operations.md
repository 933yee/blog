---
date: 2023-07-11
title: ML & DL operations
subtitle: basic operations explanation
category: personal note 
frontCover: study.png
tag: ML, DL
---
## Dataset & DataLoader

### Example 
```python
from torch.utils.data import Dataset, DataLoader

class myDataset(Dataset):
  def __init__(self):
      ...
    
  def __getitem__(self, index):
      return ...
  
  def __len__(self):
      return ...

dataset = myDataset()
dataloader = DataLoader(dataset = dataset, batch_size = 4, shuffle = True, num_workers = 2)
```

### Explanation

- dataset: 要載入和管理的資料集物件。通常需要自定義一個資料集類別，繼承自 torch.utils.data.Dataset，並實現 len 和 getitem 方法，以便能夠正確讀取和索引資料集中的樣本。

- batch_size: 這指定了每個 batch 中包含的 samples。在訓練深度學習模型時，通常會將資料分成較小的 batch 進行處理，以便能夠利用矩陣運算的並行性，提高訓練效率。

- shuffle: 這是一個布林值，用於指定是否在每個 epoch（dataset 迭代一次）之前對資料進行洗牌（隨機重排）。通過洗牌資料，可以使訓練過程更具隨機性，避免模型受到資料順序的影響。

- num_workers: 這是一個整數，用於指定用於載入資料的子進程數量。通過設置大於 0 的值，可以實現並行載入資料的效果，加快資料預處理和載入的速度。但是，過多的子進程可能會導致系統負載過重，需要根據具體情況進行調整。

<br>
<hr style="border-color: rgb(161, 161, 161, 0.5); width: 100%;">

## MNIST
```def
MNIST 是一個常用的手寫數字資料集，它是機器學習和計算機視覺領域中的經典資料集之一。

由兩個部分組成：訓練集（training set）和測試集（test set）。訓練集包含 60,000 張手寫數字圖像，測試集包含 10,000 張圖像。每張圖像的尺寸都是 28x28 像素，並且包含一個單一的手寫數字（從 0 到 9）。

MNIST 資料集通常用於機器學習的數字識別和圖像分類任務。研究人員和開發者可以使用這個資料集來訓練模型，評估模型的性能，以及進行各種圖像處理和機器學習的實驗。
```

### Example 

```python
train_dataset = torchvision.datasets.MNIST(root = './data', train = True, transform = transform.ToTensor(), download = True)
```

### Explanation

- torchvision.datasets.MNIST
    ```def
    代表 MNIST 資料集。這個類別可以用來從指定的路徑下載並讀取 MNIST 資料集。
    ```

- root = './data'
    ```def
    指定 MNIST 資料集下載後要存放的路徑。在這個例子中，資料集會被下載並存放在 './data' 目錄下。
    ```

- train = True
    ```def
    這表示我們要使用 MNIST 資料集的訓練部分。如果設置為 False，則表示我們要使用測試部分的資料。
    ```

- transform = transform.ToTensor()
    ```def
    這是指定資料集中的圖像要進行的轉換。在這個例子中，使用 transform.ToTensor() 將圖像轉換成 Tensor 格式，並對像素值進行標準化處理。
    ```

- download=True
    ```def
    如果指定為 True，則會自動下載 MNIST 資料集。
    ```

<br>
<hr style="border-color: rgb(161, 161, 161, 0.5); width: 100%;">

## subplt, imshow

### Example 

```python
for i in range(6):
    plt.subplot(2, 3, i + 1)
    plt.imshow(samples[i][0], cmap = 'gray')
```

### Explanation

- plt.subplot(2, 3, i + 1)
    ```def
    (2, 3) 表示子圖的總行數和列數，i + 1 表示當前子圖的索引(從 1 開始)。
    子圖示意如下:
                口口口
                口口口
    ```

- plt.imshow(samples[i][0], cmap = 'gray')
    ```def
    顯示當前子圖的內容。samples[i][0]表示取出第 i 個 samples 的第一個圖像，並使用灰階色彩映射(cmap='gray')顯示。
    ```

- cmap
    ```def
    colormap的縮寫，用於指定圖像的色彩映射。色彩映射是將數值映射到顏色的過程，它可以用來增強圖像的視覺效果或表示數據的不同層次。
    ```
