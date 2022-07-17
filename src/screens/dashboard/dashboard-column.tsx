import type { DashboardType } from "types/dashboard";
import { useTasks } from "hooks";
import { useTaskSearchParams } from "./utils";
import { useTaskTypes } from "hooks/use-task";

import taskIcon from "assets/img/task.svg";
import bugIcon from "assets/img/bug.svg";
import styled from "@emotion/styled";
import { Card } from "antd";

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name;
  if (!name) {
    return null;
  }
  return <img src={name === "task" ? taskIcon : bugIcon} alt="" />;
};

export const DashboardColumn = ({
  dashboard,
}: {
  dashboard: DashboardType;
}) => {
  /* 这里表面上在每一个column中都会发送请求获取一次数据，react-query默认帮我们优化了请求，两秒内相同的请求发出，后面的请求并不会发出而直接使用第一次请求的cache */
  const { data: allTasks } = useTasks(useTaskSearchParams());
  const tasks = allTasks?.filter((task) => task.kanbanId === dashboard.id);
  return (
    <Container>
      {dashboard.name}
      <TasksContainer>
        {tasks?.map((task) => (
          <Card style={{ marginBottom: "0.5rem" }} key={task.id}>
            <TaskTypeIcon id={task.typeId} />
            <div>{task.name}</div>
          </Card>
        ))}
      </TasksContainer>
    </Container>
  );
};

const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: #f4f5f7;
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`;

const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;
  ::-webkit-scrollbar {
    display: none;
  }
`;
