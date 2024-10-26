import type { SectionType } from '../api';

// 使用 Map 作为内存缓存
const memoryCache = new Map<string, CachedSection[]>();

export interface CachedSection extends SectionType {
  cachedAt: number;
}

export const cacheKey = (bookId: string): string => `cached_book_${bookId}`;

export const saveToCache = (bookId: string, sections: CachedSection[]): void => {
  const key = cacheKey(bookId);
  // 使用 localStorage 进行本地存储
  localStorage.setItem(key, JSON.stringify(sections));
  // 同时更新内存缓存
  memoryCache.set(key, sections);
};

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

export const clearCache = (bookId: string): void => {
  const key = cacheKey(bookId);
  // 从 localStorage 中删除缓存
  localStorage.removeItem(key);
  // 同时从内存缓存中删除
  memoryCache.delete(key);
};

// 检查缓存是否过期（例如，24小时后过期）
export const isCacheExpired = (cachedAt: number): boolean => {
  const expirationTime = 24 * 60 * 60 * 1000; // 24小时
  return Date.now() - cachedAt > expirationTime;
};
