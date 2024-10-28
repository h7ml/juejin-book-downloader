// 导入必要的模块和样式
import { createShadowRootUI } from '@webx-kit/runtime/content-scripts';
import { createRoot } from 'react-dom/client';
import { App } from './juejin';
import '../global.less';

// 创建影子DOM UI
createShadowRootUI({
  styles: chrome.runtime.getURL('static/css/content-script.css'),
  render({ root }) {
    // 渲染React应用
    createRoot(root).render(<App />);
  },
});
