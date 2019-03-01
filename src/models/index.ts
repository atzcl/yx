import count from './count';

export default [
  count
]

export interface IStore {
  loading: {
    effects: string[]
  };

  count: typeof count.state;
}
