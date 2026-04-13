---
title: "DOTS中如何使用UI"
date: 2024-01-22
category: "游戏开发"
tags: ["DOTS"]
description: "DOTS中如何使用UI"
---

- ***Hybird式***：建立在Mono的基础上，在一个Entity单位创建后添加待处理Tag，在UI初始化系统中进行各种UI的创建（通过Action&#x2F;Funk的事件机制绑定各类UI的创建）![](/2024/01/22/%E6%B8%B8%E6%88%8F%E5%BC%80%E5%8F%91%E5%AD%A6%E4%B9%A0%E8%AE%B0%E5%BD%95/DOTS%E4%B8%AD%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8UI/../../images/DOTS%E6%80%BB%E7%BB%93/1.png)![](/2024/01/22/%E6%B8%B8%E6%88%8F%E5%BC%80%E5%8F%91%E5%AD%A6%E4%B9%A0%E8%AE%B0%E5%BD%95/DOTS%E4%B8%AD%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8UI/../../images/DOTS%E6%80%BB%E7%BB%93/2.png)

- ***纯ECS式***：在System里面直接创建GameObject（UIPrefabs里存储了预制体）![](/2024/01/22/%E6%B8%B8%E6%88%8F%E5%BC%80%E5%8F%91%E5%AD%A6%E4%B9%A0%E8%AE%B0%E5%BD%95/DOTS%E4%B8%AD%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8UI/../../images/DOTS%E6%80%BB%E7%BB%93/3.png)同时添加上特定组件存储引用，方便后面能够在System里面大批量的查询到(ICleanupComponentData：由unity自动管理生命周期）![](/2024/01/22/%E6%B8%B8%E6%88%8F%E5%BC%80%E5%8F%91%E5%AD%A6%E4%B9%A0%E8%AE%B0%E5%BD%95/DOTS%E4%B8%AD%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8UI/../../images/DOTS%E6%80%BB%E7%BB%93/4.png)