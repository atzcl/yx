/*
+-----------------------------------------------------------------------------------------------------------------------
| Author: atzcl <atzcl0310@gmail.com>  https://github.com/atzcl
+-----------------------------------------------------------------------------------------------------------------------
| count
|
*/

export default {
  namespace: 'count',
  state: 0,
  reducers: {
    add(count) { return count + 1 },
    minus(count) { return count - 1 },
  },
  effects: {}
}
