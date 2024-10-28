import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Popconfirm, Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import DownloadModal from './components/DownloadModal';
import { handleDownload } from './utils/';

/**
 * 主应用组件
 */
export const App: React.FC = () => {
  // 是否已注入下载按钮的状态
  const [isInjected, setIsInjected] = useState(false);
  // 当前页面URL
  const [currentUrl, setCurrentUrl] = useState('');
  // 是否已加载tailwindcss
  const [isTailwindLoaded, setIsTailwindLoaded] = useState(false);

  /**
   * 显示确认对话框
   */
  const showConfirm = async () => {
    const downloadEle = document.createElement('div');
    document.body.appendChild(downloadEle);
    await ReactDOM.createRoot(downloadEle).render(
      <React.StrictMode>
        <DownloadModal onConfirm={handleDownload} />
      </React.StrictMode>
    );
  };

  /**
   * 加载tailwindcss
   */
  const loadTailwindCSS = async () => {
    if (
      !isTailwindLoaded &&
      !document.querySelector('script[src*="tailwindcss"]')
    ) {
      const linkEl = document.createElement('link');
      linkEl.rel = 'stylesheet';
      linkEl.href = chrome.runtime.getURL('static/css/content-script.css');
      await document.head.appendChild(linkEl);

      // 加载 tailwind CDN
      const scriptEl = document.createElement('script');
      scriptEl.src = 'https://cdn.tailwindcss.com';
      await document.head.appendChild(scriptEl);

      setIsTailwindLoaded(true);
    }
  };

  /**
   * 注入下载按钮
   */
  const injectDownloadBtn = async () => {
    // 如果已经存在下载按钮，则直接返回
    if (document.querySelector('#download')) return;

    const buyEle = document.querySelector('.is-buy');
    const injectBtn = document.querySelector('.other');
    const sectionEle = document.querySelector('.book-content__header> .title');

    // 判断是否为单章节页面并提取 ID
    const urlMatch = window.location.href.match(
      /\/book\/(\d+)\/section\/(\d+)/
    );
    const isSectionPage = !!urlMatch;
    const bookId = urlMatch ? urlMatch[1] : null;
    const sectionId = urlMatch ? urlMatch[2] : null;

    // 创建下载按钮元素
    const downloadEle = document.createElement('div');
    downloadEle.id = 'download';
    downloadEle.style.paddingLeft = '10px';
    if (isSectionPage) {
      downloadEle.style.display = 'contents';
    }

    // 渲染下载按钮内容
    await ReactDOM.createRoot(downloadEle).render(
      <React.StrictMode>
        <Popconfirm
          title={isSectionPage ? '是否下载本章' : '是否下载此小册'}
          onConfirm={isSectionPage ? handleDownload : showConfirm}
          okText="确认"
          cancelText="取消"
        >
          <Button
            type={isSectionPage ? 'default' : 'primary'}
            icon={<DownloadOutlined />}
            size="large"
            style={
              isSectionPage ? { fontWeight: 'bold', fontSize: '16px' } : {}
            }
          >
            {isSectionPage ? '下载本章' : '下载小册'}
          </Button>
        </Popconfirm>
      </React.StrictMode>
    );

    // 情况1：在小册首页插入下载按钮
    if (buyEle && injectBtn) {
      await injectBtn.appendChild(downloadEle);
      setIsInjected(true);
      return;
    }

    // 情况2：在单章节页面插入下载按钮
    if (isSectionPage && sectionEle) {
      await sectionEle.appendChild(downloadEle);
      setIsInjected(true);
      return;
    }
  };

  /**
   * 观察DOM变化并注入按钮
   * @returns {MutationObserver} DOM观察器
   */
  const observeAndInject = async () => {
    if (isInjected) return;

    const observer = new MutationObserver(async (mutations) => {
      // 避免重复注入
      if (!isInjected && !document.querySelector('#download')) {
        await loadTailwindCSS();
        await injectDownloadBtn();
      }
    });
    observer.observe(document, { childList: true, subtree: true });
    return observer;
  };

  /**
   * 检查URL变化
   */
  const checkUrlChange = async () => {
    const newUrl = window.location.href;
    if (newUrl !== currentUrl) {
      setCurrentUrl(newUrl);
      setIsInjected(false);
      // 移除已存在的下载按钮
      const existingBtn = document.querySelector('#download');
      if (existingBtn) {
        existingBtn.remove();
      }
      await loadTailwindCSS();
      await injectDownloadBtn();
    }
  };

  // 初始化函数
  useEffect(() => {
    let observer: MutationObserver | null = null;
    let intervalId: NodeJS.Timeout;

    const init = async () => {
      await loadTailwindCSS();
      observer = (await observeAndInject()) || null;
      setCurrentUrl(window.location.href);

      // 添加URL变化检测
      window.addEventListener('popstate', checkUrlChange);
      intervalId = setInterval(checkUrlChange, 1000);
    };

    init();

    // 清理函数
    return () => {
      if (observer) {
        observer.disconnect();
      }
      window.removeEventListener('popstate', checkUrlChange);
      clearInterval(intervalId);
    };
  }, []); // 移除依赖数组中的isInjected和currentUrl

  return null;
};
