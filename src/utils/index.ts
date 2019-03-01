import Taro from '@tarojs/taro';

/**
 * 同步获取缓存, 如果不存在，那么就使用默认值来替换
 *
 * @param {string} key
 * @param {any} defaultValue
 *
 * @returns {any}
 */
export const getStorage = (key: string, defaultValue: any = null) => {
  const result = Taro.getStorageSync(key);

  return result !== undefined ? result : defaultValue;
};
