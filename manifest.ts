import fs from "fs";

const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf8"));

// 创建 Manifest 配置
const manifest: chrome.runtime.ManifestV3 = {
  manifest_version: 3,
  name: '掘金小册下载助手dext7r',
  version: packageJson.version,
  icons: {
    "16": "images/icon@16.png",
    "32": "images/icon@32.png",
    "48": "images/icon@48.png",
    "128": "images/icon@128.png",
  },
  author: {
    email: 'h7ml@qq.com'
  },
  homepage_url: "https://github.com/h7ml",
  permissions: ["storage", "scripting"],
  host_permissions: ["https://juejin.cn/*"],
  content_scripts: [
    {
      matches: ["https://juejin.cn/*"],
      js: ["./src/content/index.tsx"],
      css: ["./src/content/index.css"],
    },
  ],
  offline_enabled: true,
  action: {
    default_popup: "./src/popup/index.html",
    default_icon: {
      "16": "images/icon@16.png",
      "32": "images/icon@32.png",
      "48": "images/icon@48.png",
      "128": "images/icon@128.png",
    },
  },
  description: packageJson.description || "",
  background: {
    service_worker: "./src/background/index.ts",
    type: "module",
  },
  devtools_page: "./src/devtools/index.html",
};

// 导出 manifest 配置
export default manifest;
