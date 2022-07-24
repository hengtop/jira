import type { EpicType } from "types/epic";
import type { QueryKey } from "react-query";
import { useQuery, useMutation } from "react-query";

import { cleanObject } from "utils";
import { useHttp } from "network/http";
import { useAddConfig, useDeleteConfig } from "./use-optimistic-options";

export const useEpics = (params?: Partial<EpicType>) => {
  const client = useHttp();

  return useQuery<EpicType[], Error>(["epics", params], () =>
    client("/epics", { params: cleanObject(params || {}) }),
  );
};

export const useAddEpic = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<EpicType>) =>
      client(`/epics`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey),
  );
};

export const useDeleteEpic = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id }: { id: number }) =>
      client(`/epics/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey),
  );
};
