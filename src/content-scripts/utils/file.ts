import { replaceFileName } from '.';

/**
 * 保存文件到本地
 * @param index 文件索引
 * @param name 文件名
 * @param content 文件内容
 */
export const saveFile = async (index: number, name: string, content: string) => {
  // 创建Blob对象
  const blob = new Blob([content], { type: 'text/plain' });
  
  // 创建临时下载链接
  const a = document.createElement('a');
  a.href = window.URL.createObjectURL(blob);
  
  // 设置文件名
  a.download = replaceFileName(`${index}、${name}.md`);
  
  // 添加链接到DOM并触发点击
  document.body.appendChild(a);
  a.click();
  
  // 清理临时DOM元素
  document.body.removeChild(a);
};
