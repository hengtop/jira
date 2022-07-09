import { useCallback, useMemo } from "react";
import { useUrlQueryParam, useSetUrlSearchParam } from "hooks";
import { useProject } from "hooks/use-projects";

export const useProjectSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  return [
    useMemo(
      () => ({
        ...param,
        personId: Number(param.personId) || undefined,
      }),
      [param],
    ),
    setParam,
  ] as const;
};

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    "editingProjectId",
  ]);
  const { data: editingProject, isLoading } = useProject(
    Number(editingProjectId),
  );
  const setUrlParams = useSetUrlSearchParam();

  const open = useCallback(
    () => setProjectCreate({ projectCreate: true }),
    [setProjectCreate],
  );
  const close = useCallback(() => {
    setUrlParams({ projectCreate: undefined, editingProjectId: undefined });
  }, [setUrlParams]);

  const startEdit = useCallback(
    (id: number) => {
      setEditingProjectId({ editingProjectId: id });
    },
    [setEditingProjectId],
  );

  return {
    projectModalOpen: projectCreate === "true" || Boolean(editingProjectId),
    open,
    close,
    editingProject,
    startEdit,
    isLoading,
  };
};
