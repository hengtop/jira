import type { ProjectType } from "types/project";

import { useCallback, useEffect } from "react";
import { useAsync } from "./use-async";
import { cleanObject } from "utils";
import { useHttp } from "network/http";
import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import { useProjectSearchParams } from "screens/project-list/utils";
import {
  useEditConfig,
  useAddConfig,
  useDeleteConfig,
} from "./use-optimistic-options";

export const useProjects = (params?: Partial<ProjectType>) => {
  const client = useHttp();
  // const { run, ...result } = useAsync<ProjectType[]>();

  // const fetchProjects = useCallback(
  //   () =>
  //     client("/projects", {
  //       params: cleanObject(params || {}),
  //     }),
  //   [client, params],
  // );
  // useEffect(() => {
  //   run(fetchProjects(), {
  //     retry: fetchProjects,
  //   });
  // }, [params, run, fetchProjects]);
  // return result;
  return useQuery<ProjectType[], Error>(["projects", params], () =>
    client("/projects", { params: cleanObject(params || {}) }),
  );
};

export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp();
  // const { run, ...asyncResult } = useAsync();
  // const mutate = (params: Partial<ProjectType>) =>
  //   run(
  //     client(`/projects/${params.id}`, {
  //       data: params,
  //       method: "PATCH",
  //     }),
  //   );

  // return { mutate, ...asyncResult };
  return useMutation(
    (params: Partial<ProjectType>) =>
      client(`/projects/${params.id}`, { data: params, method: "PATCH" }),
    useEditConfig(queryKey),
  );
};

export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<ProjectType>) =>
      client(`/projects`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey),
  );
};

export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id }: { id: number }) =>
      client(`/projects${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey),
  );
};

// 获取单个项目详情
export const useProject = (id?: number) => {
  const client = useHttp();
  return useQuery<ProjectType>(
    ["project", { id }],
    () => client(`/projects/${id}`),
    {
      enabled: Boolean(id),
    },
  );
};
