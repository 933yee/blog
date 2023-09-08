---
date: 2023-09-08
title: Blog Introduction
subtitle: brief overview of the framework of my blog
category: others
frontCover: https://images.inc.com/uploaded_files/image/1920x1080/getty_503426092_342208.jpg
tag: blog, react
---

### Tech Stack
- React
- html, css, javascript
- Webpack

<br>

### Structure
- Main.jsx
  - Home.jsx
    - Post.jsx
  - Categories.jsx
  - Archives.jsx
  - Tags.jsx
    - TagPage.jsx

<br>

### Features
- 每次新增、刪除、更新 markdown-posts 裡面的檔案，會自動更新 src/ settings 裡面的 files.js，並新增該檔案的更新時間 (UTC+8)。
- 新增檔案後，完成 Front Matter，即可自動更新 Categories、Home、Archives 和 Tags 裡面的內容。
- 在 Post.jsx 的 renderers 函式裡面可以自定義 markdown 的 code 語法。
- 右上角 Search 可以搜尋 Home、Categories 的內容。
- Webpack 有設定監聽器，執行 prebuild_scripts 裡面的 watchMarkdown.js，產生 files.js，執行以下指令後 
    ```
    npm run start
    ``` 
    每次更新 markdown-posts 裡面的檔案，儲存後會自動重新渲染網頁。
- 自定義 markdown 渲染成 html 的樣式。
- 簡陋的 responsive website。