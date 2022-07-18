import { useAddDashboard } from "hooks/use-dashboard";
import React, { memo, useState } from "react";
import { Input } from "antd";
import { useDashboardQueryKey, useProjectIdInUrl } from "./utils";

import { Container } from "./dashboard-column";

export default memo(function Index() {
  //props/state
  const [name, setName] = useState("");
  //redux hooks

  //other hooks
  const projectId = useProjectIdInUrl();
  const { mutateAsync: addDashboard } = useAddDashboard(useDashboardQueryKey());

  //其他逻辑
  const submit = async () => {
    await addDashboard({ name, projectId });
    setName("");
  };
  return (
    <Container>
      <Input
        size={"large"}
        placeholder={"新建看板名称"}
        onPressEnter={submit}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </Container>
  );
});
