import { useRef, useState } from "react";
import { useMountedRef } from "./";

interface State<D> {
  error: Error | null;
  data: D | null;
  /* 这四个状态分别是 操作还没发生 正在发生 发生完出现错误 发生完没有出现错误 */
  stat: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
  stat: "idle",
  data: null,
  error: null,
};

const defaultConfig = {
  throwOnError: false,
};

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig,
) => {
  const config = { ...defaultConfig, ...initialConfig };
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  });

  const [retry, setRetry] = useState(() => () => {});
  const mountedRef = useMountedRef();

  const setData = (data: D) =>
    setState({
      data,
      stat: "success",
      error: null,
    });

  const setError = (error: Error) =>
    setState({
      error,
      stat: "error",
      data: null,
    });

  // 用于出发异步请求
  const run = (
    promise: Promise<D>,
    runConfig?: {
      retry: () => Promise<D>;
    },
  ) => {
    if (!promise || !promise.then) {
      throw new Error("请传入promise数据");
    }
    if (runConfig?.retry) {
      // 保存promise
      setRetry(() => () => run(runConfig.retry(), runConfig));
    }

    setState({
      ...state,
      stat: "loading",
    });
    return promise
      .then((data) => {
        if (mountedRef.current) {
          setData(data);
        }

        return data;
      })
      .catch((error) => {
        setError(error);
        // 这里可以设置是否向外抛出异常使得run在使用的时候可以被trycatch捕获到异常
        if (config.throwOnError) return Promise.reject(error);
        return error;
      });
  };

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSucess: state.stat === "success",
    run,
    setData,
    setError,
    retry,
    ...state,
  };
};
