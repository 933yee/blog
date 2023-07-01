---
date: 2023-07-01
title: Cocos Creator NTHU
subtitle: 
category: information techonology
frontCover: study.png
---

NTHU Lecture
===

## Lecture11,12 Cocos Creator - Script & UI

<!-- {%youtube SZxVnZT254A%} -->

<video src="https://www.youtube.com/watch?v=SZxVnZT254A" controls>
  你的浏览器不支持 <code>video</code> 标签。
</video>

<hr>

### 4:50  script
- 08:27 Structure
    ```ts
    // variable example
    public name: string = "kevin"

    // function example
    sayHello(){
        log(this.name + "says Hello World!")
    }
    ```
- 11:07 Life-Cycle Callbacks
    ```ts
    onLoad(){} // first
    start(){}  // second
    update(){}
    ```
- 14:19 Property
    ```ts
    @property(Label)
    label: Label = null;

    @property
    text: string = 'hello';
    ```
- 23:18 Import
- 34:44 Get Other Component
    ```ts
    import {HelloWorld} from './HelloWorld'

    @property(HelloWorld)
    helloWorld: HelloWorld = null;
    
    start(){  
        log(this.helloWorld.name); // print kevin
        let HelloWorldCmp: HelloWorld = this.getComponent(HelloWorld);
        log(helloWorldCmp.name); // print kevin
    }
    ```
- 36:37 Find Child Node
    ```ts
    let childNode:any = this.node.children;
    log(this.node.getChildByName("HelloWorld").text);
    find("Canvas/Reset"); // path/referenceNode
    ```
- 40:15 Register Mouse Events
    ```ts
   start(){
       this.node.on(Node.EventType.MOUSE_DOWN, function(event){
            log("Mouse down");    
        }, this)
   }
    ```
- 42:40 Register Keyboard Events
    ```ts
   start(){
       systemEvent.on(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
       // off => unregister
   }
    onKeyDown(event){
        if(event.keyCode == macro.KEY.w)
            // if press w, then ...
    }
    ```
- 46:20 Angry bird (Mouse control)
    ```ts
    onEnable(){
        this.node.on(Node.EventType.TOUCH_START, this._onTouchBegan, this);
    }
    _onTouchMove(event){
        if(this.draggable){
            let start = event.getStartLocation();
            let cur = event.getLocation();

            cur.subSelf(start); // cur = cur-start

            this.node.setPosition(this.startPos.add(cur_v));
        }
        event.stopPropagation(); // stop propagating event to parent   
    }
    ```
- 54:20 Dynamic Event Binding
- 1:02:20 Advanced: Dynamic Click Event

<br>

### 1:07:05  UI
- 1:08:05 Canvas
- 1:11:15 Layout
- 1:16:16 Button
- 1:19:54 RichText/Label
    - RichText 可以用 html tag
    - Cocos 只支援 TTF 字形
- 1:22:37 ScrollView
- 1:24:50 EditBox
- 1:25:16 Simple Music Player Example

<hr>

## Lecture13 Cocos Creator - Physics
<!-- {%youtube fuMxe9x8PSc%} -->

### 3:40 Physics Components
- Enable physics manager
    ```ts
    onLoad(){
        director.getPhysicsManager().enabled = true;
    }
    ```
- 08:13 Rigid Body: Basic Properties
    - Enable contact listener
        - 監聽此物體與其他node的碰撞，傳給call back function
    - Bullet 
        - 物體移動速度超過更新頻率時，打勾可以做出比較精準的動作
    - Allow sleep
        - 長時間沒有碰撞，可以進入休眠狀態，通常不勾，因為要多寫其他判斷
    - Type
        1. Static
            - 沒有質量、速度，不會受到任何力的影響，常用來做建築物、牆壁、障礙物
        2. Dynamic
            - 最常用
        3. Kinematic
            - 沒有質量，可以設定速度，可以用來碰撞
        4. Animated
            - 結合Kinematic和Animation 
            <br>
- 16:02 Collider
    : Collision System
        - 偵測是否有兩個物體碰撞
    : Physics System
        - 繼承 Collision System，並處理物理特性
        - Type: Box, Circle, Chain, Polygon
        - Editing
            - 改變 collider 外觀
        - tag
            - 加標籤，偵測碰撞時是哪個標籤
        - Sensor 
            - no collision behavior occurs
            - 
        <br>
- 33:42 Collision Callback Functions
    - onBeginContact(contact, self, other)
        - 兩個物體碰撞的瞬間
    - onEndContact(contact, self, other)
        - 兩個物體結束碰撞的瞬間
    - onEndContact(contact, self, other)
    <br>
- 45:55 Add Force to RightBody
    ```ts
    private jump(){
        this.getComponent(RigidBody).applyForceToCenter(new Vec2(0, 1500000), true);
    }
    ```
    
- 46:15 Change Velocity of RigidBody
    ```ts
    private jump(){
        this.getComponent(RigidBody).linearVelocity = v2(0, 1500);
    }
    ```
    
- 1:10:48 Group Manager


- 1:15:03 Identify the Colliding Node
    ```ts
    onBeginContact(contact, self, other){
        if(other.node.name == "ground"){
            ...
        }
        if(other.tag == 0){
            ...
        }
    }
    ```
## Lecture14 Cocos Creator - Action System & Scheduler
<!-- {%youtube Y2iGxMLZYlw%} -->

- 03:18 Action System APIs
    ```ts
    let action = moveTo(2, 10, 10);
    this.node.runAction(action);

    this.node.stopAction(action);
    this.node.stopActions();
    ```
    - action tags
    ```ts
    let action = moveTo(2, 10, 10);
    let actionTag = 1;
    action.setTag(actionTag);
    
    this.node.getActionByTag(actionTag);
    this.node.stopActionByTag(actionTag);
    ```
- 09:00 Basic Action
    - 10:02 Interval Action
        - 有時間控制
    ```ts
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
        - 馬上發生
    ``` ts
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
    ``` ts
    // the action will make the node move back and forth
    let action = sequence(moveBy(1, 200, 0), moveBy(1, -200, 0));
    this.node.runAction(action);
    ```
    
    - Synchronization Action
    ``` ts
    // the action will make the node zoom in twice while it moves upwards
    let action = spawn(moveBy(1, 0, 100), scaleTo(1, 2));
    this.node.runAction(action);
    ```
    
    - Repeatitive Action
    ``` ts
    // the action will make the node move back and forth 5 times
    let action = repeat(
        sequence(moveBy(1, 200, 0), moveBy(1, -200, 0)) , 5);

    this.node.runAction(action);
    ```

    - Repeat Forever Action
    ``` ts
    // the action will make the node move back and forth and keep repeating
    let action = repeatForever(
        sequence(moveBy(1, 200, 0), moveBy(1, -200, 0)) );

    this.node.runAction(action);
    ```
    
    - Speed Action
    ``` ts
    // the action will make the node zoom in twice while it moves upwards within 0.5 seconds
    let action = speed(
        spawn(moveBy(1, 0, 100), scaleTo(1, 2)) , 2);

    this.node.runAction(action);
    ```

    - Combination Action
    ```ts
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