import type { ProjectType } from "screens/project-list/list";

import { useEffect } from "react";
import { useAsync } from "./use-async";
import { cleanObject } from "utils";
import { useHttp } from "network/http";

export const useProjects = (params?: Partial<ProjectType>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<ProjectType[]>();

  const fetchProjects = () =>
    client("/projects", {
      params: cleanObject(params || {}),
    });
  useEffect(() => {
    run(fetchProjects(), {
      retry: fetchProjects,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
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
