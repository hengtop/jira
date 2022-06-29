import type { UserType } from "screens/project-list";

import { useEffect } from "react";
import { useAsync } from "./use-async";
import { cleanObject } from "utls";
import { useHttp } from "network/http";

export const useUsers = (params?: Partial<UserType>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<UserType[]>();

  useEffect(() => {
    run(client("/users", { params: cleanObject(params || {}) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return result;
};
