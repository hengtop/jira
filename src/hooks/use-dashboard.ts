import type { DashboardType } from "types/dashboard";
import { useQuery } from "react-query";

import { useCallback, useEffect } from "react";
import { useAsync } from "./use-async";
import { cleanObject } from "utils";
import { useHttp } from "network/http";

export const useDashboards = (params?: Partial<DashboardType>) => {
  const client = useHttp();

  return useQuery<DashboardType[], Error>(["dashboards", params], () =>
    client("/kanbans", { params: cleanObject(params || {}) }),
  );
};
