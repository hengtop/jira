import { useCallback, useReducer, useState } from "react";
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

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef();
  return useCallback(
    (...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0),
    [dispatch, mountedRef],
  );
};

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig,
) => {
  const config = { ...defaultConfig, ...initialConfig };
  const [state, dispatch] = useReducer(
    (state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }),
    {
      ...defaultInitialState,
      ...initialState,
    },
  );

  const [retry, setRetry] = useState(() => () => {});
  const safeDispatch = useSafeDispatch(dispatch);

  const setData = useCallback(
    (data: D) =>
      safeDispatch({
        data,
        stat: "success",
        error: null,
      }),
    [safeDispatch],
  );

  const setError = useCallback(
    (error: Error) =>
      safeDispatch({
        error,
        stat: "error",
        data: null,
      }),
    [safeDispatch],
  );

  // 用于出发异步请求
  const run = useCallback(
    (
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

      // 在useCallback中使用到了state但是在依赖中又使用了state这里就可以使用回调函数的形式来避免出发无限循环
      safeDispatch({ stat: "loading" });
      return promise
        .then((data) => {
          setData(data);

          return data;
        })
        .catch((error) => {
          setError(error);
          // 这里可以设置是否向外抛出异常使得run在使用的时候可以被trycatch捕获到异常
          if (config.throwOnError) return Promise.reject(error);
          return error;
        });
    },
    [config.throwOnError, setData, setError, safeDispatch],
  );

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    retry,
    ...state,
  };
};
