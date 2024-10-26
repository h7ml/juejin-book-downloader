/**
 * 获取小册章节列表
 * @param bookID 小册ID
 * @returns 章节列表
 */
export const getSectionList = async (bookID: string) => {
  const response = await fetch('https://api.juejin.cn/booklet_api/v1/booklet/get', {
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ booklet_id: bookID }),
    method: 'POST',
  });
  const { data } = await response.json();
  return data.sections;
};

/**
 * 获取章节Markdown内容
 * @param sectionID 章节ID
 * @returns 章节内容，包括标题和Markdown文本
 */
export const getMarkdownContent = async (sectionID: string) => {
  const response = await fetch('https://api.juejin.cn/booklet_api/v1/section/get', {
    headers: {
      'content-type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ section_id: sectionID }),
    method: 'POST',
  });
  const { data } = await response.json();
  return data.section;
};
