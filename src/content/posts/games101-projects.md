---
title: "GAMES101 proj记录"
date: 2025-10-15
category: "计算机图形学"
tags: []
description: "画出两个遮挡的矩形？"
---

#### proj1 （MVP变化中的旋转矩阵和透视投影矩阵实现）
![](https://cdn.jsdelivr.net/gh/chu123122/Image-hosting-service/img/%E9%80%8F%E8%A7%86%E6%8A%95%E5%BD%B1%E6%97%8B%E8%BD%AC.gif)



#### proj2 （光栅化器的三角形栅格化算法和判定点是否在三角形内算法实现）

画出两个遮挡的矩形？

![](https://cdn.jsdelivr.net/gh/chu123122/Image-hosting-service/img/image-20250701151709468.png)
![image-20250701151939625](https://cdn.jsdelivr.net/gh/chu123122/Image-hosting-service/img/image-20250701151939625.png)


判断一个点是否在三角形里面的返回值错误。浮点数应用在if语句中的判定规则是：



- 如果浮点数是 0.0，它被当作 false。

- 如果浮点数是**任何非零值**（无论是正数还是负数），它都被当作 true。
导致我很多有负有正的情况也被认为符合条件返回了true



![image-20250701152415102](https://cdn.jsdelivr.net/gh/chu123122/Image-hosting-service/img/image-20250701184924328.png)


完成。


额外部分：应用MSAA超采样技术


只是多画了几个一样的三角形？

![image-20250701163544051](https://cdn.jsdelivr.net/gh/chu123122/Image-hosting-service/img/image-20250701163544051.png)


我错误理解了MSAA的实现（对于bounding box里面的的每一个像素，我都再进行细分为4个采样点，但是不做四次颜色运算，而是进行四次深度测试然后依据此数据将之前主像素计算出的颜色进行平均处理），


当成了SSAA（对于bounding box里面的的每一个像素，我都再进行细分为4个采样点，进行检查是否在三角形里面，如果是就更新深度值，更加细致的检查，这样自然有效减少了锯齿。但是没考虑到其他点的buff值），实现还有问题导致深度缓冲失效了。


**MSAA: Multi-sample Anti-aliasing (多重采样抗锯齿)**


**SSAA: Super-sampling Anti-aliasing (超采样抗锯齿)**


**MSAA 和 SSAA 的核心区别：**



- **SSAA**：对每个子像素都进行**深度测试 + 着色**。质量最高，成本也最高。

- **MSAA**：对每个子像素都进行**深度测试**，但只进行一次**着色**。在边缘质量和性能之间取得了绝佳的平衡。




MSAA也就是基于覆盖率进行颜色混合。


实现，但是区别比较细微，没太看出来

![image-20250701184924328](https://cdn.jsdelivr.net/gh/chu123122/Image-hosting-service/img/image-20250701184924328.png)




总结：


正常的三角形栅格化算法是对于每个像素点进行：


（1）确实该像素点是否在三角形内部


（2）依据x，y坐标计算出自身在三角形内的重心坐标，然后依据三角形来算出z轴坐标


（3）将z轴坐标与depth_buf数组内的对应进行比较，进行深度缓存


（4）获取颜色，然后传入`set_pixel()`进行着色


MSAA算法：


（1）将该像素点进行超采样，proj2中进行了2x2采样


（2）对于每个子像素点进行循环，确实是否在三角形内部，如果在进行上面第（2）（3）步，同时记录主像素点里有几个子像素点通过了深度测试（`coverage`），记录最小深度


（3）遍历完子像素点后，将该主像素点的深度（`depth_buf`）取子像素点的最小深度，同时对颜色依据`coverage`进行平均。传入`set_pixel()`进行着色。


> 注：MSAA算法第三步，`depth_buf`取子像素点的最小深度，仅为简单简化的软件MSAA，实际GPU的硬件MSAA每个子采样点都与**自己专属的**深度槽比较。


#### proj3

完成基本的栅格化函数后，渲染出来的物体与示例相反，倒过来了？

![image-20250709210226024](https://cdn.jsdelivr.net/gh/chu123122/Image-hosting-service/img/image-20250709210226024.png)


添加了一个z轴翻转矩阵解决，查阅资料发现可能是代码框架的问题，待研究（[《GAMES101》作业框架问题详解 - 知乎](https://zhuanlan.zhihu.com/p/509902950)）


在实现Bump mapping——凹凸贴图时发现奇怪的显示问题

![image-20250710150703731](https://cdn.jsdelivr.net/gh/chu123122/Image-hosting-service/img/image-20250710150703731.png)


询问ai后发现是注释中给予计算本地坐标系的公式存在问题


` Vector t = (x\*y/sqrt(x\*x+z\*z),sqrt(x\*x+z\*z),z\*y/sqrt(x\*x+z\*z))`


后使用**“施密特正交化”**思想，成功实现效果


```
Eigen::Vector3f up = Eigen::Vector3f(0.0f, 1.0f, 0.0f);//取任意不和n平行的辅助向量
 Eigen::Vector3f t = up.cross(n).normalized();
```

![image-20250710151034316](https://cdn.jsdelivr.net/gh/chu123122/Image-hosting-service/img/image-20250710151034316.png)


在实现位移贴图时，简单的移动，错误。移动的地方错误，我应该移动的是顶点着色器里面的顶点？而不是片元着色器里面的片元，因为这些片元是虚拟的？


```
auto h = [&](float u, float v) -> float
    {
        Vector3f color = payload.texture->getColor(u, v);
        return (color.x() + color.y() + color.z()) / 3.0f;
    };
    float u = payload.tex_coords.x();
    float v = payload.tex_coords.y();

    point.x() += h(u, v); //同时移动方式也错误，应该沿着表面的法线方向移动，而不是直接添加
    point.y() += h(u, v);
    point.z() += h(u, v);
```

![image-20250710160621608](https://cdn.jsdelivr.net/gh/chu123122/Image-hosting-service/img/image-20250710160621608.png)


研究后发现实现的好像不是真正的位移贴图而是一种视差映射？但是目前还是失败，效果不一致

![image-20250710161745788](https://cdn.jsdelivr.net/gh/chu123122/Image-hosting-service/img/image-20250710161745788.png)


对比其他人的代码后发现是高度函数h出现问题。
原因：


**凹凸贴图 (Bump Mapping)** 的核心，不是关心一个点的**绝对高度**是多少，而是关心它和**旁边点的高度差**是多少，也就是**坡度 (Gradient)**。


**位移贴图 (或我们实现的视差映射)** 极度依赖**绝对高度值**。而这种平均法来说，不同鲜艳程度的颜色获得的平均值可以是一样的![image-20250710164427440](https://cdn.jsdelivr.net/gh/chu123122/Image-hosting-service/img/image-20250710164427440.png)，而`norm（）`![image-20250710164506302](https://cdn.jsdelivr.net/gh/chu123122/Image-hosting-service/img/image-20250710164506302.png)


```
auto h = [&](float u, float v) -> float
    {
        Vector3f color = payload.texture->getColor(u, v);
       // return (color.x() + color.y() + color.z()) / 3.0f; 原本使用，凹凸贴图没有问题，但是位移贴图会发生问题
          return color.norm();//其他人使用方案，替换后正确
    };
```

![image-20250710163751473](https://cdn.jsdelivr.net/gh/chu123122/Image-hosting-service/img/image-20250710163751473.png)


双线性插值实现问题


丢失部分颜色，获取采样点附近四点判断出现问题，需要确认是否是左手系和右手系差异的影响

![image-20250710204920788](https://cdn.jsdelivr.net/gh/chu123122/Image-hosting-service/img/image-20250710204920788.png)


---


normal shader完成

![image-20250710140045017](https://cdn.jsdelivr.net/gh/chu123122/Image-hosting-service/img/image-20250710140045017.png)


Blinn-phong shader完成

![image-20250710135938469](https://cdn.jsdelivr.net/gh/chu123122/Image-hosting-service/img/image-20250710135938469.png)


Texture shader完成

![image-20250710141422058](https://cdn.jsdelivr.net/gh/chu123122/Image-hosting-service/img/image-20250710141422058.png)


Bump Mapping shader完成

![image-20250710151104836](https://cdn.jsdelivr.net/gh/chu123122/Image-hosting-service/img/image-20250710141422058.png)


Displacement Mapping shader 完成

![image-20250710164551012](https://cdn.jsdelivr.net/gh/chu123122/Image-hosting-service/img/image-20250710164551012.png)


双线性插值完成


虽然我没看出有多大区别


#### proj4（贝塞尔曲线实现的de Casteljau算法及反走样）
![image-20250719192140107](https://cdn.jsdelivr.net/gh/chu123122/Image-hosting-service/img/image-20250719192140107.png)


#### proj5(从视点对像素的光线生成，Moller-Trumbore算法)

颜色纯黑，没有纹理和颜色

![image-20250724201356390](https://cdn.jsdelivr.net/gh/chu123122/Image-hosting-service/img/image-20250724201356390.png)


添加对`if (tnear 。人为地、强制地提高了罕见事件的概率（pdf变大了），从而系统性地、错误地降低了它的贡献（贡献 &#x2F; pdf 变小了）。这会导致最终的渲染结果**整体偏暗，因为它压制了那些虽然罕见但合法的光路贡献。


更好的方法是***检查一致性***：**一个事件的发生概率 (pdf) 极低，通常意味着这个事件本身的贡献也应该极低。** 如果两者不匹配，说明我们的采样策略或场景有问题，但如果我们能保证一致性，就可以安全地处理。


通过将概率过低的罕见情况进行抛弃，我们通过丢弃这些贡献和概率认为都应该忽略不计的样本，对最终结果的影响远小于钳位带来的系统性变暗。


Q：sampleLight内部也没什么检查光线是否被挡的边界情况啊，pdf里面讲的是什么意思？


A：不是指sampleLight函数内部，而是后面的。我**利用采样点和随机获取的光源点进行阴影光线构建，之后进行遮挡检测时**。


**假设你的着色点 p，恰好就位于一个漫反射物体的表面，而这个物体又与一个发光物体重叠或紧紧贴在一起。**


`Scene::intersect` 函数很可能会认为，这条光线**立刻就击中了它自己所在的那个物体**！它会返回一个` shadow_hit`，其中`shadow_hit.distance`是一个**极小极小的正数（几乎为0）**。


遮挡判断代码，会发现阴影光线“被挡住了”，然后错误地认为点 p 无法接收到来自 x’ 的光。这会导致：



- 在物体与光源接触的边缘，出现不自然的**黑色条纹或斑点**。

- 如果一个物体本身就是光源，它在计算直接光照时，可能会认为自己被自己“遮挡”了，导致光源表面出现**黑色噪点（光照痤疮 Light Acne）**。




为了解决这个问题，**我们可以在构建阴影光线时将光线起点沿着表面法线往外推一小段距离**


也就是`ray_origin = p.coords + p.normal \* EPSILON;`EPSILON是一个非常小的正数


按上面两个调整后，渲染出来的图片全黑？

![image-20250810195834929](https://cdn.jsdelivr.net/gh/chu123122/Image-hosting-service/img/image-20250810195834929.png)


ASH实现问题！(现在不确定了，又能运行了？)


重新写一遍发现编译通过但是运行会报错

![](https://cdn.jsdelivr.net/gh/chu123122/Image-hosting-service/img/image-20250812174049620.png)


`  Intersection shade_point = Scene::intersect(ray); // 渲染点`


渲染点没有加上发生检测


Q：一直有黑色条纹问题，考虑过了pdf和sampleLight采样问题后还是存在着。

![image-20250812200527709](https://cdn.jsdelivr.net/gh/chu123122/Image-hosting-service/img/image-20250812200527709.png)


A：直接光影响判断遮挡情况时，没有留下浮点数的浮动范围，导致出现问题。


```
//错误实现
bool has_occlusion = shadow_point.happened &&
                         dis_to_light > shadow_point.distance &&
                         shadow_point.distance > EPSILON;
    // shadow_point.distance  EPSILON)
    {
        L_dir = light_point.emit * m_p->eval(wi, wo, n_p) *
                dotProduct(n_p, wi) * dotProduct(n_x, -wi) / pow(dis_to_light, 2) / pdf;
    }
---------------------------------------------------------------------------------------
//正确版本(has_occlusion改动了)
    bool has_occlusion = shadow_point.happened &&
                         dis_to_light - 1e-3 > shadow_point.distance &&
                         shadow_point.distance > EPSILON;
    // shadow_point.distance  EPSILON)
    {
        L_dir = light_point.emit * m_p->eval(wi, wo, n_p) *
                dotProduct(n_p, wi) * dotProduct(n_x, -wi) / pow(dis_to_light, 2) / pdf;
    }
```


正确实现

![image-20250812200224814](https://cdn.jsdelivr.net/gh/chu123122/Image-hosting-service/img/image-20250812200224814.png)


### proj8 (质点弹簧系统模拟，半隐式欧拉法, 显式欧拉法,显式 Verlet)

完成显式欧拉，半隐式欧拉，Verlet积分，PBD，全局阻尼

![image-20250820142651704](https://cdn.jsdelivr.net/gh/chu123122/Image-hosting-service/img/image-20250820142651704.png)