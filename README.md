## 技术栈
- H5页面使用react+redux+router+webpack+rxjs+ws+页面适配方案
- 后端环境使用 node+koa+redis+mysql

### 目录结构

```
|--public       无需编译静态资源（会被拷贝至生产目录）
|--scripts      脚手架配置目录
|--src          开发目录
    |--assets       静态资源
    |--lib          模块仓库（基础/第三方等）
    |--index.html   html模板
    |--index.js     入口
```