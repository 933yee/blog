---
date: 2023-09-12
title: 網路安全筆記 (1)
subtitle: 資工選修
category: personal-note
frontCover: https://scholarlyoa.com/wp-content/uploads/2020/09/internet-security.jpg
tag: personal-note, courses
---

- Wireshark
  - 連到同一個網路，就可以看那些人連接這網路
- JDPR


## Computer Security Objectives

<br>

### NIST 對電腦安全的定義

#### Confidentiality 機密性

##### Data Confidentiality

- Assures that private or confidential information is not made available or disclosed to unauthorized individuals
- 保護資料不被未經授權的人員或系統存取或查看
- 避免非法授權個體得到資訊內容
- ex: 個人身份證號碼、銀行帳戶資訊
##### Privacy
- Assures that individuals control or influence what information related to them may be collected and stored and by whom and to whom that information may be disclosed
- 隱私確保個人資訊只能在授權的範圍內被收集、處理、使用和分享
- 個體能夠控制資訊誰可使用、取得等
- ex: 個人健康記錄、社會保險號碼

#### Integrity 完整/正確性
- 資料或系統是否正確無誤
##### Data Integrity
- Assures that information and programs are changed only in a specified and authorized manner
- 確保資料在存取、修改和傳輸過程中不被意外地改變或毀損
- 資料或軟體的改變是符合規範並授權，而非破壞性的改變
- ex: database、保證資料庫中的交易記錄在傳輸或處理過程中不被更改或刪除
##### System Integrity
- Assures that a system performs its intended function in an unimpaired manner, free from deliberate or inadvertent unauthorized manipulation of the system
- 確保系統的運作環境和元件不被未經授權的更改、損壞或破壞
- 系統功能正確無誤，不會遭到非授權的竄改產生問題
- ex: 防止駭客入侵系統並對系統進行破壞

#### Availability 可用性
- Assures that systems work promptly and service is not denied to authorized users
- 保證資料可以在需要時進行存取和使用，而不受到系統故障或攻擊的影響
- 確保服務正常執行，授權用戶不會被阻斷
- ex: power backup、redundancy、確保重要的網路服務可以隨時存取，如電子郵件系統、線上支付系統

```def
src: https://r888800009.github.io/network-security/net-sec1/#nist-%E5%B0%8D%E9%9B%BB%E8%85%A6%E5%AE%89%E5%85%A8%E7%9A%84%E5%AE%9A%E7%BE%A9
```


### Addition Concepts
#### Authenticity 真實性
- Verifying that users are who they say they are
- gives confidence in the validity of a message or the sender of the message
- 資料來自可信任的來源
#### Accountability 負責任
- Log user actions for non-repudiation, deterrence
- It helps to trace a security breach to a responsible user


<br>

## OSI Security Architecture


<br>


### Security attack
- Any action that compromises the security of information owned by an organization (or a person)
#### Passive attacks
- eavesdropping on, or monitoring of, transmissions
- Goal of the opponent is to obtain information that is being transmitted
- Types
  - The release of message contents
  - Traffic analysis
    - Location
    - IP
    - Frequency and length of messages
- These attacks are very hard to detect

#### Active attacks
- Involve some modification of the data or the creation of a false data
- Difficult to prevent because of the wide variety of potential physical, software, and network vulnerabilities
- Goal is to detect attacks and to recover from any disruption or delays caused by them
##### Masquerade
- Happens when one user pretends to be a different user
- Use stolen passwords to login as victim
- Capture a valid authentication sequence and replay them to login as victim
- Phishing attacks on online bank accounts
##### Replay
- Replay of messages

##### Modification of messages
- An attacker intercepts messages and modifies them

##### Denial of service
- Prevents or inhibits the normal use of management of commuunication facilities
- Disruption of an entire network, either by disabling the network or overloading it with messages so as to degrade performance
- Mirai, 2016
  - GitHub, Netflix, Twitter Airbnb, etc

### Security service
- A service that enhances the security of the systems and the information tansfer of an organization
- The services make use of one or more security mechanisms to provide the service

#### Authentication
##### Data Origin Authentication
- This services assures that the data is from the source it clams to be from
- E.g., Sign a bank cheque, X.509 certificates
##### Peer entity Authentication
- It provides mutual confidence in the identities of the parties involved in a connection
- Typically used at start of a connection
- Addresses masquerade and replay threads
#### Confidentiality
- Protect data from **passive attack**
- ##### Connection Confidentiality
  - Protects all the data transmitted between two users over a period of time
  - E.g., TCP connection
- ##### Connectionless Confidentiality
  - Protection of a single message/data block
  - E.g., UDP
- ##### Selective Field Confidentiality
  - Protection of a selected field within a message
  - E.g., "Please meet me at XXXX tomorrow"
- ##### Traffic Flow Confidentiality
  - Protection of traffic flow from analysis
  - E.g., padding, onion networks
  - padding
    - all the packages that you send or received have the same length
  - onion networks
    - ```img
      onion-network.png
      ```

#### Integrity
##### Connection Integrity
- Integrity of a stream of messages
- E.g., hash of an IOS file on a website with HTTPS connection
##### Connectionless Integrity
- Integrity of a single message
- E.g., protect a sensor's measurement
##### Selective Field Integrity
- A single field in data cannot be modified, deleted, inserted

#### Non-Repudiation
##### Data Origin
  - It is the proof that the message was sent by the specified party
##### Data Reception
  - It is the proof that the message was received by the specified party

#### Access Control
- Provides protection against an unauthorized use of resources
  - Use communication network
  - Read, write delete data from information sources
  - Execution of a processing resource
- File permissions in Unix file system, databases
- Who can use the printer

### Security mechanism
- A mechanism that is designed to detect, prevent, or recover from a security attack. E.g., encryption
#### Encryption (Encipherment)
##### Asymmetric encryption
- Public and private pair of keys
```img
asymmetric-encryption.png
```
##### Symmetric encryption
- Single key

#### Digital Signature
- Proves the source and integrity of the data

```img
summary.png
```

### Security Services vs. Attacks
```img
security-service-vs-attacks.png
```

### Model for Network Security
```img
model-for-network-security.png
```
```img
model-for-network-security-2.png
```

### Unwanted Access
- Placement in a computer system of logic that exploits vulnerabilities in the system and that can affect
  - Application programs (editor)
  - Utility programs (compilers)
- Programs can present two kinds of threats
  - Information access threats
    - Intercept or modify data on behalf of users who should not have access to that data
  - Service threats
    - Exploits service flaws in computers to inhibit use by legitimate users
SHA
密碼雜湊函數cryptographic hash function

