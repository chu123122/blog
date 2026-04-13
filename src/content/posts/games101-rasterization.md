---
title: "GAMES101学习之路(二)：光栅化的原理"
date: 2025-07-14
category: "计算机图形学"
tags: []
description: "在经过的上一步的MVP变换和视口变换后，我们所获得的是一个标准立方体（NDC）中的几个浮点数顶点坐标（三角形），无法确定这个三角形中覆盖了哪些像素点，无法计算在三角形中的像素点的颜色，无法获得这个像素点所对应纹理空间的坐标。而光栅化就是为了"
---

### 为什么要光栅化？

在经过的上一步的**MVP变换**和**视口变换**后，我们所获得的是一个**标准立方体（NDC）**中的几个**浮点数顶点坐标**（三角形），*无法确定这个三角形中覆盖了哪些像素点*，*无法计算在三角形中的像素点的颜色*，*无法获得这个像素点所对应纹理空间的坐标*。而**光栅化**就是为了解决这些问题的。


也就是说**光栅化**其核心功能可以覆盖为两点：



- **覆盖判断：**确定屏幕空间中的一个像素点是否在三角形内部

- **属性插值：**确定在三角形内部的这个像素点的纹理坐标，视图空间坐标，法线等数据（为后续的片元着色器做准备）




### 光栅化是如何工作的？

#### 1.覆盖判断

相较于逐一遍历屏幕上所有像素，现代计算机选用的是**围绕三角形顶点画出一个矩形区域**，再逐一遍历。


```
void rst::rasterizer::rasterize_triangle(const Triangle &t)
{
    auto v = t.toVector4();
    float min_x = INT_MAX;
    float min_y = INT_MAX;
 
    float max_x = INT_MIN;
    float max_y = INT_MIN;
 
    for (Vector4f i : v)   
    {
        max_x = MAX(max_x, i.x());
        max_y = MAX(max_y, i.y());
 
        min_x = MIN(min_x, i.x());
        min_y = MIN(min_y, i.y());
    }
     //此时min_x,max_x和min_y和max_y便是划出的矩形范围
    .......//后省略
}
```


而通过利用**向量叉乘**的关系，我们便可以简单的通过三点判断一个像素的中心是否在三角形内部。


```
static bool insideTriangle(int x, int y, const Vector3f *_v)
{
    Vector3f point(x, y, 0);
    Vector3f e_0 = _v[0] - _v[1];//三角形三条边的向量
    Vector3f e_1 = _v[1] - _v[2];
    Vector3f e_2 = _v[2] - _v[0];
 
    Vector3f p_0 = _v[0] - point;//从该点指向三角形三顶点的向量
    Vector3f p_1 = _v[1] - point;
    Vector3f p_2 = _v[2] - point;
 
    float cross_0 = e_0.cross(p_0).z();//叉乘结果
    float cross_1 = e_1.cross(p_1).z();
    float cross_2 = e_2.cross(p_2).z();
 
    //当叉乘结果符号一致时，即该点在三角形内部
    bool is_positive = cross_0 > 0 && cross_1 > 0 && cross_2 > 0;
    bool is_negative = cross_0  computeBarycentric2D(float x, float y, const Vector4f *v)
  
//阿尔法，贝塔，伽马 即该点相对三角形重心的坐标
auto [alpha, beta, gamma] = computeBarycentric2D(x, y, t.v);
```


但是这里需要注意的是，**由于透视投影的存在，直接在屏幕空间进行线性插值会得到错误的结果。**而解决方案便是**透视校正插值 (Perspective-Correct Interpolation)：虽然属性本身在屏幕上不是线性变化的，但属性除以其深度 (C&#x2F;w)** 这个值却是线性变化的。


```
auto [alpha, beta, gamma] = computeBarycentric2D(x, y, t.v);
 //透视校正插值
 float Z = 1.0 / (alpha / v[0].w() + beta / v[1].w() + gamma / v[2].w());
```


### 光栅化实现踩坑记录
![image-20250716170943357](/images/GAMES101/images/proj2/1.png)