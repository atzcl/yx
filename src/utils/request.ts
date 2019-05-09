/*
+-----------------------------------------------------------------------------------------------------------------------
| Author: atzcl <atzcl0310@gmail.com>  https://github.com/atzcl
+-----------------------------------------------------------------------------------------------------------------------
| 简单封装 request
|
*/

import Taro from '@tarojs/taro';
import cloneDeep from 'lodash.clonedeep';
import appConfig from '@/config/config';
import { showMessage } from '@my_utils/index'
import { getUserToken, goToAuthorizePage } from '@/services/User';

type MethodType = | 'OPTIONS'
| 'GET'
| 'HEAD'
| 'POST'
| 'PUT'
| 'DELETE'
| 'TRACE'
| 'CONNECT';

interface HttpRequestOptions {
  url: string;
  method: MethodType;
  data?: any;
  params?: any;
  header: any;
  isNeedTotal?: boolean;
  isAutoHandleAuthorize?: boolean;
  isShowLoading?: boolean;
  isShowErrorMessage?: boolean;
}

const defaultOptions: HttpRequestOptions = {
  url: '',
  method: 'GET',
  data: {},
  params: {},
  header: { 'content-type': 'application/json' },
  isShowLoading: false,
  isShowErrorMessage: true,
  isNeedTotal: false,
  isAutoHandleAuthorize:  true,
};

class BaseHttp {
  options: HttpRequestOptions = defaultOptions;

  // 设置默认配置
  setOptions(options: HttpRequestOptions & { data?: any, params?: any, header?: any }) {
    this.options = {
      ...this.options,
      ...options,
    };

    return this;
  }

  // 常用链式设置
  setShowLoading(type = true) {
    this.options.isShowLoading = type;

    return this;
  }

  // 常用链式设置
  setShowErroeMessage(type = true) {
    this.options.isShowErrorMessage = type;

    return this;
  }

  // 常用链式设置
  setHeader(key: string, value: string) {
    this.options.header[key] = value;

    return this;
  }

  // 重置
  resetOptions() {
    this.options = cloneDeep(defaultOptions);
  }

  // 自定义关闭 loading
  hideLoading(showToast: boolean = false) {
    if (showToast) {
      // 增加一下延迟关闭会自然一点
      setTimeout(() => Taro.hideLoading(), 300);
    }
  }

  /**
   * 发起请求
   *
   * @param method
   * @param url
   * @param data
   * @param params
   */
  fetch(method: MethodType, url: string, data: any = null, params: any = null) {
    const options = {
      ...this.options,
      method,
      url,
      data,
      params,
    }

    const {
      isShowLoading, isNeedTotal, isShowErrorMessage, isAutoHandleAuthorize, ...requestOptions
    } = options;

    // 判断是否携带了 http 前缀, 如果没有，那么就自动添加全局基础的 url 前缀
    if (! (/^(http|https)?:\/\//.test(requestOptions.url))) {
      requestOptions.url = appConfig().apiUrl + requestOptions.url;
    }

    const token = getUserToken();
    if (token) {
      requestOptions.header['Authorization'] = `bearer ${token}`;
    }

    if (isShowLoading) {
      Taro.showLoading({ title: '加载中...' });
    }

    // todo: 待补充请求拦截
    // todo: 待补充取消请求
    // todo: 待补充请求排队
    // todo: 待补充多次请求只发起一次
    return new Promise((resolve, reject) => {
      // 这里不使用 Taro 自身的 Promise
      Taro.request({
        ...requestOptions,
        success: res => {
          const { code, data, total } = res.data;

          // 成功返回
          if (Number(code) === 200) {
            isNeedTotal ? resolve({ data, total }) : resolve(data);

            return;
          }

          this.handleResponseException(res.data, options);

          this.handleException(res.data, options)

          reject(res.data);
        },
        fail: (err: Error) => {
          this.handleException(err, options)

          reject(err)
        },
        complete: () => {
          // 关闭可能的 loading
          this.hideLoading(isShowLoading);

          this.resetOptions();
        }
      })
    })
  }

  /**
   * 响应异常处理
   */
  handleResponseException(data: API.ResponseData, options: HttpRequestOptions) {
    switch(data.code) {
      case 401:
        // 自动处理授权
        if (options.isAutoHandleAuthorize) {
          goToAuthorizePage();
        }
        break;

      case 403:
        break;

      case 600:
        break;
    }
  }

  /**
   * 异常处理
   */
  handleException(error: Error | API.ResponseData, options: HttpRequestOptions) {
    const { isShowErrorMessage, method } = options;

    if (isShowErrorMessage && method !== 'GET') {
      console.table([
        '__________________ fetch error start ___________________',
        error,
        '__________________ fetch error end ___________________',
      ]);

      showMessage((error as Error).message || (error as API.ResponseData).msg || '');
    }
  }

  /**
   * GET 请求
   *
   * @param {string} url 请求地址
   * @param {any} params request query
   */
  async get(url: string, params?: any) {
    return this.fetch('GET', url, null, params);
  }

  /**
   * POST 请求
   *
   * @param {string} url 请求 url
   * @param {any} data form data
   */
  async post(url: string, data?: any) {
    return this.fetch('POST', url, data);
  }

  /**
   * PUT 请求
   *
   * @param {string} url 请求 url
   * @param {any} data form data
   */
  async put(url: string, data?: any) {
    return this.fetch('PUT', url, data);
  }

  /**
   * DELETE 请求
   *
   * @param {string} url 请求 url
   * @param {any} data form data
   * @param {any} params request query
   */
  async delete(url: string, data?: any, params?: any) {
    return this.fetch('DELETE', url, data, params);
  }
}

export default new BaseHttp;
