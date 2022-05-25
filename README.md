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

全局的一些方法或者状态长是哟个 context 来进行使用，以往我是 redux 一把梭

# 如何启动

# 实现功能
