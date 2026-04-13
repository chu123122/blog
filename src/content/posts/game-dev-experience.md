---
title: "游戏制作经验记录"
date: 2025-01-27
category: "游戏开发"
tags: []
description: "基于《BA》的同人创作，采用 Unity DOTS 和 Netcode for Entities 开发。已完成网络框架、回放系统和输入系统的初步设计，目前正在填充内容。使用 Plastic SCM 进行版本控制。"
---

## 1. 崩坠（2024萌芽gamejam）
![](https://cdn.jsdelivr.net/gh/chu123122/Image-hosting-service/img/%E5%B4%A9%E5%9D%A0.png)
解密平台跳跃游戏，负责全部代码实现。实现了基本的人物运动逻辑、UI 和动画。
![](https://cdn.jsdelivr.net/gh/chu123122/Image-hosting-service/img/output1.gif)


## 2. 鲸落地（2024CIGA，2024吉比特未来游戏制作人）
![](https://cdn.jsdelivr.net/gh/chu123122/Image-hosting-service/img/%E9%B2%B8%E8%90%BD%E5%9C%B0.png)
引入钩爪和多种道具的动作平台跳跃游戏。负责人物逻辑、粒子特效、音效和人物动画的实现。优化了跳跃和移动逻辑，加入了土狼时间、跳跃缓冲和边缘检测等功能。采用状态机、指令模式和策略模式等设计模式，借助 QFramework 的事件框架处理各模块间的耦合。使用git进行版本控制。
![](https://cdn.jsdelivr.net/gh/chu123122/Image-hosting-service/img/output2.gif)


## 3. 守护甜心（2024完美世界）
![](https://cdn.jsdelivr.net/gh/chu123122/Image-hosting-service/img/%E5%AE%88%E6%8A%A4%E7%94%9C%E5%BF%83.png)
类《吸血鬼幸存者》游戏，负责实现游戏逻辑。利用对象池、观察者模式和组合模式，实现了敌人和玩家的逻辑处理。通过 ScriptableObject 存储数据。使用 Plastic SCM 进行版本控制。
![](https://cdn.jsdelivr.net/gh/chu123122/Image-hosting-service/img/output3.gif)


## 4. 无衔之尾（2024GGJ）
![](https://cdn.jsdelivr.net/gh/chu123122/Image-hosting-service/img/%E6%97%A0%E8%A1%94%E4%B9%8B%E5%B0%BE.png)
解密类休闲游戏，负责全部代码实现。在网格地图上基于 BFS 算法搭配策略模式实现了角色的网格寻路，利用状态机编写了程序化动画的移动系统。使用 Plastic SCM 进行版本控制。
问题：角色动画沟通有问题，导致人物移动起来贴图无法平滑转弯。


## 5. 心灯探梦（2024TapTap聚光灯，米兰设计周主题比赛）
![](https://cdn.jsdelivr.net/gh/chu123122/Image-hosting-service/img/%E5%BF%83%E7%81%AF%E6%8E%A2%E6%A2%A6.png)
一款休闲向点击闯关游戏，负责整体框架搭建和 UI 实现和buff系统。在 QFramework 框架上，利用其信息传输和指令系统实现 UI。通过 Unity 内置序列化实现本地化存储和进度管理，手动实现了文字打字机效果和快进功能，数据通过 JSON 格式存储。使用git进行版本控制。
![](https://cdn.jsdelivr.net/gh/chu123122/Image-hosting-service/img/output4.gif)


## 6. 多人联机RTS（名字未确定，正在做）

基于《BA》的同人创作，采用 Unity DOTS 和 Netcode for Entities 开发。已完成网络框架、回放系统和输入系统的初步设计，目前正在填充内容。使用 Plastic SCM 进行版本控制。