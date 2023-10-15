---
date: 2023-09-24
title: 作業系統筆記 - EdSim51 intro
subtitle: 8051 微控制器
category: personal-note
frontCover: https://www.ionos.com/digitalguide/fileadmin/DigitalGuide/Teaser/operating-system-t.jpg
tag: personal-note, courses, os
---
### EdSim51 Introduction

<br>

#### EdSim51 DI = Dynamic Interface
- Simulates a complete embedded system
- LCD, LEDs, keypad, bank of buttons, ADC, DAC
- cycle-accurate processor

#### EdSim51 SH
- Customize the devices to use


#### code example
```
ORG 0000H
MOV 90H, #24H
END
```
- ORG
  - start your instruction at a different address
- MOV
  - move constant **24 (hex)** into the register address **90 (hex)**
  - you can't use MOV reg reg
- seven segment display
  - 0 is a pull-down, turns on
  - 1 is leaves it as pull-up, turns off LED
- **END** in assembly
  - END is an **assembly directive**
  - it just means end of source code listing
  - it does not mean CPU stops running

#### Processor in EdSim51
- 8-bit words
  - its registers are 8-bits
- 16-bit address (external), 8-bit address (internal)
- Harvard architecture
  - 64KB **external** data memory, 256-byte **internal** memory
  - seperate 64KB code memory

#### Block diagram of 8051
```img
block-diagram.png
```
- OSC (oscillator)
  - generate clock frequency
- Serial port
  - uars, universal asynchronous receiver transmitter
  - TxD
    - Transmit data
  - RxD
    - Receive data
  - TxD and RxD are independent, full duplex

#### Memory Spaces in 8051
```img
memory-space.png
```
- IDATA
  - 128 bytes that you get to use
  - 128 bytes are reserved for special function registers
- XDATA
  - not supported

#### Registers in 8051
- General purpose, 8-bit
  - A: (Accumlator), B
  - R0, R1, ..., R7 (CPU registers, in 4 banks)
- 16-bit, specially used as pointers
  - DPTR: data pointer, concatenated DPH, DPL
  - PC: (program counter) not user visible
- PSW: program status word (8-bit)

#### Banks of CPU Registers
- One set of 8 registers visible at a time
  - R0, ...R7 -> selected using 3 bits
- Four banks of CPU registers, in IDATA
  - bank 0: IDATA addresses 0x00 - 0x07
  - bank 1: IDATA addresses 0x08 - 0x0F
  - bank 2: IDATA addresses 0x10 - 0x17
  - bank 3: IDATA addresses 0x18 - 0x1F
  - bank selected by setting a special function register

#### Accumulator (A)
- An implicit register in many instructions
  - as both a source and the destination
  - e.g. ADD A, #23 meaning A = A + 23
- Reason for using A
  - small code size, because there is just one
  - All others require several bits for registers

#### Machine Instructions
- Opcode
  - Specifies the operation 
- Operands
  - the **arguments** to an opcode
  - could be accumulator, register, constant value, value in memory, etc

#### Idiosyncratic with immediate in Intel Assembly syntax
- Default base: decimal
  - #12 (assumed to be decimal)
  - Can be **hex**: #12**H** 
- **The char after # must be 0 ~ 9**
  - #FFH is not an immediate
  - use #0FFH instead (add a useless 0 in front)

#### Immediate vs. direct
- MOV A, #17H
  - #17H is a literal value
  - meaning A = 0x17
- MOV A, 17H
  - 17H is IDATA address
  - meaning A = *((char*)0x17)
- mode
  - R0 ~ R7 
    - register mode
  - #17
    - immediate mode
  - 17H
    - direct mode (IDATA address 0x17)
  - 17
    - direct mode at decimal 17

#### 8051 ISA: Four I/O ports
- 8-bits each
  - P0, P1, P2, P3
- Direct addresses
  - 80H, 90H, A0H, B0H
- Difference
  - values tied to the pins
- Bit addressable

```img
8051-io-ports.png
```

- Byte access
  - MOV P1, #5EH
  - big-endian bit order
- Bit access
  - **SETB** P1.1
  - **CLR** P2.3

#### 7-segment LED
- Need to select digit 
  - Decoder maps <A1, A0> to one-hot
  - Controlled by <P3.4, P3.3>


##### Exmaple
```
  ORG 0
  TOP: SETB P3.4
  SETB P3.3
  MOV P1, #10100100B
  CLR P3.3
  MOV P1, #11000000B
  CLR P3.4
  SETB P3.3
  MOV P1, #10100100B
  CLR P3.3
  MOV P1, #10110000B
  SJMP TOP ;; jump to TOP
  END
```
- 能夠印出 2023