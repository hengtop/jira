import { useDocumentTitle, useDashboards } from "hooks";
import React, { memo } from "react";
import { useProjectInUrl } from "./utils";

export default memo(function Dashboard() {
  //props/state

  //redux hooks

  //other hooks
  useDocumentTitle("看板列表");
  const { data: dashboards } = useDashboards();
  const { data: currentProject } = useProjectInUrl();
  //其他逻辑

  return (
    <div>
      {currentProject?.name}dashboard
      <div>
        {dashboards?.map((item) => {
          return <div key={item.id}>{item.name}</div>;
        })}
      </div>
    </div>
  );
});
