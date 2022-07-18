import type { TaskTypeType } from "types/task-type";
import type { TaskType } from "types/task";
import type { QueryKey } from "react-query";
import { useMutation, useQuery } from "react-query";

import { cleanObject } from "utils";
import { useHttp } from "network/http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";
import { useUrlQueryParam } from "hooks";
import { useCallback } from "react";

export const useTasks = (params?: Partial<TaskType>) => {
  const client = useHttp();

  return useQuery<TaskType[], Error>(["tasks", params], () =>
    client("/tasks", { params: cleanObject(params || {}) }),
  );
};

export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<TaskType>) =>
      client(`/tasks`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey),
  );
};

export const useEditTask = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<TaskType>) =>
      client(`/tasks/${params.id}`, { data: params, method: "PATCH" }),
    useEditConfig(queryKey),
  );
};

export const useDeleteTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id }: { id: number }) =>
      client(`/tasks/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey),
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

export const useTasksModal = () => {
  const [{ editingTaskId }, setEditingTaskId] = useUrlQueryParam([
    "editingTaskId",
  ]);
  const { data: editingTask, isLoading } = useTask(Number(editingTaskId));
  const startEdit = useCallback(
    (id: number) => {
      setEditingTaskId({ editingTaskId: id });
    },
    [setEditingTaskId],
  );
  const close = useCallback(() => {
    setEditingTaskId({ editingTaskId: "" });
  }, [setEditingTaskId]);

  return {
    editingTaskId,
    editingTask,
    startEdit,
    close,
    isLoading,
  };
};

export const useTask = (id?: number) => {
  const client = useHttp();
  return useQuery<TaskType>(["task", { id }], () => client(`/tasks/${id}`), {
    enabled: Boolean(id),
  });
};
