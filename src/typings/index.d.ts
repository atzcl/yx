declare namespace API {
  // http 请求结果
  export interface Response {
    data: ResponseData,
    errMsg: string,
    statusCode: number,
    header: any
  }

  // API 接口返回数据
  export interface ResponseData {
    code: number;
    data: any;
    msg: string;
    time: number;
  }

  export interface Error extends ErrorConstructor {
    code: number;
    text: string;
    data: any;
    status: string;
  }
}

interface CommonProps {
  dispatch: IDispatch;
}

/**
 * dva 异步方法调用
 */
type IDispatch = (object: { type: string, payload?: object, callback?: (res: API.ResponseData) => void }) => void;
