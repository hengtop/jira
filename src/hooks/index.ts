import type { URLSearchParamsInit } from "react-router-dom";

import { useEffect, useState, useRef, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { cleanObject } from "utils";
import { useAsync } from "./use-async";
import { useProjects } from "./use-projects";
import { useUsers } from "./use-users";

// 对于之灾组件挂载完后执行的逻辑进行封装
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, [callback]);
};

export const useDebounce = <T>(value: T, delay: number) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => setDebounceValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debounceValue;
};

export const useDocumentTitle = (title: string, keepOnUnmount = true) => {
  // 记录旧的标题
  const oldTitle = useRef(document.title).current;
  useEffect(() => {
    document.title = title;
    return () => {
      // 保证组件卸载后标题还原为原来的标题
      if (!keepOnUnmount) {
        document.title = oldTitle;
      }
    };
  }, [title, keepOnUnmount, oldTitle]);
};

/**
 * @description 返回页面url中指定键的参数值
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return [
    useMemo(
      () =>
        keys.reduce((prev, cur) => {
          return { ...prev, [cur]: searchParams.get(cur) ?? "" };
        }, {} as { [key in K]: string }),
      [searchParams, keys],
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      const o = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params,
      }) as URLSearchParamsInit;
      return setSearchParams(o);
    },
  ] as const; // 这里使用as const 保证类型时类元组的类型而不是联合类型数组
};

export { useAsync, useProjects, useUsers };
