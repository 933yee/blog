---
date: 2023-07-01
title: Cocos Creator (4/4)
subtitle: [CGV/MIS] 2023 Summer Internship Entrance Test for Project Students
category: personal note
frontCover: cocos.png
---

Cocos Creator (4/4)
===
<hr style="border-color: rgb(161, 161, 161, 0.5); width: 100%;">

## Lecture15 Cocos Creator - Animation
```citation
整體來說看起來跟 Unity 差不多，不過Unity有更完善的recording、animator可以用
```

```youtube
https://www.youtube.com/watch?v=JMf_u2C3HI8
```

### 01:44 Animation Basic

- 作法
    1. Node > Add Component > Other Component > Animation
    2. assets > right click > Create > Animation Clip
    <br></br>
- Sprites Sheet
    - Properties
        1. contains a sequence of images represents the player at different animation frams
        2. load fast
    - aka Atlas
        - use **TexturePacker** or **Zwoptex** to generate .plist and .png files


### 40:02 Animation Controle with Script
- Get animation component
    ```typescript
    private anim = null;

    onload() {
        this.anim = this.getComponent(Animation);
    }
    ```
    
- Play animation
    ```typescript
    // play the default clip
    this.anim.play(); 

    // play the specific clip
    this.anim.play('move') 
    ```

- Multiple animations
    ```typescript
    // play the first animation
    this.anim.playAdditive('position-anim'); 

    // play the second animation
    this.anim.playAdditive('rotation-anim'); 
    ```
    
- Pause, Resume, Stop
    ```typescript
    this.anim.play('idle');
    this.anim.pause('idle');  // pause the “idle” animation
    this.anim.pause(); 	   // pause all the animations
    this.anim.resume('idle'); // resume the “idle” animation
    this.anim.resume(); 	   // resume all the animations
    this.anim.stop('idle');   // stop the “idle” animation
    this.anim.stop(); 	   // stop all the animations
    ```
    
- Animation State
    ```typescript
    // play() will return associated AnimationState
    var animState = this.anim.play(‘idle’); 

    // we can also directly retrieve the AnimationState
    var animState = this.anim.getAnimationState(‘idle’); 

    if(animState.isPlaying){
        ...
    }
    ```
    
- Modify Animation State
    ```typescript
    // change animation speed to 2
    animState.speed = 2; 

    // set the wrapMode as “Loop”
    animState.wrapMode = WrapMode.Loop; 

    // set the loop count to 2 times
    animState.repeatCount = 2; 

    // set the loop count to infinity
    animState.repeatCount = Infinity; 
    ```
    
- Animation Callback
    - on, off, once
    ```typescript
    var animation = this.node.getComponent(cc.Animation);

    //register “playerMove” function on different states
    animation.on('play', this.playerMove, this);
    animation.on('stop', this.playerMove, this);
    animation.on('lastframe', this.playerMove, this);
    animation.on('finished', this.playerMove, this);
    animation.on('pause', 	this.playerMove, this);
    animation.on('resume', 	this.playerMove, this);
    ```