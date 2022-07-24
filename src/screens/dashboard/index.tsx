import { useDocumentTitle, useDashboards, useTasks } from "hooks";
import styled from "@emotion/styled";
import React, { memo } from "react";
import {
  useDashboardSearchParams,
  useDragEnd,
  useProjectInUrl,
  useTaskSearchParams,
} from "./utils";

import { DashboardColumn } from "./dashboard-column";
import { SearchPanel } from "./search-panel";
import { ScreenContainer } from "components/lib";
import { Spin } from "antd";
import CreateDashboard from "./create-dashboard";
import TaskModal from "./task-modal";
import { DragDropContext } from "react-beautiful-dnd";
import { Drag, Drop, DropChild } from "components/drag-and-drop";

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
  const onDragEnd = useDragEnd();
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ScreenContainer>
        <SearchPanel />
        <DashboardTitle>{currentProject?.name}看板</DashboardTitle>
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <Drop type="COLUMN" direction="horizontal" droppableId="dashboard">
            <ColumnContainer
              data-rbd-droppable-context-id="dashboard"
              data-rbd-droppable-id="dashboard"
            >
              {dashboards?.map((item, index) => {
                return (
                  <Drag
                    key={item.id}
                    draggableId={"dashboard" + item.id}
                    index={index}
                  >
                    <DashboardColumn key={item.id ?? index} dashboard={item} />
                  </Drag>
                );
              })}
              <CreateDashboard />
            </ColumnContainer>
          </Drop>
        )}
        <TaskModal />
      </ScreenContainer>
    </DragDropContext>
  );
});

export const ColumnContainer = styled(DropChild)`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;

export const DashboardTitle = styled.h2``;
