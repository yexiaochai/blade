轻webapp框架blade
=====

小钗有幸进入框架组做webapp的框架开发，并且基于框架的业务频道用于生产，各频道遍地开花，取得了不错的成绩，
但是，随着业务的快速迭代，框架为满足业务需求做了很多业务的事情，代码中也慢慢出现了坏味道，并且会发现有一些设计不合理的地方。
想在工作中做调整基本不可能，所依赖的第三方库搞掉也有很大的风险。这个时候小钗就萌生出开发出一套干净的轻webapp框架的想法，于是该框架便出现了。
诚然，此框架比不上Backbone，比不了anglarJS，甚至本身也会有一些问题，但是作为初步接触前端的同学，或者想在前端看到一些设计思想的同学，该框架还是有他一些优势。而且这个代码主要用于学习交流，我们带着看看不吃亏的想法，还是可以接触一下他的嘛！！！

### 支持情况

该框架是移动端框架，主要支持IOS6+、android4+


## 框架发展

### 第一期-MVC

该框架第一期的目标是简单的webapp MVC的实现，现在也基本实现了，app支持hashChange与pushState两种方式做路由加载view，对此有兴趣的同学可以看看helloWord
关于app与页面级View的关系如下：

![Toast UML](https://raw.githubusercontent.com/yexiaochai/blade/master/doc/images/mvc.png)

### 第二期-通用工具

框架第二期的想法是，完善本身一些通用的东西，比如UI组件或者简单的flip手势工具等，这里小钗不是专业的前端，就直接从线上将公司的CSS Down下来了，也用了他的Dom结构
但是，整个组件的扩展非常方便，有兴趣的同学看看UI一块的代码，UI的继承关系如下：

![Toast UML](https://raw.githubusercontent.com/yexiaochai/blade/master/doc/images/ui.png)

### 第三期-ABTesting

框架第三期目标是实现前端ABTesting方案


### 第四期-ipad适配

框架第四期的目标是一套业务代码，可以同时用于mobile与ipad

### 第五期-Hybrid

框架第五期目标是实现Hybrid交互适配，由于小钗本身不懂native开发所以此方案要靠后

### 随机期-疑难杂症

框架还会单开一个频道做一些疑难杂症处理，比如：
① fixed问题
② 区域滚动问题
③ app唤醒
④ History路径问题等

## 更多信息

### DEMO
想简单看看demo的朋友请到：
http://yexiaochai.github.io/blade/

### 博客
有意愿更多了解框架的朋友请至：
http://www.cnblogs.com/yexiaochai/category/594176.html

