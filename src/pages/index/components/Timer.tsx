/**
 * @desc 如果从 @tarojs/taro 里面导入 hooks 相关的 api, 会导致报错, 使用如下
 *        import Taro, { useEffect } from '@tarojs/taro';
 */
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtButton } from 'taro-ui';

/**
 * @desc 由于上面的问题，所以在这里导入
 */
import { useEffect } from '@/libs/useful-hooks';
import { IStore } from '@/models/index';

interface IProps extends CommonProps {
  count: IStore['count'];
};

export function Timer({ dispatch, count }: IProps) {
  useEffect(() => {
    console.log('我本来只应该打印一次')
  }, []);

  return (
    <View>
      <View style={{ textAlign: 'center', width: '80vw', margin: '3vh 0' }}>{count}</View>

      <View className='at-row'>
        <View className='at-col at-col-5'>
          <AtButton onClick={() => dispatch({ type: 'count/minus' })}>-</AtButton>
        </View>
        <View className='at-col at-col-5 at-col__offset-2'>
          <AtButton onClick={() => dispatch({ type: 'count/add' })}>+</AtButton>
        </View>
      </View>
    </View>
  )
};
