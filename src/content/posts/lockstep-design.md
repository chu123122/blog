---
title: "帧同步系统设计记录"
date: 2025-09-06
category: "技术"
tags: []
description: "给予一个初始方向的力"
---

### 实现结果展示
![](https://cdn.jsdelivr.net/gh/chu123122/Image-hosting-service/img/%E5%B8%A7%E5%90%8C%E6%AD%A5%E6%95%88%E6%9E%9C%E6%BC%94%E7%A4%BA-%E5%BC%80%E5%A7%8B.png)


给予一个初始方向的力

![](https://cdn.jsdelivr.net/gh/chu123122/Image-hosting-service/img/%E5%B8%A7%E5%90%8C%E6%AD%A5%E7%B3%BB%E7%BB%9F%E6%BC%94%E7%A4%BA%E6%95%88%E6%9E%9C.png)
演示中多个客户端在给予初始球体一个碰撞后运行轨迹完全一致，同时世界哈希值（物体速度、位置、方向决定）计算值完全一致


github 链接： [https://github.com/chu123122/LockStepSystem](https://github.com/chu123122/LockStepSystem)


### 帧同步的介绍

对于网络多人游戏，如何在不可靠的网络上建立起一个共享一致的虚拟世界是一个重要的问题，主流的两种解决方案分别是：**状态同步**和**帧同步**。


状态同步，个人的理解是：可以概括为**结果同步**。由服务端周期性地将游戏物体的状态数据发放给各个客户端，各客户端接收到数据后进行插值同步，常用于**卡牌、策略、回合制**等无需高精度的游戏。（服务端持有权威世界，客户端强制性同步）


帧同步，我目前的理解是：**确定性世界**中的**输入同步**。在每一帧（或固定的时间步）中，所有玩家的**输入操作**被收集并广播给所有客户端，每个客户端再用完全一致的逻辑去**本地计算游戏状态**，从而保持整个游戏世界的一致性。常用于 **RTS、格斗、MOBA** 等操作频繁、需要精确一致的游戏。（服务端只持有输入历史，客户端各跑各的，所以确定性世界的构建无比重要，不过这种实现是很古早的版本了）


之后收集相关文章时发现这一个**帧同步中的输入同步**中其实有很多地方可以细究，例如：客户端A推迟发送输入，先等服务器发送其他客户端的输入以此作弊怎么办？（称呼为lookahead cheats）输入同步如何处理网络波动和延迟？如何减少同步频率波度导致的影响？
·


### 帧同步系统的设计思路

#### 总览

服务端将从客户端收集到的玩家输入进行分发给各个客户端，具体的单位执行逻辑由客户端本身持有，我们只进行一个输入驱动，在这种情况下，需要是一个**极具确定性的系统**才能够保证各个客户端运行出的结果一致。


```
单个客户端进行本地输入采集，发送给服务端-->

服务端将收集到的各个输入封装后发送给所有客户端-->

客户端收集到服务端发送的指令集后，一一执行输入，模拟出结果。
```


#### 1.逻辑时钟的定义

在构建帧同步系统时，我们遇到的第一个问题就是**时间步长**。unity中的`Update()`循环，其心跳`Time.deltaTime`取决于玩家的硬件性能和渲染负载，*完全不稳定、不可预测*。


为此，我们在服务端和客户端引入了**逻辑时钟**的概念，通过一个**accumulator（时间累加器）和固定的TIME_STEP**，让时间累加器在主循环中不断积累，到达一定时间后进行一次逻辑更新，由此我们在服务端和客户端都建立起了一个**确定性**的逻辑循环。


```
//Unity中客户端逻辑时钟循环
public void LogicUpdate()
  {
      accumulator += Time.deltaTime;//时间累加器累计

        while (accumulator >= TIME_STEP)//当超过TIME_STEP时进行一次逻辑更新
        {
            //....
        }	
    //...
    }
```


```
//cpp中服务端逻辑时钟循环
const float SERVER_TICK_RATE = 30.0f;
const float TIME_STEP = 1.0f / SERVER_TICK_RATE; //即代表每秒30帧
int main(void)
{
  //...
     while (true)
    {
        // 时间管理计算
        auto frameStartTime = std::chrono::high_resolution_clock::now();
        std::time_t now_c = std::chrono::system_clock::to_time_t(frameStartTime);

        std::chrono::duration deltaTime_duration = frameStartTime - lastTime;
        float deltaTime = deltaTime_duration.count();
        lastTime = frameStartTime;

        accumulator += deltaTime;
        while (accumulator > TIME_STEP)
        {
          //...
        }
     }
  //...
}
```


#### 2. 客户端的双时钟模型

对于单一的客户端和服务端来说，简单的逻辑时钟便已经足够。但是对于多客户端来说，却远远不够。我们无法做到**让后续加入的客户端可以安全地重演历史逻辑**。


如何让一个‘活在过去’的新玩家，安全地追上‘现在’，并向‘未来’提交输入？为此，我们选择了**双时钟模型**。


**输入帧** (`currentInputFrame`)，每次步长积累足够后直接递进一次，会在客户端和服务端连接上时，和服务端当前逻辑帧进行同步；


**逻辑帧** (`currentLogicFrame`)，只有确定当前逻辑帧的指令集存在时才进行逻辑更新，同时逻辑帧+1，不会进行同步。


输入帧和逻辑帧的分开设计，可以避免后加入客户端用户的输入干扰到重播的历史。同时，由于后加入客户端以及具备了所有的历史指令集，它在重播时逻辑帧和输入帧步进速度保持了一致，使得落后的客户端可以快速追上前面的客户端。（这里当时研究半天为什么逻辑帧会出现快进的情况）


```
public void LogicUpdate()
{ 
  accumulator += Time.deltaTime;

  while (accumulator >= TIME_STEP)
  {
    //...
    if(_clientManager.ServerCommandSetDic.Keys.
           Contains(executeLogicFrame)) //检查执行帧的指令集是否到达
    {
      //...
      
      currentLogicFrame += 1; //逻辑帧步进
      _physicsManager.LogicUpdate();//物理逻辑更新
      OnGameLogicUpdate?.Invoke();//逻辑更新
    }
    //...
    accumulator -= TIME_STEP;
    currentInputFrame += 1;//输入帧步进
  }
}
```


#### 3.网络延迟处理

帧同步的核心在于**锁步**，我们需要等待所有客户端指令发出后才进行逻辑更新，但这也带来了一个问题：**客户端需要及其频繁，每秒多少帧的输入，才可以填充服务端该帧的指令集**。反之，则会出现服务端迟迟不发送该帧的指令集，客户端产生*死锁*。


为了解决这个问题，我们在服务端引入了**超时处理和空指令**，对于任一逻辑帧的指令集来说，我们只在规定时间内收集，超时默认填充空指令进去。


```
//....
if (status == frameStatus::Collecting)//指令集还处在收集阶段
{
  auto now = std::chrono::high_resolution_clock::now();
  auto age = now - frame_data->creationTime;

  // 收集完成
  if (command_set.size() == client_count)
  {
    status = frameStatus::Ready;
  }
  // 超时填充默认指令
  else if (age > TIMEOUT_DURATION)
  {                     		 	 frame_sync_manager.full_null_command_in_frame_data(
    *frame_data, 
    client_count);
    status = frameStatus::Ready;
  }
}
//....
```


#### 4. 确定性物理世界的构造

在解决了时钟和网络的问题后，很快遇到了另一个问题。Unity本身**物理引擎的黑箱**和**浮点数在不同硬件上的计算差异**，我们无法计算出一样的结果在不同客户端上。


为了解决这个问题，我们需要**抛弃Unity的Rigidbody或Collider**，构建一个自己的简单物体系统。（注，该处为了避免复杂的实现，同时我们所有客户端和服务端都运行在同一硬件下，所以我们仍然使用浮点数作为数据类型而非定点数）


```
public void LogicUpdate()
  {
    for (int i = 0; i