import type { TaskType } from "types/task";
import { useQuery } from "react-query";

import { useCallback, useEffect } from "react";
import { useAsync } from "./use-async";
import { cleanObject } from "utils";
import { useHttp } from "network/http";

export const useTasks = (params?: Partial<TaskType>) => {
  const client = useHttp();

  return useQuery<TaskType[], Error>(["tasks", params], () =>
    client("/tasks", { params: cleanObject(params || {}) }),
  );
};
