import { Table, Button, Space, message } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { BookletRecord } from './index.d';
import { getBookletList } from './api/index';

export const App = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<BookletRecord[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookie, setCookie] = useState('');

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const url = tabs[0].url;
      chrome.cookies.getAll({ url: url }, function (cookies) {
        let cookiesText = '';
        for (let cookie of cookies) {
          cookiesText += `${cookie.name}=${cookie.value}; `;
        }
        setCookie(cookiesText);
        setIsLoggedIn(cookiesText.includes('sessionid_ss'));

        if (cookiesText.includes('sessionid_ss')) {
          fetchBookletList();
        }
      });
    });
  }, []);

  const fetchBookletList = async () => {
    setLoading(true);
    try {
      const response = await getBookletList();
      if (response.err_no === 0 && response.data) {
        setData(response.data.data);
      } else {
        throw new Error(response.err_msg || '获取数据失败');
      }
    } catch (error: any) {
      console.log('🚀 ~ fetchBookletList ~ error:', error);
      console.error('获取小册列表失败:', error);
      message.error(`获取小册列表失败: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: '小册名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: BookletRecord) => (
        <Space>
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            size="small"
            onClick={() => {
              message.success('开始下载');
            }}
          >
            下载
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="min-w-[600px] min-h-[400px] p-4">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-slate-800">掘金小册下载器</h1>
        <Button
          type="primary"
          loading={loading}
          onClick={fetchBookletList}
          disabled={!isLoggedIn}
        >
          {isLoggedIn ? '刷新列表' : '未登录'}
        </Button>
      </div>
      <div className="mb-4 p-4 bg-gray-100 rounded">
        <p className="text-sm text-gray-600">当前Cookie:</p>
        <p className="text-sm break-all">{cookie}</p>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        size="small"
        pagination={{
          pageSize: 10,
          showSizeChanger: false,
        }}
        className="bg-white rounded-lg shadow-sm"
      />
    </div>
  );
};
