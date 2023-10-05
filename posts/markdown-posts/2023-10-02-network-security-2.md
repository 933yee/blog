---
date: 2023-10-02
title: 網路安全筆記 (2)
subtitle: 資工選修
category: personal-note
frontCover: https://scholarlyoa.com/wp-content/uploads/2020/09/internet-security.jpg
tag: personal-note, courses
---

## Symmetric Crypto
- The classic task of cryptography is to encrypt data for secrecy
- `latex E/D`: Encryption/Decryption method
- `latex k`: a key from key space `latex K`
- Plaintext `latex m \xrightarrow{E, k}` ciphertext `latex c`  
- Ciphertext `latex c \xrightarrow{D, k}` plaintext `latex m`
- For each `latex k \in K` and `latex m \in M`,`latex \; D(k, E(k, m)) = m`
- `latex {E_k}^{-1} = D_k`
- `latex E` and `latex D` are poly-time computable
  - `latex O(n), \; O(n^2)...`
  - not `latex O(2^n)`

```img
symmetric-crypto.png
```

## Basic Principles
- Kerckhoff's Principle
  - A cryptosystem should be secure even if everything about the system, except the key, are publicly known
  - 做 encryption 演算法時都要假設加密原理一定是公開的，只有 key 是不公開的
  - 通常用 induction 證明某加密演算法是安全的，ex: AES
- Shannon's Maxi
  - Your enemy knows your system!
- The security of symmetric encryption depends on the secrecy of the key, not the secrecy of the algorithm