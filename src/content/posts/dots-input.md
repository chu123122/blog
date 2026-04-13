---
title: "DOTS输入处理"
date: 2025-02-14
category: "游戏开发"
tags: ["DOTS"]
description: "InputEvent，一个标志用于处理一个输入是否被响应过了，同时追踪该输入事件响应过几次（bool+int）"
---

- InputEvent，一个标志用于处理一个输入是否被响应过了，同时追踪该输入事件响应过几次（bool+int）

- NetWorkTime.IsFirstFullPredictingTick，检测是不是一个服务器端的时间步长的开始，如果是就执行，确保了按照服务器端的时间步长执行代码

- 带Ghost的数据会被同步到所有客户端。例如不带Ghost的IInputComponentData，只是从单一客户端发完服务端，带Ghost则会同步到所有客户端




![](/2025/02/14/%E6%B8%B8%E6%88%8F%E5%BC%80%E5%8F%91%E5%AD%A6%E4%B9%A0%E8%AE%B0%E5%BD%95/DOTS%E8%BE%93%E5%85%A5%E5%A4%84%E7%90%86/../../images/DOTS%E6%80%BB%E7%BB%93/14.png)