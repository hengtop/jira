import { useDocumentTitle, useDashboards, useTasks } from "hooks";
import styled from "@emotion/styled";
import React, { memo } from "react";
import {
  useDashboardSearchParams,
  useProjectInUrl,
  useTaskSearchParams,
} from "./utils";

import { DashboardColumn } from "./dashboard-column";
import { SearchPanel } from "./search-panel";
import { ScreenContainer } from "components/lib";
import { Spin } from "antd";
import CreateDashboard from "./create-dashboard";
import TaskModal from "./task-modal";

export default memo(function Dashboard() {
  //props/state

  //redux hooks

  //other hooks
  useDocumentTitle("看板列表");
  const { data: dashboards, isLoading: dashboardLoading } = useDashboards(
    useDashboardSearchParams(),
  );
  const { data: currentProject } = useProjectInUrl();
  const { isLoading: taskIsLoading } = useTasks(useTaskSearchParams());
  //其他逻辑
  const isLoading = taskIsLoading || dashboardLoading;
  return (
    <ScreenContainer>
      <SearchPanel />
      <DashboardTitle>{currentProject?.name}</DashboardTitle>
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <ColumnContainer>
          {dashboards?.map((item, index) => {
            return <DashboardColumn key={item.id ?? index} dashboard={item} />;
          })}
          <CreateDashboard />
        </ColumnContainer>
      )}
      <TaskModal />
    </ScreenContainer>
  );
});

export const ColumnContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;

export const DashboardTitle = styled.h2``;
