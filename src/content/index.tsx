import React from 'react';
import ReactDOM from 'react-dom/client';
import { Popconfirm, Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import DownloadModal from './components/DownloadModal';

import './index.css';

const showConfirm = () => {
    const downloadEle = document.createElement('div');
    document.body.appendChild(downloadEle);
    ReactDOM.createRoot(downloadEle).render(
        <React.StrictMode>
            <DownloadModal />
        </React.StrictMode>
    );
};

const injectDownloadBtn = () => {
    const buyEle = document.querySelector('.is-buy')!;

    const downloadEle = document.createElement('div');
    downloadEle.id = 'download';

    ReactDOM.createRoot(downloadEle).render(
        <React.StrictMode>
            <Popconfirm
                title='是否下载此小册'
                onConfirm={showConfirm}
                okText='确认'
                cancelText='取消'
            >
                <Button 
                    type="primary" 
                    icon={<DownloadOutlined />}
                    className="
                        bg-blue-500 hover:bg-blue-600 active:bg-blue-700
                        border-blue-500 hover:border-blue-600 active:border-blue-700
                        text-white font-semibold
                        transition-all duration-300 ease-in-out
                        shadow-md hover:shadow-lg
                        ml-4
                    "
                >
                    下载小册
                </Button>
            </Popconfirm>
        </React.StrictMode>
    );
    buyEle.appendChild(downloadEle);
};

const callback: MutationCallback = (mutationsList, observer) => {
    const buyEle = document.querySelector('.is-buy');

    if (document.querySelector('#download')) {
        return;
    }

    if (buyEle) {
        injectDownloadBtn();
    }
};

const observer = new MutationObserver(callback);
observer.observe(document, { childList: true, subtree: true });
