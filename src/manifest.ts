import { defineManifest } from '@webx-kit/rsbuild-plugin/manifest';
import * as fs from 'fs';

const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf8"));

export default defineManifest(() => ({
  manifest_version: 3,
  name: '掘金小册下载助手-h7ml',
  version: packageJson.version,
  author: {
    email: 'h7ml@qq.com'
  },
  icons: {
    512: 'public/logo.png',
  },
  action: {
    default_popup: 'popup.html',
  },
  options_ui: {
    page: 'options.html',
    open_in_tab: true,
  },
  host_permissions: ["https://juejin.cn/*"],
  web_accessible_resources: [
    {
      matches: ['<all_urls>'],
      resources: ['static/svg/*'],
    },
  ],
}));
