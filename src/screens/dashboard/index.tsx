import { useDocumentTitle, useDashboards } from "hooks";
import styled from "@emotion/styled";
import React, { memo } from "react";
import { useDashboardSearchParams, useProjectInUrl } from "./utils";
import { DashboardColumn } from "./dashboard-column";
import { SearchPanel } from "./search-panel";
import { ScreenContainer } from "components/lib";

export default memo(function Dashboard() {
  //props/state

  //redux hooks

  //other hooks
  useDocumentTitle("看板列表");
  const { data: dashboards } = useDashboards(useDashboardSearchParams());
  const { data: currentProject } = useProjectInUrl();
  //其他逻辑

  return (
    <ScreenContainer>
      <SearchPanel />
      {currentProject?.name}dashboard
      <ColumnContainer>
        {dashboards?.map((item) => {
          return <DashboardColumn key={item.id} dashboard={item} />;
        })}
      </ColumnContainer>
    </ScreenContainer>
  );
});

export const ColumnContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  flex: 1;
`;
