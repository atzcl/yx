/*
+-----------------------------------------------------------------------------------------------------------------------
| Author: atzcl <atzcl0310@gmail.com>  https://github.com/atzcl
+-----------------------------------------------------------------------------------------------------------------------
| user
|
*/

import Taro from '@tarojs/taro';

// 储存在缓存的用户 token 标识
export const USER_TOKEN_KEY = 'user_login_token';

// 获取用户 token
export const getUserToken = () => Taro.getStorageSync(USER_TOKEN_KEY);

// 设置 token
export const setUserToken = (token: string) => Taro.setStorageSync(USER_TOKEN_KEY, token);

// 前往授权页面
export const goToAuthorizePage = () => Taro.navigateTo({ url: '/pages/Authorize/index' });

// 判断是否登录
export const hasLogin = () => ! getUserToken() && goToAuthorizePage();
