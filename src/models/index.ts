import count from './Count';

export default [
  count
]

export interface IStore {
  loading: {
    effects: string[]
  };

  count: typeof count.state;
}
