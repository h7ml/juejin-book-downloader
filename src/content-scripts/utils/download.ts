import { message } from 'antd';
import { getSectionList, getMarkdownContent } from '../api/juejin';
import { saveFile } from './file';
/**
 * 处理下载操作
 * 根据当前URL判断是下载单个章节还是整个小册
 */
export const handleDownload = async () => {
  // 匹配URL中的章节ID
  const match = window.location.href.match(/\/book\/(\d+)\/section\/(\d+)/);
  if (match) {
    // 下载单个章节
    const [, , sectionID] = match;
    try {
      // 获取章节内容
      const { title, markdown_show } = await getMarkdownContent(sectionID);
      // 保存章节文件
      await saveFile(1, title, markdown_show);
      message.success('章节下载成功');
    } catch (error) {
      console.error('下载失败:', error);
      message.error('章节下载失败');
    }
  } else {
    // 下载整个小册
    const bookID = window.location.href.split('/').pop();
    if (bookID) {
      try {
        // 获取小册所有章节
        const sections = await getSectionList(bookID);
        // 遍历下载每个章节
        for (let i = 0; i < sections.length; i++) {
          const { title, markdown_show } = await getMarkdownContent(sections[i].section_id);
          await saveFile(i + 1, title, markdown_show);
        }
        message.success('小册下载完成');
      } catch (error) {
        console.error('下载失败:', error);
        message.error('小册下载失败');
      }
    }
  }
};