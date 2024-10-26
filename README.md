# 掘金小册下载器 (Juejin Book Downloader)

![License](https://img.shields.io/github/license/h7ml/juejin-book-downloader)
![GitHub stars](https://img.shields.io/github/stars/h7ml/juejin-book-downloader?style=social)

一个用于下载掘金小册的Chrome扩展工具。

A Chrome extension tool for downloading books from Juejin.

## 功能特点

- 支持下载已购买的掘金小册
- 多种保存格式选择:
  - PDF
  - Markdown
  - HTML
  - JSON
- 简单易用的用户界面
- 支持批量下载

## 安装

1. 克隆此仓库到本地:
   ```
   git clone https://github.com/h7ml/juejin-book-downloader.git
   ```

2. 进入项目目录:
   ```
   cd juejin-book-downloader
   ```

3. 安装依赖:
   ```
   npm install
   ```

4. 构建项目:
   ```
   npm run build
   ```

5. 在Chrome浏览器中加载扩展:
   - 打开Chrome浏览器，进入`chrome://extensions/`
   - 开启"开发者模式"
   - 点击"加载已解压的扩展程序"
   - 选择项目的`dist`目录

## 使用方法

1. 登录掘金网站 (https://juejin.cn/)
2. 打开您已购买的小册页面
3. 点击扩展图标，打开下载界面
4. 选择您想要的保存格式（PDF、Markdown、HTML或JSON）
5. 点击"开始下载"按钮
6. 下载完成后，您可以在指定位置找到保存的文件

## 开发

- 运行开发服务器: `npm run dev`
- 构建项目: `npm run build`
- 预览构建结果: `npm run preview`

## 贡献

欢迎提交问题和合并请求。对于重大更改，请先打开一个问题讨论您想要更改的内容。

## 许可证

本项目采用 MIT 许可证。详情请见 [LICENSE](LICENSE) 文件。

## 作者

- **h7ml** - [GitHub](https://github.com/h7ml)

## 致谢

感谢所有为这个项目做出贡献的开发者。

---

如果您觉得这个项目有用，请给它一个星标 ⭐️
