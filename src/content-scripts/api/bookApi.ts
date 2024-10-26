import { BookInfoType } from './types';

/**
 * 获取小册信息
 * @param bookId 小册ID
 * @returns 返回小册信息
 */
export async function getBookInfo(bookId: string): Promise<BookInfoType> {
    // 发送POST请求获取小册信息
    const response = await fetch(
        'https://api.juejin.cn/booklet_api/v1/booklet/get',
        {
            method: 'POST',
            body: JSON.stringify({
                booklet_id: bookId,
            }),
            credentials: 'include', // 包含凭证信息
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
    
    // 解析响应数据
    const data: BookInfoType = await response.json();
    return data;
}
