import React, { memo } from "react";
import IdSelect from "./id-select";

import { useTaskTypes } from "hooks";

export default memo(function UserSelect(
  props: React.ComponentProps<typeof IdSelect>,
) {
  //props/state

  //redux hooks

  //other hooks
  const { data: taskTypes } = useTaskTypes();

  //其他逻辑

  return <IdSelect {...props} options={taskTypes || []} />;
});
