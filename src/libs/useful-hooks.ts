/*
+-----------------------------------------------------------------------------------------------------------------------
|
+-----------------------------------------------------------------------------------------------------------------------
| 简单封装常用 hooks
|
*/

import { useState, useEffect, useCallback } from '@tarojs/taro';

export type EffectCallback = () => (void | (() => void | undefined));

export {
  useState, useEffect,
}

export const useSetState = initState => {
  const [state, setState] = useState(initState);

  return [
    state,
    useCallback(v => {
      return setState(preState => ({
        ...preState,
        ...(typeof v === "function" ? v(preState) : v)
      }));
    }, [])
  ];
};


/**
 * 等同 componentDidMount
 *
 * @param effect
 */
export const useOnDidMount = (effect: EffectCallback) => useEffect(() => {
  typeof effect === 'function' && effect()
}, []);

/**
 * 等同于 componentDidUpdate
 *
 * @param {EffectCallback} effect
 */
export const useOnDidUpdate = (effect: EffectCallback) => {
  useEffect(() => {
    typeof effect === 'function' && effect();
  });
};

/**
 * 等同 componentWillUnmount
 *
 * @param {EffectCallback} effect
 */
// export const useOnWillUnmount = (effect: EffectCallback) => useEffect(() => {
//   return typeof effect === 'function' && effect();
// });
