import { useSetUrlSearchParam } from "hooks";
import { useTaskSearchParams } from "./utils";

import { Row } from "components/lib";
import { Button, Input } from "antd";
import UserSelect from "components/user-select";
import TaskTypeSelect from "components/task-type-select";

export const SearchPanel = () => {
  const searchParams = useTaskSearchParams();
  console.log(searchParams);
  const setSearchParams = useSetUrlSearchParam();
  const reset = () => {
    setSearchParams({
      typeId: null,
      processorId: null,
      tagId: null,
      name: null,
    });
  };
  return (
    <Row marginBottom={10} gap={true}>
      <Input
        style={{ width: "20rem" }}
        placeholder={"任务名"}
        value={searchParams.name}
        onChange={(e) => setSearchParams({ name: e.target.value })}
      />
      <UserSelect
        defaultOptionName={"经办人"}
        value={searchParams.processorId}
        onChange={(value) => setSearchParams({ processorId: value })}
      />
      <TaskTypeSelect
        defaultOptionName={"类型"}
        value={searchParams.typeId}
        onChange={(value) => setSearchParams({ typeId: value })}
      />
      <Button type="primary" onClick={reset}>
        重置
      </Button>
    </Row>
  );
};
