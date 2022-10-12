# NodeProject

## nodejs 和 JavaScript 的区别

### ECMAScript

- 定义了语法, javascript和nodejs都必须遵守
- 变量定义,循环,判断,函数
- 原型和原型链,作用域和闭包,异步
- 不能操作dom,不能监听click事件,不能发送ajax请求
- 不能处理http请求,不能操作文件
- 只有ECMAScript,几乎无法完成任何实际项目

### JavaScript

- 使用ECMAScript语法规范, 外加Web api
- dom操作,bom操作,事件绑定,ajax等
- 两者结合即可完成浏览器端的任何操作

### nodejs

- 使用ECMAScript语法规范, 外加node api
- 处理http,处理文件等
- 两者结合即可完成server端的任何操作

## sever开发和前端开发的区别

### 服务稳定性

- sever端可能会遭受各种恶意攻击和误操作
- 单个客户端可以意外挂掉,但服务端不能
- PM2做进程守候

### 内存和cpu(优化,拓展)

- 客户端独占一个浏览器,内存和cpu都不是问题
- sever端承载很多请求,cpu和内存都是稀缺资源
- 使用stream写日志,使用redis存session

### 日志记录

- 前端只是日志的发起方,不关心后续
- server端要记录日志,存储日志,分析日志

### 安全

- server端要随时准备接收各种恶意攻击
- 如: 越权操作, 数据库攻击等
- 登录验证, 预防xss和sql注入

### 集群和服务拆分

- 产品发展速度快,流量可能会迅速增加
- 如何通过拓展机器和服务拆分来正在大流量
