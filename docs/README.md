# 指南

## 介绍

::: tip
开箱即用的 Vue 组件库
:::

## Install

```bash
npm install vtp
# or
yarn add vtp
```

## Used

### 一键全局引入

```javascript
import Vue from 'vue'
import Vtp from 'vtp'

Vue.use(Vtp)
```

### 按需引入

```javascript
import Vue from 'vue'
import { VtpButton } from 'vtp'

Vue.use(VtpButton)
```

## 组件库贡献指南

::: danger
组件库贡献必读, 请严格按照下列贡献指南
::: 

01. 第一次使用该组件库时, 请执行命令 `npm run init` 
02. 推荐使用 [git-flow 工作流](https://www.git-tower.com/learn/git/ebook/cn/command-line/advanced-topics/git-flow), 确保一个组件一个分支, 使用命令 `git flow feature start [组件名]` , 开发结束之后需要使用命令 `git flow feature finish [组件名]` 该命令将会自动进行分支合并以及删除当前分支
03. 当需要对一个已存在的组件进行更新维护或者升级时, 请使用命令 `git flow hotfix start [组件名]` , 开发结束之后需要使用命令 `git flow hotfix finish [组件名]` 该命令将会自动进行分支合并以及删除当前分支
04. 当需要对一个已存在的组件进行 bug 修复时, 请使用命令 `git flow bugfix start [组件名]` , 开发结束之后需要使用命令 `git flow bugfix finish [组件名]` 该命令将会自动进行分支合并以及删除当前组件分支
05. 强制使用已配置脚本命令 `yarn new:comp` 来创建一个组件以及组件文档(已包含默认模板, 在此基础上修改即可), 使用命令 `yarn del:comp` 来删除不需要的组件
06. 使用 `git cz` 替换 `git commit -m` , commit 之前请详细阅读 [git commit 规范指南](https://vxhly.github.io/archives/fdd4f330.html)
07. 组件发布前, 请确保当前版本的所有包含组件已经全部开发完毕并且已经合并至 develop 分支

    - 在 develop 分支中使用 `git flow release start [版本号]` 创建一个发布版本分支
    - 修改 `package.json` 中的 `version` 字段为当前的版本号
    - 执行 `npm run docs:build` 编译 vuepress 文档
    - 执行 `npm run build:lib` 编译 组件库
    - 执行 `npm run changelog` 生成当前版本的 CHANGELOHG
    - 以上操作可使用命令 `npm run build` 来代替 `npm run docs:build` 、 `npm run build:lib` 、 `npm run changelog` 
    - 进行 commit 操作
    - 使用 `git flow release finish [版本号]` 自动进行分支合并以及删除当前分支, 期间将会询问 tag 的 commit 信息(务必认真填写)
    - 以上操作之后将会把分支自动合并至 master 和 develop 分支



08. 分支永远只能有两个 master 和 develop 分支, 其他分支应该在开发完毕之后及时的进行合并、删除操作
09. 发布前请确保 tag 已经打包成功, 当前版本的功能已经全部完成, 之后便可以直接运行 `npm publish --registry <私有库地址>` , 如果组件库目录下有配置 `.npmrc` 则直接使用 `npm publish` 
10. 下载组件库 `yarn add <组件库名> --registry <私有库地址>` , 如果组件库目录下有配置 `.npmrc` 则直接使用 `yarn add <组件库名> ` 

