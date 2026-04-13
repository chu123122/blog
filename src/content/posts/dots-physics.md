---
title: "DOTS架构下的物理碰撞"
date: 2025-02-18
category: "游戏开发"
tags: ["DOTS"]
description: "由于在DOTS框架下，unity原本的Rightbody和Collder物理系统无法使用，需要下载Untiy Physics包（地址：com.unity.physics）另外，需要下载Unity Physics包下另一部分"
---

由于在DOTS框架下，unity原本的Rightbody和Collder物理系统无法使用，需要下载Untiy Physics包
（地址：com.unity.physics）
![](/2025/02/18/%E6%B8%B8%E6%88%8F%E5%BC%80%E5%8F%91%E5%AD%A6%E4%B9%A0%E8%AE%B0%E5%BD%95/DOTS%E6%9E%B6%E6%9E%84%E4%B8%8B%E7%9A%84%E7%89%A9%E7%90%86%E7%A2%B0%E6%92%9E/../../images/DOTS%E6%80%BB%E7%BB%93/12.png)
另外，需要下载Unity Physics包下另一部分
![](/2025/02/18/%E6%B8%B8%E6%88%8F%E5%BC%80%E5%8F%91%E5%AD%A6%E4%B9%A0%E8%AE%B0%E5%BD%95/DOTS%E6%9E%B6%E6%9E%84%E4%B8%8B%E7%9A%84%E7%89%A9%E7%90%86%E7%A2%B0%E6%92%9E/../../images/DOTS%E6%80%BB%E7%BB%93/13.png)


#### 如何使用Physics系统


- 实现ITriggerEventsJob![](/2025/02/18/%E6%B8%B8%E6%88%8F%E5%BC%80%E5%8F%91%E5%AD%A6%E4%B9%A0%E8%AE%B0%E5%BD%95/DOTS%E6%9E%B6%E6%9E%84%E4%B8%8B%E7%9A%84%E7%89%A9%E7%90%86%E7%A2%B0%E6%92%9E/../../images/DOTS%E6%80%BB%E7%BB%93/9.png)triggerEvent里面可以获取到当前发生碰撞的两个事物，通过条件手动判断两个事物分别是什么![](/2025/02/18/%E6%B8%B8%E6%88%8F%E5%BC%80%E5%8F%91%E5%AD%A6%E4%B9%A0%E8%AE%B0%E5%BD%95/DOTS%E6%9E%B6%E6%9E%84%E4%B8%8B%E7%9A%84%E7%89%A9%E7%90%86%E7%A2%B0%E6%92%9E/../../images/DOTS%E6%80%BB%E7%BB%93/10.png)（注意Job里面需要使用ComponentLookup&#x2F;BufferLookup之类来获取到检查对应组件是否拥有）在System里面创建时手动传输![](/2025/02/18/%E6%B8%B8%E6%88%8F%E5%BC%80%E5%8F%91%E5%AD%A6%E4%B9%A0%E8%AE%B0%E5%BD%95/DOTS%E6%9E%B6%E6%9E%84%E4%B8%8B%E7%9A%84%E7%89%A9%E7%90%86%E7%A2%B0%E6%92%9E/../../images/DOTS%E6%80%BB%E7%BB%93/11.png)Collstion和Physics同理