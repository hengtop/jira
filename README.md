# 本项目是一个打造 jira 的练习项目

项目资料：[链接](https://www.notion.so/React-491ad0643476437cafde50bee4dde6ed)

## 项目规范

1. 添加 prettier 和 eslint

```shell
yarn add --dev --exact prettier
echo {}> .prettierrc
```

使用 react-app 创建的 ts 模板自带 eslint，但是和 prettier 使用的时候需要额外的一个插件保证不冲突，
[参考链接](https://prettier.io/docs/en/install.html#eslint-and-other-linters)
同时再 package.json 中添加配置：

```json
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest",
  +   "prettier"
    ]
  },
```

2. 添加自动化执行命令 lint-staged and husky

   使得我们可以再提交前自动格式化和修复代码。

```shell
npx mrm lint-staged
```

3. 添加 commitlint
   规范 commit 的提交内容

   参照链接[commitlint](https://github.com/conventional-changelog/commitlint)

## 项目开发策略

状态管理: 全局的一些方法或者状态尝试 context 来进行使用，以往我是 redux 一把梭
样式: 使用 antd 和 emotion 进行搭配使用
布局 grid 和 flex 总结
修改一些头部信息比如标题，可以使用 react-helmet 或者自定义 hooks

# 如何启动

# 实现功能

# 优化

优化页面刷新后总是先跳转到登录页面的情况
优化请求的一些状态判断，比如开始请求，请求中，请求完毕，请求错误
无限循环的坑
在组件还没有挂载的时候触发了请求函数，在请求过程中中又卸载了组件，等到获取到请求数据后再 setData 数据，可能会导致报错，这里优化判断当前组件是否已经挂载再进行 setData。目前 React18.0.1 并未发现该问题。
乐观更新
统一 id 类型

跨组件状态管理

简单跨组件：状态提升（祖先组件统一分发）/或者组合组件（直接转递一个封装好的组件）
一些请求数据缓存：react-query/swr
客户端状态 url/redux/context
