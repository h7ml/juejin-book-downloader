import type { SectionType } from '../api';

/**
 * 使用 Map 作为内存缓存，用于存储缓存的章节数据
 */
const memoryCache = new Map<string, CachedSection[]>();

/**
 * 扩展 SectionType 接口，添加缓存时间戳
 */
export interface CachedSection extends SectionType {
  cachedAt: number;
}

/**
 * 生成缓存键
 * @param bookId 书籍ID
 * @returns 格式化的缓存键
 */
export const cacheKey = (bookId: string): string => `cached_book_${bookId}`;

/**
 * 将章节数据保存到缓存中
 * @param bookId 书籍ID
 * @param sections 要缓存的章节数据
 */
export const saveToCache = (bookId: string, sections: CachedSection[]): void => {
  const key = cacheKey(bookId);
  // 使用 localStorage 进行本地存储
  localStorage.setItem(key, JSON.stringify(sections));
  // 同时更新内存缓存
  memoryCache.set(key, sections);
};

/**
 * 从缓存中获取章节数据
 * @param bookId 书籍ID
 * @returns 缓存的章节数据，如果不存在则返回 null
 */
export const getFromCache = (bookId: string): CachedSection[] | null => {
  const key = cacheKey(bookId);
  if (memoryCache.has(key)) {
    return memoryCache.get(key) || null;
  }
  // 从 localStorage 中获取缓存数据
  const cached = localStorage.getItem(key);
  if (cached) {
    const sections = JSON.parse(cached) as CachedSection[];
    memoryCache.set(key, sections);
    return sections;
  }
  return null;
};

/**
 * 清除指定书籍的缓存
 * @param bookId 书籍ID
 */
export const clearCache = (bookId: string): void => {
  const key = cacheKey(bookId);
  // 从 localStorage 中删除缓存
  localStorage.removeItem(key);
  // 同时从内存缓存中删除
  memoryCache.delete(key);
};

/**
 * 检查缓存是否过期
 * @param cachedAt 缓存时间戳
 * @returns 如果缓存已过期则返回 true，否则返回 false
 */
export const isCacheExpired = (cachedAt: number): boolean => {
  const expirationTime = 24 * 60 * 60 * 1000; // 24小时
  return Date.now() - cachedAt > expirationTime;
};
