---
date: 2023-07-01
title: Cocos Creator (1/4)
subtitle: [CGV/MIS] 2023 Summer Internship Entrance Test for Project Students
category: personal note
frontCover: cocos.png
---

```youtube
https://www.youtube.com/watch?v=SZxVnZT254A
```

## 4:50  script
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
        if(event.keyCode == KeyCode.KEY_W)
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

## 1:07:05  UI
- 1:08:05 Canvas
- 1:11:15 Layout
- 1:16:16 Button
- 1:19:54 RichText/Label
    - RichText 可以用 html tag
    - Cocos 只支援 TTF 字形
- 1:22:37 ScrollView
- 1:24:50 EditBox
- 1:25:16 Simple Music Player Example

