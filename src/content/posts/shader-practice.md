---
title: "图形学练习实践"
date: 2025-10-15
category: "计算机图形学"
tags: []
description: "程序化波浪："
---

**程序化波浪：**


通过在顶点着色器中，使用`sin()`函数和时间变量，对顶点的Y轴位置进行程序化偏移实现。

![](https://cdn.jsdelivr.net/gh/chu123122/Image-hosting-service/img/%E6%B3%A2%E6%B5%AA%E6%95%88%E6%9E%9C.gif)


```
//顶点着色器里面进行扰动
float3 x_offset = sin(_Time.y * _Frequency) * _Amplitude;
float3 y_offset = sin(_Time.y * _Frequency + IN.positionOS.x * _WaveLength) * _Amplitude;

float3 modifiedPositionOS = IN.positionOS.xyz;
modifiedPositionOS.x += x_offset;
modifiedPositionOS.y += y_offset;
```


---


**溶解特效：**


通过采样噪声纹理，并以时间为变量，动态控制`clip()`函数的阈值达成。

![](https://cdn.jsdelivr.net/gh/chu123122/Image-hosting-service/img/%E6%BA%B6%E8%A7%A3%E6%95%88%E6%9E%9C.gif)


```
//噪声贴图
half noiseValue = SAMPLE_TEXTURE2D(_NoiseMap, sampler_NoiseMap, parallax_uv).r;
half threshold = frac(_Time.y * _DissolveThreshold); // 用时间驱动
clip(noiseValue - threshold);
```


---


**护盾效果：**


基于**菲涅尔反射公式**、**法线扰动贴图**、**时间参数偏差**，实现能量护盾效果

![](https://cdn.jsdelivr.net/gh/chu123122/Image-hosting-service/img/%E8%83%BD%E9%87%8F%E6%8A%A4%E7%9B%BE%E6%95%88%E6%9E%9C.gif)


```
//纹理流动效果
float2 scroll_offset = _ScrollSpeed.xy * _Time.y;
float2 final_uv = parallax_uv+ scroll_offset;
 //纹理贴图
half4 albedo = SAMPLE_TEXTURE2D(_BaseMap, sampler_BaseMap, final_uv);
```


---


**软件光栅化器：**


基于 **GAMES101** 教学内容独立实现。
 包括三角形扫描、深度测试（Z-Buffer）、透视纹理映射、光照插值等基础功能。


代码：[GAMES101&#x2F;Assignment3&#x2F;Code at main · chu123122&#x2F;GAMES101](https://github.com/chu123122/GAMES101/tree/main/Assignment3/Code)

![](https://cdn.jsdelivr.net/gh/chu123122/Image-hosting-service/img/image-20250710141422058.png)


**Blinn-Phong复刻**：


在Unity中用HLSL绕过内置管线，手动实现了Blinn-Phong光照模型，包括漫反射、高光和环境光和纹理贴图、法线贴图和视差贴图。

![](https://cdn.jsdelivr.net/gh/chu123122/Image-hosting-service/img/image-20250717203049390.png)


左（视差贴图+法线贴图） 右（无光照）

![](https://cdn.jsdelivr.net/gh/chu123122/Image-hosting-service/img/image-20251028171315315.png)


```
//环境光计算
  half3 ambient = SampleSH(normalWS);
  //漫反射光计算
  half3 diffuse = energy * saturate( dot(normalWS, light_direction));
  //高光计算
  half3 specular = energy * pow(saturate(dot(normalWS, h)), _Shininess);

half3 finalColor = (ambient + diffuse) * baseMapColor.rgb + specular;
```


---


**多线程路径追踪：**


基于蒙特卡洛积分方法的路径追踪渲染器， 实现了漫反射、镜面反射、全局光照与软阴影。
 使用 `std::thread` 进行分块并行渲染以加速计算。


代码：[GAMES101&#x2F;PA7.1 at main · chu123122&#x2F;GAMES101](https://github.com/chu123122/GAMES101/tree/main/PA7.1)

![](https://cdn.jsdelivr.net/gh/chu123122/Image-hosting-service/img/image-20250812200224814.png)