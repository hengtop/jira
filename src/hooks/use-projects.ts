import type { ProjectType } from "screens/project-list/list";

import { useCallback, useEffect } from "react";
import { useAsync } from "./use-async";
import { cleanObject } from "utils";
import { useHttp } from "network/http";
import { useMutation, useQuery, useQueryClient } from "react-query";

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

export const useEditProject = () => {
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
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<ProjectType>) =>
      client(`/projects/${params.id}`, { data: params, method: "PATCH" }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    },
  );
};

export const useAddProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<ProjectType>) =>
      client(`/projects`, {
        data: params,
        method: "POST",
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    },
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
