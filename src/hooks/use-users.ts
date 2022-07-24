import type { UserType } from "types/user";

import { useQuery } from "react-query";
import { useHttp } from "network/http";

export const useUsers = (params?: Partial<UserType>) => {
  const client = useHttp();
  return useQuery<UserType[]>(["users", params], () =>
    client("/users", { params }),
  );
};
