/*
+-----------------------------------------------------------------------------------------------------------------------
| Author: atzcl <atzcl0310@gmail.com>  https://github.com/atzcl
+-----------------------------------------------------------------------------------------------------------------------
| 授权封装
|
*/

import Taro, { showModal } from '@tarojs/taro';

type ScopeInterface = 'userInfo' | 'userLocation' | 'address' |
  'invoiceTitle' | 'invoice' | 'werun' | 'record' | 'writePhotosAlbum' | 'camera';


/**
 * 验证指定授权描述
 *
 * @param {ScopeInterface} scope 权限类型
 */
export const getScopeDesc = (scope: ScopeInterface) => {
  return {
    userInfo: '用户信息',
    userLocation: '地理位置',
    address: '通讯地址',
    invoiceTitle: '发票抬头',
    invoice: '获取发票',
    werun: '微信运动步数',
    record: '录音功能',
    writePhotosAlbum: '保存到相册',
    camera: '摄像头',
  }[scope];
};

/**
 * 打开授权设置
 *
 * @param {string} scope 权限类型
 */
export const openAuthSetting = (scope: ScopeInterface) => {
  return new Promise((resolve, reject) => {
    Taro.openSetting({
      success(res) {
        res.authSetting[`scope.${scope}`] ? resolve(res) : reject(res)
      },
      fail(res) {
        reject(res)
      }
    })
  })
}

/**
 * 验证指定授权情况
 *
 * @param {ScopeInterface} scope 权限类型
 */
export const verifyAuthorizeSetting = (scope: ScopeInterface) => {
  return new Promise((resolve, reject) => {
    Taro.getSetting({
      success(res) {
        res.authSetting[`scope.${scope}`] ? resolve(res) : reject(res)
      },
      fail(res) {
        reject(res)
      }
    })
  })
}

/**
 * 解析并设置可能的默认数据
 *
 * @param {ScopeInterface} scope 权限类型
 * @param {showModal.Param} showModalObject modal
 */
export const resolveAuthorizeShowModalObject = (scope: ScopeInterface, showModalObject?: showModal.Param) => {
  if (showModalObject && ! showModalObject.content) {
    delete showModalObject.content;
  }

  return {
    title: '请求授权提示',
    content: `请允许获取${getScopeDesc(scope)}权限, 以便提供完整的服务`,
    ...(showModalObject || {})
  }
}

/**
 * 保证获取到指定授权, 可以利用 showModalObject 的 showCancel 来取消 [ 取消按钮 ]，以达到强制授权的目的
 *
 * @param {ScopeInterface} scope 权限类型
 * @param {showModal.Param} showModalObject modal
 */
export const promiseGetAuthorize = (
  scope: ScopeInterface, showModalObject?: showModal.Param
) => {
  const newShowModalObject = resolveAuthorizeShowModalObject(scope, showModalObject);

  return new Promise((resolve) => verifyAuthorizeSetting(scope)
    .then(() => resolve())
    .catch(() =>
      Taro.showModal({
        ...newShowModalObject,
        success(res: showModal.Promised) {
          if (res.cancel) {
            return;
          }

          // 循环获取
          openAuthSetting(scope).catch(() => promiseGetAuthorize(scope, newShowModalObject))
        }
      })
    )
  )
}

// 获取用户授权
export const getUserInfoAuthorize = () => verifyAuthorizeSetting('userInfo');

// 执行 login 以获取解密 code
export const getUserLoginCode = () => {
  return new Promise((resolve) => {
    Taro.login()
      .then(info => resolve(info.code))
      .catch(() => {
        Taro.showModal({
          title: '登录失败',
          content: '获取 login code 失败, 请点击重试',
          success(res: showModal.Promised) {
            res.cancel ? Taro.navigateBack() : getUserLoginCode()
          }
        });
      })
  })
}

// 获取用户地址
export const getLocation = async () => await Taro.getLocation();
