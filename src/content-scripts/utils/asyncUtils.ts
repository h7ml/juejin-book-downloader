/**
 * 异步睡眠函数
 * @param timeout 睡眠时间，默认为1000毫秒
 * @returns 返回一个Promise，在指定的超时时间后解决
 */
export const sleep = async (timeout = 1000) => {
    return new Promise<void>(resolve => {
        setTimeout(resolve, timeout);
    });
};
