---
date: 2023-09-08
title: Discord Music Bot
subtitle: simple music bot
category: side-projects, discord
frontCover: https://i.pinimg.com/474x/34/91/f3/3491f3e50ab6a4d51a348f9cc2419842.jpg
tag: side-projects, discord, bot, back-end
---
Source code: https://github.com/933yee/discord-simple-music-bot

## Structure
```
project
  └── bot
       ├── bot.py
       ├── config.py
       └── data
            └── data.py
       └── cogs
            ├── commands.py
            └── events.py
  └── .env
```

## Introduction

### main.py
  - 可以藉由更改
    ```py
    bot = commands.Bot(command_prefix="!", intents=intents)
    ```
    改變指令的前綴符號

### config.py
  - 讀取儲存在 .env 檔案裡面 discord 機器人的 Token

### data.py
  - 全域變數，提供給 events.py、commands.py 做處理，還會記哪些伺服器正在使用這個機器人
    - server_data
      - 記錄某伺服器待播的歌曲清單
    - server_loop
      - 記錄某伺服器是否正在循環撥放
      
### events.py
  - 處理事件的地方，像是偵測機器人的開啟、語音頻道的變化（有人離開、加入）等事件。

### commands.py
  - 新增指令的地方，像是：
    ```py
    @commands.command(description="Exit voice channel\n" " ")
    async def exit(self, ctx):
        if ctx.guild.id in server_data:
            await ctx.voice_client.disconnect()
            del server_data[ctx.guild.id]
            del server_loop[ctx.guild.id]
    ```
    - description 是提供給 !help 指令做介紹，簡述指令的功能