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

/**
 * 简易弹窗
 *
 * @param message
 */
export const showMessage = (message: string) => Taro.showToast({ title: message, icon: 'none' });

export const phoneReg = (
  /^(?:\+?86)?1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[01356789]\d{2}|4(?:0\d|1[0-2]|9\d))|9[189]\d{2}|6[567]\d{2}|4(?:[14]0\d{3}|[68]\d{4}|[579]\d{2}))\d{6}$/
);

// 简单判断是否为空
export const isEmpty = (value: any) => value === '' || value === undefined || value === null;

export const getAge = (time: string) => {
  const r: any = time.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
  if (r === null) {
    return '';
  }

  r[1] = Number(r[1]);
  r[3] = Number(r[3]);
  r[4] = Number(r[4]);

  const d = new Date(r[1], r[3] - 1, r[4]);
  if (d.getFullYear() === r[1] && (d.getMonth() + 1) === r[3] && d.getDate() === r[4]) {
    const Y =  new Date().getFullYear();

    return Y - r[1];
  }

  return '';
}
