import { useAddTask } from "hooks/use-task";
import React, { memo, useEffect, useState } from "react";
import { useProjectIdInUrl, useTaskQueryKey } from "./utils";
import { Input, Card } from "antd";
import styled from "@emotion/styled";

export default memo(function Index({ dashboardId }: { dashboardId: number }) {
  //props/state
  const [name, setName] = useState("");
  //redux hooks

  //other hooks
  const { mutateAsync: addTask } = useAddTask(useTaskQueryKey());
  const projectId = useProjectIdInUrl();
  //其他逻辑
  const [inputMode, setInputMode] = useState(false);
  const submit = async () => {
    await addTask({ projectId, name, kanbanId: dashboardId });
    setInputMode(false);
    setName("");
  };
  const toggle = () => setInputMode((mode) => !mode);
  useEffect(() => {
    if (!inputMode) {
      setName("");
    }
  }, [inputMode]);
  if (!inputMode) {
    return <AddTaskContainer onClick={toggle}>+创建事务</AddTaskContainer>;
  }
  return (
    <Card>
      <Input
        onBlur={toggle}
        placeholder={"需要做些什么"}
        autoFocus
        onPressEnter={submit}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </Card>
  );
});

export const AddTaskContainer = styled.div`
  cursor: pointer;
  background-color: #fff;
  padding: 5px 8px;
  border-radius: 6px;
`;
