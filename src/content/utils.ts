/** 使用 Unicode 字符替换文件名中的特殊字符 */
export const replaceFileName = (fileName: string) => {
    // https://docs.microsoft.com/zh-cn/windows/desktop/FileIO/naming-a-file#naming_conventions
    const replaceMap = new Map([
        ['<', '\uFE64'],
        ['>', '\uFE65'],
        [':', '\uA789'],
        ['/', '\u2215'],
        ['\\', '\uFE68'],
        ['|', '\u2758'],
        ['?', '\uFE16'],
        ['*', '\uFE61'],
    ]);

    const pattern = [...replaceMap.keys()].map(key => '\\' + key).join('|');

    const regex = new RegExp(pattern, 'g');

    return fileName.replace(regex, match => replaceMap.get(match)!);
};

export const sleep = async (timeout = 1000) => {
    return new Promise<void>(resolve => {
        setTimeout(() => {
            resolve();
        }, timeout);
    });
};

import { marked } from 'marked';
import html2pdf from 'html2pdf.js';

export const convertToHtml = async (markdown: string): Promise<string> => {
    return marked(markdown);
};

export const convertToPdf = async (markdown: string): Promise<Blob> => {
    const html = await convertToHtml(markdown);
    
    // 创建一个临时的 div 元素来容纳 HTML 内容
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = `
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
            }
            h1, h2, h3, h4, h5, h6 {
                margin-top: 24px;
                margin-bottom: 16px;
                font-weight: 600;
                line-height: 1.25;
            }
            h1 { font-size: 2em; }
            h2 { font-size: 1.5em; }
            h3 { font-size: 1.25em; }
            p, ul, ol { margin-bottom: 16px; }
            code {
                background-color: #f6f8fa;
                padding: 0.2em 0.4em;
                border-radius: 3px;
                font-family: monospace;
            }
            pre {
                background-color: #f6f8fa;
                padding: 16px;
                overflow-x: auto;
                font-family: monospace;
                line-height: 1.45;
                border-radius: 3px;
            }
            img {
                max-width: 100%;
                height: auto;
            }
            blockquote {
                padding: 0 1em;
                color: #6a737d;
                border-left: 0.25em solid #dfe2e5;
                margin: 0 0 16px 0;
            }
        </style>
        ${html}
    `;
    document.body.appendChild(tempDiv);

    // 配置 html2pdf 选项
    const opt = {
        margin: 10,
        filename: 'document.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    try {
        // 使用 html2pdf 生成 PDF
        const pdfBlob = await html2pdf().from(tempDiv).set(opt).outputPdf('blob');
        return pdfBlob;
    } finally {
        // 清理临时 div
        document.body.removeChild(tempDiv);
    }
};
