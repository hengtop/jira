import { useEffect, useState, useRef } from "react";
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

export { useAsync, useProjects, useUsers };
