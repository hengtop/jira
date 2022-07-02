import type { ProjectType } from "screens/project-list/list";

import { useCallback, useEffect } from "react";
import { useAsync } from "./use-async";
import { cleanObject } from "utils";
import { useHttp } from "network/http";

export const useProjects = (params?: Partial<ProjectType>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<ProjectType[]>();

  const fetchProjects = useCallback(
    () =>
      client("/projects", {
        params: cleanObject(params || {}),
      }),
    [client, params],
  );
  useEffect(() => {
    run(fetchProjects(), {
      retry: fetchProjects,
    });
  }, [params, run, fetchProjects]);
  return result;
};

export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<ProjectType>) =>
    run(
      client(`/projects/${params.id}`, {
        data: params,
        method: "PATCH",
      }),
    );

  return { mutate, ...asyncResult };
};

export const useAddProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<ProjectType>) => {
    run(
      client(`/projects/${params.id}`, {
        data: params,
        method: "POST",
      }),
    );
  };
  return { mutate, ...asyncResult };
};
