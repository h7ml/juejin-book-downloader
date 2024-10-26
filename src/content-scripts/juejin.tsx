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

  /**
   * 显示确认对话框
   */
  const showConfirm = () => {
    const downloadEle = document.createElement('div');
    document.body.appendChild(downloadEle);
    ReactDOM.createRoot(downloadEle).render(
      <React.StrictMode>
        <DownloadModal onConfirm={handleDownload} />
      </React.StrictMode>
    );
  };

  /**
   * 注入下载按钮
   */
  const injectDownloadBtn = () => {
    const buyEle = document.querySelector('.is-buy');
    const injectBtn = document.querySelector('.other');
    const sectionEle = document.querySelector('.book-content__header> .title');
    
    // 如果已经存在下载按钮，则直接返回
    if (document.querySelector('#download')) return;
    
    // 判断是否为单章节页面并提取 ID
    const urlMatch = window.location.href.match(/\/book\/(\d+)\/section\/(\d+)/);
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
    ReactDOM.createRoot(downloadEle).render(
      <React.StrictMode>
        <Popconfirm
          title={isSectionPage ? '是否下载本章' : '是否下载此小册'}
          onConfirm={isSectionPage ? handleDownload : showConfirm}
          okText='确认'
          cancelText='取消'
        >
          <Button
            type={isSectionPage ? 'default' : 'primary'}
            icon={<DownloadOutlined />}
            size='large'
            style={isSectionPage ? { fontWeight: 'bold', fontSize: '16px' } : {}}
          >
            {isSectionPage ? '下载本章' : '下载小册'}
          </Button>
        </Popconfirm>
      </React.StrictMode>
    );
    
    // 情况1：在小册首页插入下载按钮
    if (buyEle && injectBtn) {
      injectBtn.appendChild(downloadEle);
      setIsInjected(true);
      return;
    }
    
    // 情况2：在单章节页面插入下载按钮
    if (isSectionPage) {
      sectionEle && sectionEle.appendChild(downloadEle);
      setIsInjected(true);
      return;
    }
  };

  /**
   * 观察DOM变化并注入按钮
   * @returns {MutationObserver} DOM观察器
   */
  const observeAndInject = () => {
    if (isInjected) return;

    const observer = new MutationObserver(() => {
      if (!document.querySelector('#download')) {
        injectDownloadBtn();
      }
    });
    observer.observe(document, { childList: true, subtree: true });
    return observer;
  };

  /**
   * 检查URL变化
   */
  const checkUrlChange = () => {
    if (window.location.href !== currentUrl) {
      setCurrentUrl(window.location.href);
      setIsInjected(false);
      injectDownloadBtn();
    }
  };

  // 初始化函数
  useEffect(() => {
    const observer = observeAndInject();
    setCurrentUrl(window.location.href);

    // 添加URL变化检测
    window.addEventListener('popstate', checkUrlChange);
    const intervalId = setInterval(checkUrlChange, 1000);

    // 清理函数
    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener('popstate', checkUrlChange);
      clearInterval(intervalId);
    };
  }, [isInjected, currentUrl]);

  return null;
};
