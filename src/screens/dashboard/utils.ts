import { useUrlQueryParam } from "hooks";
import { useProject } from "hooks/use-projects";
import { useMemo } from "react";
import { useLocation } from "react-router";

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/projects\/(\d+)/)?.[1];
  return Number(id);
};

export const useProjectInUrl = () => useProject(useProjectIdInUrl());

export const useDashboardSearchParams = () => ({
  projectId: useProjectIdInUrl(),
});

export const useDashboardQueryKey = () => [
  "dashboards",
  useDashboardSearchParams(),
];

export const useTaskSearchParams = () => {
  const [param] = useUrlQueryParam(["name", "typeId", "processorId", "tagId"]);
  const projectId = useProjectIdInUrl();
  return useMemo(
    () => ({
      projectId,
      typeId: Number(param.typeId) || undefined,
      processorId: Number(param.processorId) || undefined,
      tagId: Number(param.tagId) || undefined,
      name: param.name,
    }),
    [projectId, param],
  );
};

export const useTaskQueryKey = () => ["tasks", useTaskSearchParams()];