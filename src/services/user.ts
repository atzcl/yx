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
