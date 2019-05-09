/*
+-----------------------------------------------------------------------------------------------------------------------
| Author: atzcl <atzcl0310@gmail.com>  https://github.com/atzcl
+-----------------------------------------------------------------------------------------------------------------------
| 集成 dev
|
*/

import { create } from 'dva-core';
import { Model, Hooks } from 'dva';
import createLoading from 'dva-loading';
import createImmer from 'dva-immer';
import { createLogger } from 'redux-logger';

export interface IDvaOptions {
  useImmer?: boolean;
  useLogger?: boolean;
  useLoading?: {
    global?: boolean;
    models?: object;
    effect?: boolean;
  };
  initialState?: object; // 指定初始数据，优先级高于 model 中的 state，默认是 {}
  models: Model[]
}

/**
 * 创建 dva
 *
 * @param options 插件、model 等配置
 * @param createOptions 创建 dva-code 时的配置
 *
 * @returns {any}
 */
export function createStore(options: IDvaOptions, createOptions: Hooks = {}) {
  // 控制台日志
  if (options.useLogger) {
    createOptions.onAction = [ createLogger() ]
  }

  const app = create(createOptions);

  // 加载插件
  if (options.useLoading) {
    app.use(createLoading(options.useLoading));
  }

  if (options.useImmer) {
    app.use(createImmer());
  }

  // 挂载 model
  if (Array.isArray(options.models)) {
    for (const model of options.models) {
      app.model(model)
    }
  }

  app.start();

  const store = app._store;
  const dispatch = store.dispatch.bind(store);
  store.dispatch = dispatch;

  return store;
}
