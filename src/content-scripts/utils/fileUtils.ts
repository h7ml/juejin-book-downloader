/**
 * 使用 Unicode 字符替换文件名中的特殊字符
 * @param fileName 需要处理的文件名
 * @returns 替换特殊字符后的文件名
 */
export const replaceFileName = (fileName: string): string => {
    // 定义特殊字符到 Unicode 字符的映射
    const replaceMap = new Map([
        ['<', '\uFE64'], // 小于号替换为全角小于号
        ['>', '\uFE65'], // 大于号替换为全角大于号
        [':', '\uA789'], // 冒号替换为冒号分隔符
        ['/', '\u2215'], // 正斜杠替换为除号
        ['\\', '\uFE68'], // 反斜杠替换为小型反斜杠
        ['|', '\u2758'], // 竖线替换为垂直线
        ['?', '\uFE16'], // 问号替换为全角问号
        ['*', '\uFE61'], // 星号替换为小型星号
    ]);

    // 构建正则表达式模式，用于匹配所有需要替换的特殊字符
    const pattern = [...replaceMap.keys()].map(key => '\\' + key).join('|');
    const regex = new RegExp(pattern, 'g');

    // 使用正则表达式替换所有匹配的特殊字符
    return fileName.replace(regex, match => replaceMap.get(match)!);
};
