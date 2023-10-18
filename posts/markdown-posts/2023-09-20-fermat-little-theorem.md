---
date: 2023-09-20
title: Fermat's little theorem
subtitle: 費馬小定理
category: personal-note
frontCover: https://media.istockphoto.com/id/1219382595/vector/math-equations-written-on-a-blackboard.jpg?s=612x612&w=0&k=20&c=ShVWsMm2SNCNcIjuWGtpft0kYh5iokCzu0aHPC2fV4A=
tag: cp
---

#### 結論
- 如果 a 是整數，p 是質數，且 a、p 互質，也就是 `latex gcd(a, p) = 1`，那麼 `latex a^{p - 1} \equiv 1 \enspace (mod\enspace p)`

#### 範例
- `latex 2^{100} \div 13 的餘數` 
  - 因為 13 是質數，且 `latex gcd(2, 13) = 1`，根據 **費馬小定理**，`latex 2^{13 - 1} \equiv 1 \; (mod\; 13)`
  - 且 `latex 2^{100} = 2^{12\times 8} \times 2^{4}`、`latex 2^{12\times 8} \equiv 1 \;(mod \; 13)`、`latex 2^{4} \equiv 3 \;(mod\; 13)`
  - 因此，`latex 2^{100} \div 13 的餘數` 為 3






https://ithelp.ithome.com.tw/articles/10205906