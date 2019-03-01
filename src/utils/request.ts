/*
+-----------------------------------------------------------------------------------------------------------------------
| Author: atzcl <atzcl0310@gmail.com>  https://github.com/atzcl
+-----------------------------------------------------------------------------------------------------------------------
| 简单封装 request
|
*/

import Taro from '@tarojs/taro';
import { getUserToken } from '@my_services/user';

interface IOptions {
  url: string;
  data?: any;
  method?: | 'OPTIONS'
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'TRACE'
  | 'CONNECT';
  showToast?: boolean;
}

// 全局基础的 url 前缀
const baseUrl = () => {
  // 默认是测试
  let baseUrl = 'https://dev.com';

  switch(process.env.NODE_ENV) {
    // 预生产
    case 'prep_production':
      baseUrl = 'https://prep_production.com';
      break;
    // 生产
    case 'production':
      baseUrl = 'https://production.com';
      break;
    // more ...
  }

  return baseUrl;
}

// 自定义关闭 loading
const hideLoading = (showToast: boolean) => {
  if (showToast) {
    // 增加一下延迟关闭会自然一点
    setTimeout(() => Taro.hideLoading(), 300);
  }
}

/**
 * 简单封装网络请求
 *
 * ref: https://github.com/js-newbee/taro-yanxuan
 */
export async function fetch(options: IOptions) {
  // 判断是否携带了 http 前缀, 如果没有，那么就自动添加全局基础的 url 前缀
  if (! (/^(http|https)?:\/\//.test(options.url))) {
    options.url = `${baseUrl()}${options.url}`
  }

  const { url, data = {}, method = 'GET', showToast = false } = options;

  const header = { 'content-type': 'application/json' };

  const token = getUserToken();
  if (token) {
    header['Authorization'] = `bearer ${token}`;
  }

  if (showToast) {
    Taro.showLoading();
  }

  return Taro.request({
    url,
    method,
    data,
    header
  }).then(async (res) => {
    hideLoading(showToast);

    const { code, data } = res.data;

    // 如果请求 code 不是成功
    if (parseInt(code) !== 200) {
      switch(code) {
        case 401:
          break;
        case 403:
          break;
        case 600:
          break;
      }

      return Promise.reject(res.data)
    }

    return Promise.resolve(data);
  }).catch((err) => {
    hideLoading(showToast);

    return Promise.reject(err)
  });
}

interface HttpRequestParam {
  url: string;
  data?: any;
  showToast?: boolean;
}

export const Get = (params: HttpRequestParam) => fetch({ ...params, method: 'GET' });
export const Post = (params: HttpRequestParam) => fetch({ ...params, method: 'POST' });
export const Put = (params: HttpRequestParam) => fetch({ ...params, method: 'PUT' });
export const Delete = (params: HttpRequestParam) => fetch({ ...params, method: 'DELETE' });
