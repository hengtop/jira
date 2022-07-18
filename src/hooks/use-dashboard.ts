import type { DashboardType } from "types/dashboard";
import type { QueryKey } from "react-query";
import { useQuery, useMutation } from "react-query";

import { cleanObject } from "utils";
import { useHttp } from "network/http";
import { useAddConfig, useDeleteConfig } from "./use-optimistic-options";

export const useDashboards = (params?: Partial<DashboardType>) => {
  const client = useHttp();

  return useQuery<DashboardType[], Error>(["dashboards", params], () =>
    client("/kanbans", { params: cleanObject(params || {}) }),
  );
};

export const useAddDashboard = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<DashboardType>) =>
      client(`/kanbans`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey),
  );
};

export const useDeleteDashboard = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id }: { id: number }) =>
      client(`/kanbans/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey),
  );
};
