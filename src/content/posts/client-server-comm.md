---
title: "客户端和服务端通信知识点记录"
date: 2025-02-19
category: "游戏开发"
tags: ["DOTS"]
description: "通过添加组件SendRpcCommandRequest来发送Rpc请求，通过添加组件ReceiveRpcCommandRequest来接受到Rpc请求，rpc接受到时需要立即销毁，unity限制了rpc的存在时间（超过一定时间会弹报错）注："
---

#### 1. Rpc的发送和接收

通过添加组件SendRpcCommandRequest来发送Rpc请求，
![](/2025/02/19/%E6%B8%B8%E6%88%8F%E5%BC%80%E5%8F%91%E5%AD%A6%E4%B9%A0%E8%AE%B0%E5%BD%95/%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%92%8C%E6%9C%8D%E5%8A%A1%E7%AB%AF%E9%80%9A%E4%BF%A1%E7%9F%A5%E8%AF%86%E7%82%B9%E8%AE%B0%E5%BD%95/../../images/DOTS%E6%80%BB%E7%BB%93/5.png)
通过添加组件ReceiveRpcCommandRequest来接受到Rpc请求，rpc接受到时需要立即销毁，unity限制了rpc的存在时间（超过一定时间会弹报错）
![](/2025/02/19/%E6%B8%B8%E6%88%8F%E5%BC%80%E5%8F%91%E5%AD%A6%E4%B9%A0%E8%AE%B0%E5%BD%95/%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%92%8C%E6%9C%8D%E5%8A%A1%E7%AB%AF%E9%80%9A%E4%BF%A1%E7%9F%A5%E8%AF%86%E7%82%B9%E8%AE%B0%E5%BD%95/../../images/DOTS%E6%80%BB%E7%BB%93/6.png)
注：



- ReceiveRpcCommandRequest和SendRpcCommandRequest内存在属性 Entity SourceConnection。不设置的情况下，从客户端发送rpc默认发送往服务端，从服务端发送默认发送往所有客户端

- Rpc的entity存储的数据大小是有限制的，无法存储较多的数据




#### 2. 组件的网络传输

通过往组件上添加GhostComponent，对应属性上添加GhostField来实现（注：只添加一个是不行的），由unity自动管理客户端和服务端的同步。
![](/2025/02/19/%E6%B8%B8%E6%88%8F%E5%BC%80%E5%8F%91%E5%AD%A6%E4%B9%A0%E8%AE%B0%E5%BD%95/%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%92%8C%E6%9C%8D%E5%8A%A1%E7%AB%AF%E9%80%9A%E4%BF%A1%E7%9F%A5%E8%AF%86%E7%82%B9%E8%AE%B0%E5%BD%95/../../images/DOTS%E6%80%BB%E7%BB%93/7.png)


#### 3. RPC和GhostField的区别

RPC保证了一定传达，是可信赖的。GhostField则是可能丢失的。同时后加入的玩家无法获取到向前发送到的RPC，但是之前可以从服务器获取到物体当前的GhostField。
eg.一个宝箱，玩家a打开后如果服务器端用RPC来改变，则后来的玩家无法获取到向前的RPC，宝箱依旧关闭；如果用GhostField来存储，则是打开的
RPC多用于一次性事件，Ghost多用于持久化的属性（但也可用于一次性事件？）


#### 4. 如何处理客户端和服务端帧率不同导致的行为问题

在Update里面添加
![](/2025/02/19/%E6%B8%B8%E6%88%8F%E5%BC%80%E5%8F%91%E5%AD%A6%E4%B9%A0%E8%AE%B0%E5%BD%95/%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%92%8C%E6%9C%8D%E5%8A%A1%E7%AB%AF%E9%80%9A%E4%BF%A1%E7%9F%A5%E8%AF%86%E7%82%B9%E8%AE%B0%E5%BD%95/../../images/DOTS%E6%80%BB%E7%BB%93/8.png)