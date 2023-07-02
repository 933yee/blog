---
date: 2023-07-01
title: Cocos Creator (2/4)
subtitle: [CGV/MIS] 2023 Summer Internship Entrance Test for Project Students
category: personal note
frontCover: cocos.png
---

Cocos Creator (2/4)
===
<hr style="border-color: rgb(161, 161, 161, 0.5); width: 100%;">

## Lecture13 Cocos Creator - Physics

```youtube
https://www.youtube.com/watch?v=fuMxe9x8PSc
```

- Enable physics manager
    ```typescript
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
            <br></br>


- 16:02 Collider
    - Collision System
        - 偵測是否有兩個物體碰撞
    - Physics System
        ```def 
        繼承 Collision System，並處理物理特性
        ```
        - Type
            ```def
            Box, Circle, Chain, Polygon
            ```
        - Editing
            ```def
            改變 collider 外觀
            ```
        - tag
             ```def
            加標籤，偵測碰撞時是哪個標籤
            ```
        - Sensor 
            ```def
            no collision behavior occurs
            ```
- 33:42 Collision Callback Functions
    - onBeginContact(contact, self, other)
        ```def
        兩個物體碰撞的瞬間
        ```
    - onEndContact(contact, self, other)
        ```def
       兩個物體結束碰撞的瞬間
        ```
    - onEndContact(contact, self, other)
    <br></br>
- 45:55 Add Force to RightBody
    ```typescript
    private jump(){
        this.getComponent(RigidBody).applyForceToCenter(new Vec2(0, 1500000), true);
    }
    ```
    
- 46:15 Change Velocity of RigidBody
    ```typescript
    private jump(){
        this.getComponent(RigidBody).linearVelocity = v2(0, 1500);
    }
    ```
    
- 1:10:48 Group Manager


- 1:15:03 Identify the Colliding Node
    ```typescript
    onBeginContact(contact, self, other){
        if(other.node.name == "ground"){
            ...
        }
        if(other.tag == 0){
            ...
        }
    }
    ```