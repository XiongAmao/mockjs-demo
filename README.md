# mockjs-demo

> A Mockjs + json-server 项目学习



## isssue
尝试在Vue-cli中引入`json-server`，结果发现实际上json-server会介入掉`/`路径作为它的首页，因此希望能砍掉这个功能，目前的想法是自己搞一个类似的项目，专门用来做webpack的模拟数据。

需求暂定：
1. 提供配置文件可以开启开发项目的路由设置，从json -> 路由配置
2. 作为middleware嵌入vue-cli
3. 数据模拟可以使用mockjs 填充
4. 需要提供常用方法，可以在json中配置 POST GET DELETE PUT OPTIONS PATCH
5. 数据写入用json-server使用的[lowdb](https://github.com/typicode/lowdb)

## 记录
最近准备开始撸项目，由于还在设计阶段，还没正式开始项目，预计接口短期内也无法提供，想起有个叫做`Mockjs`的库可以做这个，干脆尝试自己做个假数据。

`Mockjs`基本用法就不提了，参考[官方文档](http://mockjs.com/examples.html)即可，这里主要看如何将这个库结合到`Vue-cli`的`webpack-dev-server`中。

该demo的由`vue-cli`构建，需要注意的是由于新版的`vue-webpack-template`的`/build`目录下的`dev-server.js`配置文件取消了，配置项改在了，`webpack.dev.conf.js`里面

![](http://ond8gcwbr.bkt.clouddn.com/17-12-27/9682921.jpg)
因此，如果要使用`dev-server`做处理开发中的请求，需要做另外的配置，这里官方提供了一个[钩子](https://webpack.js.org/configuration/dev-server/#devserver-before):

```
before(app){
  app.get('/some/path', function(req, res) {
    res.json({ custom: 'response' });
  });
}
```
借助这个钩子可以自己定义中间件对路由劫持并做处理。
由于这里是webpack配置文件，不便于做mock数据的配置，因此将配置放在其他目录，引入进来（如上图红框部分）。

接下来看看mockjs路由处理的主体：
```
const Mock = require('mockjs')
const express = require('express')
const mockRouter = express.Router() // express路由
const Random = Mock.Random  // mock的方法

// method: GET
// path: /data
mockRouter.get('/data', (req, res) => {
  const data = {
    email: Random.email()  // 随机一个email
  }
  res.json(data)  // 序列化并返回json对象
})
module.exports = mockRouter
```
这里作为路径细节的补充，我们可以在这里做任意的劫持，返回模拟的数据用于填充数据。

在来看看Vue组件：
```
<template>
  <div>
    <h1>Mockjs + json-server</h1>
    <p>the data is : {{ apiData }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      apiData: '',
    };
  },
  methods: {
    test() {
      this.$axios  // 将axios全局注入
        .get("/api/data")
        .then(res => {
          this.apiData = res.data;
        })
    }
  },
  created() {
    this.test()
  }
};
</script>
```
渲染结果：
![](http://ond8gcwbr.bkt.clouddn.com/17-12-27/39106547.jpg)

项目地址：
https://github.com/XiongAmao/mockjs-demo
