---
date: 2023-07-01
title: Cocos Creator (3/4)
subtitle: [CGV/MIS] 2023 Summer Internship Entrance Test for Project Students
category: personal note
frontCover: cocos.png
---

Cocos Creator (3/4)
===
<hr style="border-color: rgb(161, 161, 161, 0.5); width: 100%;">

## Lecture14 Cocos Creator - Action System & Scheduler

```youtube
https://www.youtube.com/watch?v=Y2iGxMLZYlw
```

- 03:18 Action System APIs
    ```typescript
    let action = moveTo(2, 10, 10);
    this.node.runAction(action);

    this.node.stopAction(action);
    this.node.stopActions();
    ```
    - action tags
    ```typescript
    let action = moveTo(2, 10, 10);
    let actionTag = 1;
    action.setTag(actionTag);
    
    this.node.getActionByTag(actionTag);
    this.node.stopActionByTag(actionTag);
    ```
- 09:00 Basic Action
    - 10:02 Interval Action
        ```def 
        有時間控制
        ```
    ```typescript
    let action;
    // the node moves to position(10, 10) within 2 seconds
    action = moveTo(2, 10, 10); 
    // the node moves (10, 10) pixels from current position within 2 seconds
    action = moveBy(2, 10, 10);

    // the node rotates  to 60.0 degrees within 2 seconds
    action = rotateTo(2, 60.0);
    // the node rotates 60.0 degrees from current degrees within  2 seconds
    action = rotateBy(2, 60.0);

    // the node scales to 0.5 in both X and Y within 2 seconds
    action = scaleTo(2, 0.5);
    // the node scales to 0.5 in X and 0.4 in Y within 2 seconds
    action = scaleTo(2, 0.5, 0.4);

    // the node scales by 0.5 in both X and Y within 2 seconds
    action = scaleBy(2, 0.5);
    // the node scales by 0.5 in X and 0.4 in Y within 2 seconds
    action = scaleBy(2, 0.5, 0.4);

    // the node jumps to position(20, 30) with 4 times jumps within 2 seconds, jump height is 50
    action = jumpTo(2, 20, 30, 50, 4);
    // the node jumps (20, 30) pixels from current position with 4 times jumps within 2 seconds, jump height is 50
    action = jumpBy(2, 20, 30, 50, 4);

    // the opacity of node fades to 0 within 2 seconds
    action = fadeTo(2, 0);
    ```
    - 17:10 Free Action
        ```def 
        馬上發生
        ```
    ``` typescript
    let action;

    // show the node immediately
    action = show();

    // hide the node immediately
    action = hide();

    // remove the node from its parent node
    action = removeSelf();

    // flip the node according to X-axis
    action = flipX();
    ```

- 20:13 Container Action
    - Sequential Action
    ``` typescript
    // the action will make the node move back and forth
    let action = sequence(moveBy(1, 200, 0), moveBy(1, -200, 0));
    this.node.runAction(action);
    ```
    
    - Synchronization Action
    ``` typescript
    // the action will make the node zoom in twice while it moves upwards
    let action = spawn(moveBy(1, 0, 100), scaleTo(1, 2));
    this.node.runAction(action);
    ```
    
    - Repeatitive Action
    ``` typescript
    // the action will make the node move back and forth 5 times
    let action = repeat(
        sequence(moveBy(1, 200, 0), moveBy(1, -200, 0)) , 5);

    this.node.runAction(action);
    ```

    - Repeat Forever Action
    ``` typescript
    // the action will make the node move back and forth and keep repeating
    let action = repeatForever(
        sequence(moveBy(1, 200, 0), moveBy(1, -200, 0)) );

    this.node.runAction(action);
    ```
    
    - Speed Action
    ``` typescript
    // the action will make the node zoom in twice while it moves upwards within 0.5 seconds
    let action = speed(
        spawn(moveBy(1, 0, 100), scaleTo(1, 2)) , 2);

    this.node.runAction(action);
    ```

    - Combination Action
    ```typescript
    // the action will make the node do a complicated heart-beating animation
    let action;
    action = sequence(
        spawn(scaleTo(0.1, 0.8, 1.2), moveTo(0.1, 0, 10)),
        spawn(scaleTo(0.2, 1, 1), moveTo(0.2, 0, 0)),
        delayTime(0.2),
        spawn(scaleTo(0.1, 1.2, 0.8),.moveTo(0.1, 0, -10)),
        spawn(scaleTo(0.2, 1, 1), moveTo(0.2, 0, 0))
        ).speed(1.5).repeat(3); // the link-form API makes the animation play five 			times faster and repeat 3 times
    ```

- 32:37 Callback Action
    ```typescript
    let finished = callFunc(this.myMethod, this, opt);
    let finished = callFunc(function(){
        ...
    }, this, opt);
    ```
    - opt 參數
    ``` typescript
    let score = 50;

    // the score will add 100 points after the action is finished
    let finished = callFunc(function(target, score) {
        this.score += score;
    }, this, 100); 
    let action = sequence(moveBy(1, 100, 0), fadeOut(1), finished); 
    ```
    
- 38:20 Slow Motion
    ```typescript
    let scaleUp = scaleTo(1, 2);
    let scaleDown = scaleTo(1, 1);
    scaleUp.easing(easeIn(3.0));
    this.node.runAction(sequence(scaleUp, scaleDown)).repeatForever();
    ```
    
- 42:05 Scheduler
    - schedule
    ```typescript
    // the scheduler will execute once every 3 seconds
    this.schedule(function() {
        log("Hello world!");
    }, 3);

    let interval = 2; // time interval in the unit of second
    let repeat = 3; // time of repetition
    let delay = 5; // start delay

    // the schedule will execute 3+1 times every 2 seconds after 5 seconds 
    this.schedule(function() {
        log("Hello world!"); }, interval, repeat, delay);
    ```
    
    - scheduleOnce
    ```typescript
    // the schedule will execute once after 2 seconds 
    this.scheduleOnce(function() { log(“Hello world!”); }, 2);
    ```
    
    - Cancel Schedule
        - unschedule
        - unscheduleAllCallbacks 
    ```typescript
    this.count = 0;
    this.callback = function() {
        if(this.count == 3) {
            this.unschedule(this.callback);
        }
        cc.log("Hello world!");
        this.count += 1;
    }
    this.schedule(this.callback, 1); // the schedule will be cancelled after executing 4 times
    ```
