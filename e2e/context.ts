import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createWebxTest } from '@webx-kit/test-utils/playwright';

// 获取当前文件的目录名
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const test = createWebxTest({
  extensionPath: path.resolve(__dirname, '../dist'),
});

export const { expect } = test;