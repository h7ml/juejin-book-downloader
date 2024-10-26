import { useRef, useState, useEffect } from 'react';
import { Alert, Button, Collapse, ConfigProvider, Modal, Select, message, Typography, Space, Divider } from 'antd';
import { useMount } from 'ahooks';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

import type { SectionType } from '../api.ts';
import { getBookInfo, getSectionInfo } from '../api.ts';
import { replaceFileName, sleep, convertToHtml, convertToPdf } from '../utils.ts';
import { saveToCache, getFromCache, clearCache, isCacheExpired, CachedSection } from '../utils/cache.ts';

const { Title, Text } = Typography;

const DownloadModal = () => {
    const [open, setOpen] = useState(true);
    const [status, setStatus] = useState('准备就绪，可以开始下载');
    const [bookName, setBookName] = useState('');
    const [format, setFormat] = useState('markdown');
    const [isDownloading, setIsDownloading] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [sections, setSections] = useState<CachedSection[]>([]);
    const bookId = window.location.pathname.split('/').at(-1)!;
    const [selectedSection, setSelectedSection] = useState<CachedSection | null>(null);

    const processContent = async (content: string, format: string): Promise<{ content: string | Blob, extension: string }> => {
        switch (format) {
            case 'html': return { content: await convertToHtml(content), extension: 'html' };
            case 'pdf': return { content: await convertToPdf(content), extension: 'pdf' };
            case 'json': return { content: JSON.stringify(content, null, 2), extension: 'json' };
            default: return { content, extension: 'md' };
        }
    };

    const saveContent = async (content: string | Blob, fileName: string, extension: string) => {
        const blob = content instanceof Blob ? content : new Blob([content], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, `${fileName}.${extension}`);
    };

    const saveBook = async () => {
        setIsDownloading(true);
        setStatus('正在下载全部章节，请稍候...');
        const zip = JSZip();
        const book = zip.folder(bookName);
        if (!book) {
            setStatus('压缩文件失败');
            setIsDownloading(false);
            return;
        }
        for (const section of sections) {
            const { content, extension } = await processContent(section.markdown_show, format);
            book.file(`${replaceFileName(section.title)}.${extension}`, content);
        }
        const content = await zip.generateAsync({ type: 'blob' });
        saveAs(content, `${bookName}.zip`);
        setIsDownloading(false);
        setStatus('下载完成');
    };

    const saveSingleSection = async (section: CachedSection) => {
        setIsDownloading(true);
        setStatus(`正在下载章节: ${section.title}`);
        const { content, extension } = await processContent(section.markdown_show, format);
        await saveContent(content, replaceFileName(section.title), extension);
        setIsDownloading(false);
        setStatus(`章节 ${section.title} 下载完成`);
    };
    
    const fetchSections = async (forceRefetch = false) => {
        setIsFetching(true);
        setStatus('正在获取章节数据，请稍候...');
        let cachedSections = getFromCache(bookId);
        
        if (!forceRefetch && cachedSections && !isCacheExpired(cachedSections[0].cachedAt)) {
            setSections(cachedSections);
            setIsFetching(false);
            setStatus('已加载缓存的章节数据');
            message.success('已加载缓存的章节数据');
            return;
        }

        const bookInfo = await getBookInfo(bookId);
        if (bookInfo.err_no !== 0) {
            setStatus('获取目录错误');
            setIsFetching(false);
            return;
        }
        setBookName(bookInfo.data.booklet.base_info.title);
        const finishSections = bookInfo.data.sections.filter(section => section.status === 1);

        setStatus(`获取目录成功：完结 ${finishSections.length} 章`);

        const updatedSections: CachedSection[] = [];
        for (let index = 0; index < finishSections.length; index++) {
            const section = finishSections[index];
            await sleep();
            const sectionInfo = await getSectionInfo(section.section_id);
            if (sectionInfo.err_no !== 0) {
                setStatus(`第 ${index + 1} 章下载失败，下载终止`);
                setIsFetching(false);
                return;
            }
            const sectionTitle = sectionInfo.data.section.title;
            updatedSections.push({
                ...section,
                markdown_show: sectionInfo.data.section.markdown_show,
                title: `${index + 1}. ${sectionTitle}`,
                cachedAt: Date.now()
            });
            setStatus(`第 ${index + 1} 章下载完成：${sectionTitle}`);
        }
        setSections(updatedSections);
        saveToCache(bookId, updatedSections);
        setIsFetching(false);
        setStatus('数据准备完成，可以开始下载');
    };

    useMount(() => fetchSections());

    return (
        <ConfigProvider theme={{ components: { Modal: { padding: 24 } } }}>
            <Modal
                title={
                    <Title level={4} className="mb-0">
                        下载{bookName ? `《${bookName}》` : ''}小册
                    </Title>
                }
                centered open={open} okText={false} zIndex={2000}
                maskClosable={false} footer={null} onCancel={() => setOpen(false)} width={700}
            >
                <Space direction="vertical" size="middle" className="w-full">
                    <Text type="secondary" className="text-center block">
                        本项目只做个人学习研究之用，不得用于商业用途
                    </Text>

                    {sections.length > 0 && (
                        <div className="border border-gray-200 rounded-md p-4">
                            <Title level={5} className="mb-2">章节列表</Title>
                            <div className="max-h-48 overflow-y-auto">
                                {sections.map((section) => (
                                    <div 
                                        key={section.section_id} 
                                        className={`py-1 px-2 rounded cursor-pointer ${
                                            selectedSection?.section_id === section.section_id 
                                            ? 'bg-blue-100 text-blue-700' 
                                            : 'hover:bg-gray-100'
                                        }`}
                                        onClick={() => setSelectedSection(section)}
                                    >
                                        <Text>{section.title}</Text>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <Space className="w-full justify-between">
                        <Text>选择保存格式:</Text>
                        <Select
                            defaultValue="markdown" style={{ width: 120 }} onChange={setFormat}
                            options={[
                                { value: 'markdown', label: 'Markdown' },
                                { value: 'html', label: 'HTML' },
                                { value: 'pdf', label: 'PDF' },
                                { value: 'json', label: 'JSON' },
                            ]}
                        />
                    </Space>

                    <Alert message={status} type="info" showIcon />

                    <Space direction="vertical" className="w-full">
                        <Button 
                            onClick={() => selectedSection && saveSingleSection(selectedSection)} 
                            disabled={isDownloading || isFetching || !selectedSection}
                            loading={isDownloading && !!selectedSection}
                            className={`
                                w-full h-10 rounded-md font-semibold text-white
                                transition-all duration-300 ease-in-out
                                ${selectedSection
                                    ? 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700'
                                    : 'bg-gray-400 cursor-not-allowed'
                                }
                                disabled:opacity-50 disabled:cursor-not-allowed
                            `}
                        >
                            {isDownloading && selectedSection ? '正在下载...' : '下载选定章节'}
                        </Button>

                        <Button 
                            onClick={saveBook} 
                            disabled={isDownloading || isFetching || sections.length === 0}
                            loading={isDownloading && !selectedSection}
                            className={`
                                w-full h-10 rounded-md font-semibold text-white
                                transition-all duration-300 ease-in-out
                                ${sections.length > 0
                                    ? 'bg-green-500 hover:bg-green-600 active:bg-green-700'
                                    : 'bg-gray-400 cursor-not-allowed'
                                }
                                disabled:opacity-50 disabled:cursor-not-allowed
                            `}
                        >
                            {isDownloading && !selectedSection ? '正在下载...' : '下载全部章节'}
                        </Button>

                        <Button 
                            onClick={() => fetchSections(true)} 
                            disabled={isDownloading || isFetching}
                            loading={isFetching}
                            className={`
                                w-full h-10 rounded-md font-semibold text-white
                                transition-all duration-300 ease-in-out
                                bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700
                                disabled:opacity-50 disabled:cursor-not-allowed
                            `}
                        >
                            {isFetching ? '正在获取章节...' : '重新获取章节'}
                        </Button>
                    </Space>
                </Space>
            </Modal>
        </ConfigProvider>
    );
};

export default DownloadModal;
