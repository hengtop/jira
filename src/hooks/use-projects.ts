import type { ProjectType } from "screens/project-list/list";

import { useEffect } from "react";
import { useAsync } from "./use-async";
import { cleanObject } from "utls";
import { useHttp } from "network/http";

export const useProjects = (params?: Partial<ProjectType>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<ProjectType[]>();

  useEffect(() => {
    run(client("/projects", { params: cleanObject(params || {}) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  return result;
};
