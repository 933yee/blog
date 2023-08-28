---
date: 2023-08-11
title: Linux/WSL Auto Config Issue
subtitle: path setting
category: technique 
frontCover: study.png
---

## Linux/WSL Installation Issue with powrap Configuration

<br>

### Issue
- 在 linux 上成功安裝 powrap 之後，卻無法執行，總是顯示以下錯誤
    ```bash
    zsh: command not found: powrap
    ```

<hr style="border-color: rgb(161, 161, 161, 0.5);">

### Solution
- 確認 powrap 的路徑
    ```bash
    whcih powrap
    ```
    ```def
    /home/kevin/.local/bin/powrap
    ```

- 確認正在使用的 shell 類型
    ```bash
    echo $SHELL
    ```
    ```def
    /usr/bin/zsh，代表我正在使用 zsh
    ```

- 根據結果，添加 PATH 到 ~/.bashrc 或 ~/.zshrc 的檔尾，這裡直接使用 VSCode 開啟編輯
    ``` bash
    code ~/.zshrc
    添加 export PATH="/home/kevin/.local/bin:$PATH" 到檔尾
    ```

```def
這樣每次開啟終端機，就會自動引入檔案，可以直接使用 powrap 指令。
```