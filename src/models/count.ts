/*
+-----------------------------------------------------------------------------------------------------------------------
| Author: atzcl <atzcl0310@gmail.com>  https://github.com/atzcl
+-----------------------------------------------------------------------------------------------------------------------
| count
|
*/

import merge from 'lodash.merge';
import BaseModel from './Base';

export default merge(BaseModel, {
  namespace: 'count',

  state: 0,

  reducers: {
    add(count) { return count + 1 },

    minus(count) { return count - 1 },
  },

  effects: {}
})
