# juejin-book-downloader

<div align="center">

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/h7ml/juejin-book-downloader/lint.yml?branch=main)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/h7ml/juejin-book-downloader?author=h7ml)
![GitHub top language](https://img.shields.io/github/languages/top/h7ml/juejin-book-downloader?author=h7ml)
![GitHub](https://img.shields.io/github/license/h7ml/juejin-book-downloader?author=h7ml)
![GitHub stars](https://img.shields.io/github/stars/h7ml/juejin-book-downloader?style=social)
</div>

## 📚 目录

- [juejin-book-downloader](#juejin-book-downloader)
  - [📚 目录](#-目录)
  - [🚀 项目简介](#-项目简介)
  - [✨ 功能特点](#-功能特点)
  - [📥 安装说明](#-安装说明)
    - [方法 1：从 GitHub Release 安装（推荐）](#方法-1从-github-release-安装推荐)
    - [方法 2：从源代码构建](#方法-2从源代码构建)
  - [🔄 更新扩展程序](#-更新扩展程序)
  - [🖱️ 使用方法](#️-使用方法)
  - [🛠️ 技术栈](#️-技术栈)
  - [📁 项目结构](#-项目结构)
  - [🤝 贡献指南](#-贡献指南)
  - [📄 许可证](#-许可证)
  - [📞 联系方式](#-联系方式)
  - [⚠️ 免责声明](#️-免责声明)

## 🚀 项目简介

掘金小册下载器是一个便捷的浏览器扩展，专为掘金平台用户设计。它允许用户轻松下载已购买的掘金小册内容，支持下载整本小册或单个章节，并将内容保存为多种格式，方便离线阅读和学习。

## ✨ 功能特点

- 在小册页面智能添加下载按钮
- 支持下载整本小册
- 支持下载单个章节
- 支持多种下载格式：HTML、Markdown、PDF 和 JSON
- 友好的用户界面和交互体验
- 支持离线阅读，方便随时学习

## 📥 安装说明

### 方法 1：从 GitHub Release 安装（推荐）

1. 访问项目的 [Releases 页面](https://github.com/h7ml/juejin-book-downloader/releases)。
2. 下载最新版本的 `juejin-book-downloader.zip` 文件。
3. 解压下载的 zip 文件。
4. 在 Chrome 浏览器中，进入 `chrome://extensions/`。
5. 开启右上角的"开发者模式"。
6. 点击左上角的"加载已解压的扩展程序"。
7. 选择刚才解压的文件夹。
8. 扩展程序现在应该已经安装完成并在浏览器中激活。

### 方法 2：从源代码构建

<details>
<summary>点击展开详细步骤</summary>

1. 克隆仓库到本地：

   ```
   git clone https://github.com/h7ml/juejin-book-downloader.git
   ```
2. 进入项目目录：

   ```
   cd juejin-book-downloader
   ```
3. 安装依赖：

   ```
   npm install
   ```
4. 构建项目：

   ```
   npm run build
   ```
5. 在浏览器中加载扩展：

   - 打开 Chrome 浏览器，进入 `chrome://extensions/`
   - 开启"开发者模式"
   - 点击"加载已解压的扩展程序"
   - 选择项目的 `dist` 目录

</details>

## 🔄 更新扩展程序

<details>
<summary>点击展开更新步骤</summary>

1. 下载最新的 Release 版本。
2. 解压新版本的 zip 文件。
3. 在 Chrome 的扩展管理页面 (`chrome://extensions/`) 中找到"掘金小册下载器"。
4. 点击"删除"以卸载旧版本。
5. 按照上述安装步骤重新安装新版本。

注意：更新过程中您的设置和数据可能会丢失。

</details>

## 🖱️ 使用方法

1. 安装扩展后，访问掘金小册页面。
2. 在小册首页或章节页面，您会看到一个新的下载按钮。
3. 点击下载按钮，选择所需的下载格式（HTML、Markdown、PDF 或 JSON）。
4. 确认下载，内容将被保存为所选格式的文件。

## 🛠️ 技术栈

- React：用于构建用户界面
- TypeScript：提供类型安全和更好的开发体验
- Ant Design：UI 组件库，提供美观的界面元素
- Chrome Extension API：与浏览器交互，实现扩展功能
- file-saver：用于保存下载的文件
- html-to-pdf：用于生成 PDF 文件
- markdown-it：用于处理 Markdown 格式

## 📁 项目结构

```
src/
├── content-scripts/
│ ├── juejin.tsx # 注入到掘金页面的主要脚本
│ └── utils/
│   ├── sectionDownloader.ts # 处理章节下载的工具函数
│   ├── htmlConverter.ts # HTML 转换工具
│   ├── pdfGenerator.ts # PDF 生成工具
│   └── jsonFormatter.ts # JSON 格式化工具
├── background/
│ └── index.ts # 背景脚本，处理扩展的后台逻辑
└── popup/
  └── index.tsx # 扩展的弹出窗口界面
```

## 🤝 贡献指南

我们欢迎并感谢任何形式的贡献！如果您想为项目做出贡献，请遵循以下步骤：

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

在提交 Pull Request 之前，请确保您的代码符合我们的编码规范，并且所有测试都已通过。

## 📄 许可证

本项目采用 MIT 许可证。详情请见 [LICENSE](LICENSE) 文件。

## 📞 联系方式

如有任何问题、建议或反馈，请通过以下方式联系我们：

- 项目 Issues: [https://github.com/h7ml/juejin-book-downloader/issues](https://github.com/h7ml/juejin-book-downloader/issues)
- 邮箱: h7ml@qq.com

## ⚠️ 免责声明

本扩展程序仅供学习和研究使用。请尊重作者的知识产权，不要将下载的内容用于商业用途或非法传播。使用本扩展程序时，请遵守掘金平台的用户协议和相关法律法规。
