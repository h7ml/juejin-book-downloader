// 导入必要的模块和样式
import { createShadowRootUI } from '@webx-kit/runtime/content-scripts';
import { createRoot } from 'react-dom/client';
import { App } from './juejin';
import '../global.less';
import packageJson from '../../package.json';

// 创建影子DOM UI
createShadowRootUI({
  render({ root }) {
    // 定义控制台输出的样式
    const styles = {
      title: 'font-size: 14px; font-weight: bold; color: #3498db;',
      label: 'color: #2ecc71; font-weight: bold;',
      value: 'color: #e74c3c;',
      link: 'color: #3498db; text-decoration: underline; cursor: pointer;',
      tip: 'font-style: italic; color: #7f8c8d;'
    };

    // 在控制台输出扩展信息
    console.log(`%c掘金小册下载助手 v${packageJson.version} 已加载`, styles.title);
    console.group('%c扩展信息', styles.title);
    console.log(`%c版本：%c${packageJson.version}`, styles.label, styles.value);
    console.log(`%c作者：%c${typeof packageJson.author === 'object' ? packageJson.author.name : packageJson.author}`, styles.label, styles.value);
    console.log(`%c邮箱：%c${typeof packageJson.author === 'object' ? packageJson.author.email : '未提供'}`, styles.label, styles.link);
    console.log(`%cGitHub：%c${typeof packageJson.author === 'object' && packageJson.author.url ? packageJson.author.url.replace('https://github.com/', '') : '未提供'}`, styles.label, styles.link);
    console.log(`%c名称：%c${packageJson.name}`, styles.label, styles.value);
    console.log(`%c反馈：%chttps://github.com/h7ml/juejinBooksDownloader/issues`, styles.label, styles.link);
    console.log(`%c下载：%chttps://github.com/h7ml/juejinBooksDownloader/releases`, styles.label, styles.link);
    console.groupEnd();

    // 渲染React应用
    createRoot(root).render(<App />);
  },
});