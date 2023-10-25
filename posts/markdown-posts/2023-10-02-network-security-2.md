---
date: 2023-10-02
title: 網路安全筆記 (2)
subtitle: 資工選修
category: personal-note
frontCover: https://scholarlyoa.com/wp-content/uploads/2020/09/internet-security.jpg
tag: personal-note, courses
---

### Symmetric Crypto
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

### Basic Principles
- Kerckhoff's Principle
  - A cryptosystem should be secure even if everything about the system, except the key, are publicly known
  - 做 encryption 演算法時都要假設加密原理一定是公開的，只有 key 是不公開的
  - 通常用 induction 證明某加密演算法是安全的，ex: AES
- Shannon's Maxi
  - Your enemy knows your system!
- The security of symmetric encryption depends on the **secrecy of the key**, not the secrecy of the algorithm

### Symmetric Crypto Types
#### Block cipher
- Block by block
- Each block is fixed-length grou of bits
- Each block is encrypted **with the same key**
- 不足一個 block 需要 fill empty or pending
#### Stream cipher
- Bit by bit, character by character
- Each bit/character is encrypted **with a different key**


### Crytanalysis
#### Cuphertext-Only Attack (COA)
- Attackers have access only to a set of ciphertexts
- Give `latex E, D, {c_1, c_2, ..., c_n},` and `latex c = E(k, m),` compute `latex m`;

- Examples: Momo-alphabetic Cipher
  - encrypts English text by mapping the alphabets to a chosen permutation
  - Relatively difficult to break based on exaustive key search (26! - 1)
  - Easy to break based on letter frequencies of English alphabets
    - 很多字母會比其他常出現，a、e、i、o、u，或是一些 two-character word

#### Known-Plaintext Attack (KPA)
- Attackers have samples of both the plaintext, and its encrypted version (ciphertext)
- Given `latex E, D, {(m_1, c_1), ..., (m_n, c_n)},` and `latex c = E(k, m),` compute `latex m`
- Examples: Momo-alphabetic Cipher
  - if known plaintext-ciphertext pairs contain all alphabets

#### Chosen-Plaintext Attack (CPA)
- Attackers have the capability to choose arbitray plaintexts to be encrypted and obtain the corresponding ciphertexts
- Given `latex E, D, {(m_1, c_1), ..., (m_n, c_n) | m_i \text{is chosen by attacker}}`, and `latex c = E(k, m)`, compute `latex m`
- Examples: Momo-alphabetic Cipher, 
  - by having the corresponding ciphertext of plaintext *abcd...xyz* or any sub-string of 25 alphabets