import { SectionInfoType } from './types';

/**
 * 获取小册章节信息
 * @param sectionId 章节ID
 * @returns 返回章节信息
 */
export async function getSectionInfo(sectionId: string): Promise<SectionInfoType> {
    // 发送POST请求获取章节信息
    const response = await fetch(
        'https://api.juejin.cn/booklet_api/v1/section/get',
        {
            method: 'POST',
            body: JSON.stringify({
                section_id: sectionId,
            }),
            credentials: 'include', // 包含凭证信息
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
    
    // 解析响应数据
    const data: SectionInfoType = await response.json();
    return data;
}
