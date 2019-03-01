import Taro, { Component, Config } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtButton } from 'taro-ui';

import { connect } from "@tarojs/redux";
import { IStore } from '@/models/index';

import './index.less';

interface IState {
  tabActive: number;
}

interface IProps {
  count: IStore['count'];
  dispatch: IDispatch;
};

@connect(({ count }: IStore) => ({ count }) as IProps)
class Index extends Component<IProps, IState> {
  config: Config = {
    navigationBarTitleText: '首页'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { count, dispatch } = this.props;

    return (
      <View className='index'>
        <Text>{count}</Text>
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
  }
}

export default Index as any
