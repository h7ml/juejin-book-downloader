import { marked } from 'marked';
import html2pdf from 'html2pdf.js';

/**
 * 将Markdown文本转换为HTML
 * @param markdown Markdown格式的文本
 * @returns 转换后的HTML字符串
 */
export const convertToHtml = async (markdown: string): Promise<string> => {
    return marked(markdown);
};

/**
 * 将Markdown文本转换为PDF
 * @param markdown Markdown格式的文本
 * @returns 包含PDF内容的Blob对象
 */
export const convertToPdf = async (markdown: string): Promise<Blob> => {
    // 首先将Markdown转换为HTML
    const html = await convertToHtml(markdown);
    
    // 创建一个临时的div元素来容纳HTML内容
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = `
        <style>
            /* ... 保持原有的样式 ... */
        </style>
        ${html}
    `;
    document.body.appendChild(tempDiv);

    // 配置PDF生成选项
    const opt = {
        margin: 10,
        filename: 'document.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    try {
        // 使用html2pdf库生成PDF
        const pdfBlob = await html2pdf().from(tempDiv).set(opt).outputPdf('blob');
        return pdfBlob;
    } finally {
        // 清理：移除临时创建的div元素
        document.body.removeChild(tempDiv);
    }
};
