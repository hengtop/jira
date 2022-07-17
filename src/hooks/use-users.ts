import type { UserType } from "types/user";

import { useEffect } from "react";
import { useAsync } from "./use-async";
import { cleanObject } from "utils";
import { useHttp } from "network/http";

export const useUsers = (params?: Partial<UserType>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<UserType[]>();

  useEffect(() => {
    run(client("/users", { params: cleanObject(params || {}) }));
  }, [params, run, client]);

  return result;
};
