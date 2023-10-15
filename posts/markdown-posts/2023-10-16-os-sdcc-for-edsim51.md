---
date: 2023-09-24
title: 作業系統筆記 - SDCC for EdSim51
subtitle: 8051 微控制器
category: personal-note
frontCover: https://www.ionos.com/digitalguide/fileadmin/DigitalGuide/Teaser/operating-system-t.jpg
tag: personal-note, courses, os
---
### SDCC for EdSim51
- Small Device C Compiler

<br>

#### Data types in SDCC
```img
sdcc-data-types.png
```

#### Unsupported Data Types
- Pointer to boolean
- Pass or return **struct** and **union**
- variable-length array
- long long, long double, double

#### SDCC flags
- sdcc -S file.c
  - compile to assembly (.asm)
    - don't assemble/link
- sdcc -c file.c
  - compile and assemble but don't link
  - creates relocatable object file (.rel)
  - good for seperate compilations
- -o file.hex
  - name output file as file.hex instead of default name
  - used by EdSim

##### Example
- Assume delay.c is used by several programs
  - sdcc -c delay.c
    - compile it once; make file delay.rel
  - The .rel is relocatable object, unlinked
- Suppose foo.c wants to linked with delay.rel
  - sdcc -c foo.c
  - sdcc -o foo.hex foo.rel delay.rel
    - foo.hex is the final linked image

#### Output .ihx file
- **Intel Hex** Format
```img
ihx-format.png
```

#### Startup Code
- 直接把 .hex load 到 EdSim51 會產生一堆垃圾
- Automatically linked in by linker for system initialization
  - however, assumes specific I/O features
  - To run in EdSim51, don't use any compilier-provided library
- Two alternative ways
  1. Simply rename your main() as some other name, as long as it is the first
  2. Define your own startup code, but keep main()
     - void _sdcc_gsinit_startup(void){main();}
     - void _mcs51_genRAMCLEAR(void){} 
     - void _mcs51_genXINIT(void){} 
     - void _mcs51_genXRAMCLEAR(void){} 
  - Note: just one _ in front of these function names, the compilier inserts another _ in front when generating assembly code
  - 有點像覆蓋掉原本的 code，把他們的 body 清空

#### Modular (libaray) version of LED
```c
/* file LED7seg.c */
#include <8051.h>
char LED7seg(char num) {
  static __code char LEDdata[] = {
    0xC0, 0xF9, 0xA4, 0xB0, 0x99,
    0x92, 0x82, 0xF8, 0x80, 0x90
  };
  return LEDdata[num];
}
void DisplayLED(char num) {
  P1 = LED7seg(num);
}
```

```c
/* file: LED7seg.h */
#ifndef __LED7SEG_H__
#define __LED7SEG_H__

char LED7seg(char num);
void DisplayLED(char num);

#endif /* __LED7SEG_H__ */
```
```c
/* file: LEDtest0.c */
#include "LED7seg.h"
void Main(void) {
  char i;
  for (i = 0; i < 10; i++) {
    DisplayLED(i);
  }
}
```
- sdcc -c	LEDtest0.c
- sdcc -c	LED7seg.c	
- sdcc -o LEDtest0.hex	LEDtest0.rel	LED7seg.rel	
- note
  - LEDtest0.hex with Main() function must be linked first，因為這裡是直接改 main 的名字

#### Keywords
```img
keywords.png
```
