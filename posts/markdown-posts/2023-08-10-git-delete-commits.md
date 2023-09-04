---
date: 2023-08-10
title: Git delete commit history
subtitle: protect privacy
category: skill, git
frontCover: study.png
tag: git, skill
---


## 建立「孤立分支」（orphan branch），一個完全獨立的分支，沒有任何歷史紀錄
```
git checkout --orphan latest_branch
git add .
git commit -m "commit message"
git branch -D main
git branch -m main
git push -f origin main
```


