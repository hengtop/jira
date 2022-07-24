import type { DropResult } from "react-beautiful-dnd";

import { useDashboards, useDebounce, useTasks, useUrlQueryParam } from "hooks";
import { useProject } from "hooks/use-projects";
import { useCallback, useMemo } from "react";
import { useLocation } from "react-router";
import { useReorderDashboard } from "hooks/use-dashboard";
import { useReorderTask } from "hooks/use-task";

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
  const debounceName = useDebounce(param.name, 200);
  return useMemo(
    () => ({
      projectId,
      typeId: Number(param.typeId) || undefined,
      processorId: Number(param.processorId) || undefined,
      tagId: Number(param.tagId) || undefined,
      name: debounceName,
    }),
    [projectId, param, debounceName],
  );
};

export const useTaskQueryKey = () => ["tasks", useTaskSearchParams()];

export const useDragEnd = () => {
  const { data: dashboard } = useDashboards(useDashboardSearchParams());
  const { data: tasks = [] } = useTasks(useTaskSearchParams());
  const { mutate: reorderDashboard } = useReorderDashboard(
    useDashboardQueryKey(),
  );
  const { mutate: reorderTask } = useReorderTask(useTaskQueryKey());
  return useCallback(
    ({ source, destination, type }: DropResult) => {
      //没有排序就返回
      if (!destination) {
        return;
      }
      // 看板排序
      if (type === "COLUMN") {
        const fromId = dashboard?.[source.index].id;
        const toId = dashboard?.[destination.index].id;
        if (!fromId || !toId || fromId === toId) {
          return;
        }
        // 判断拖拽放置的位置
        const type = destination.index > source.index ? "after" : "before";
        reorderDashboard({ fromId, referenceId: toId, type });
      }
      if (type === "ROW") {
        const fromDashboardId = +source.droppableId;
        const toDashboardId = +destination.droppableId;
        console.log(fromDashboardId, toDashboardId);
        // if (fromDashboardId === toDashboardId) {
        //   return;
        // }
        const fromTask = tasks.filter(
          (task) => task.kanbanId === fromDashboardId,
        )[source.index];
        const toTask = tasks.filter((task) => task.kanbanId === toDashboardId)[
          destination.index
        ];
        if (fromTask?.id === toTask?.id) {
          return;
        }
        reorderTask({
          fromId: fromTask?.id,
          referenceId: toTask?.id,
          fromKanbanId: fromDashboardId,
          toKanbanId: toDashboardId,
          type:
            fromDashboardId === toDashboardId &&
            destination.index > source.index
              ? "after"
              : "before",
        });
      }
    },
    [dashboard, reorderDashboard, reorderTask, tasks],
  );
};
