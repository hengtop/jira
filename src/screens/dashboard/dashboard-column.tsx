import type { DashboardType } from "types/dashboard";
import { useTasks } from "hooks";

export const DashboardColumn = ({
  dashboard,
}: {
  dashboard: DashboardType;
}) => {
  const { data: allTasks } = useTasks();
  return <div></div>;
};
