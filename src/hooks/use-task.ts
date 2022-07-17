import type { TaskTypeType } from "types/task-type";
import type { TaskType } from "types/task";
import { useQuery } from "react-query";

import { cleanObject } from "utils";
import { useHttp } from "network/http";

export const useTasks = (params?: Partial<TaskType>) => {
  const client = useHttp();

  return useQuery<TaskType[], Error>(["tasks", params], () =>
    client("/tasks", { params: cleanObject(params || {}) }),
  );
};

/**
 * @description 获取对应type信息
 */
export const useTaskTypes = () => {
  const client = useHttp();

  return useQuery<TaskTypeType[], Error>(["taskTypes"], () =>
    client("/taskTypes"),
  );
};
