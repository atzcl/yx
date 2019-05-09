/*
+-----------------------------------------------------------------------------------------------------------------------
| Author: atzcl <atzcl0310@gmail.com>  https://github.com/atzcl
+-----------------------------------------------------------------------------------------------------------------------
| 创建 dev
|
*/

import { createStore } from '@/libs/dva';
import models from '@my_models/index';

export const Store = createStore({
  useLogger: false,
  // 使用 dva-immer
  useImmer: true,
  // 使用 dva-loading
  useLoading: {
    effect: false,
  },

  models,
});
