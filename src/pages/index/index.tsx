import Taro, { Component, Config } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { Timer } from './components/Timer';

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
class IndexContainer extends Component<IProps, IState> {
  config: Config = {
    navigationBarTitleText: '首页'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  render () {
    const { count, dispatch } = this.props;

    return (
      <View className='index'>
        <Timer {...{ count, dispatch }} />
      </View>
    )
  }
}

export default IndexContainer as any
