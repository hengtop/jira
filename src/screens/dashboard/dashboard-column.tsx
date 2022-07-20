import type { DashboardType } from "types/dashboard";
import type { TaskType } from "types/task";
import { useTasks } from "hooks";
import { useDashboardQueryKey, useTaskSearchParams } from "./utils";
import { useTasksModal, useTaskTypes } from "hooks/use-task";

import taskIcon from "assets/img/task.svg";
import bugIcon from "assets/img/bug.svg";
import styled from "@emotion/styled";
import { Button, Card, Dropdown, Menu, Modal } from "antd";
import { Mark } from "components/mark";
import CreateTask from "./create-task";
import { useDeleteDashboard } from "hooks/use-dashboard";
import { Row } from "components/lib";
import { forwardRef } from "react";

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name;
  if (!name) {
    return null;
  }
  return <img src={name === "task" ? taskIcon : bugIcon} alt="" />;
};

export const DashboardColumn = forwardRef<
  HTMLDivElement,
  { dashboard: DashboardType }
>(({ dashboard, ...props }, ref) => {
  /* 这里表面上在每一个column中都会发送请求获取一次数据，react-query默认帮我们优化了请求，两秒内相同的请求发出，后面的请求并不会发出而直接使用第一次请求的cache */
  const { data: allTasks } = useTasks(useTaskSearchParams());
  const tasks = allTasks?.filter((task) => task.kanbanId === dashboard.id);
  return (
    <Container ref={ref} {...props}>
      <Row between>
        <TaskTitle>{dashboard.name}</TaskTitle>
        <More dashboard={dashboard} />
      </Row>
      <TasksContainer>
        {tasks?.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        <CreateTask dashboardId={dashboard.id} />
      </TasksContainer>
    </Container>
  );
});

export const Container = styled.div`
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

const TaskTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 500;
  padding: 3px 5px;
`;

const TaskCard = ({ task }: { task: TaskType }) => {
  const { startEdit } = useTasksModal();
  const { name: keyword } = useTaskSearchParams();
  return (
    <Card
      onClick={() => startEdit(task.id)}
      style={{ marginBottom: "0.5rem" }}
      key={task.id}
    >
      <p>
        <Mark name={task.name} keyword={keyword} />
      </p>
      <TaskTypeIcon id={task.typeId} />
    </Card>
  );
};

const More = ({ dashboard }: { dashboard: DashboardType }) => {
  const { mutateAsync: deleteDashboard } = useDeleteDashboard(
    useDashboardQueryKey(),
  );
  const confirmDeleteDashboard = () => {
    Modal.confirm({
      okText: "确定",
      cancelText: "取消",
      title: "确定删除看板吗",
      onOk() {
        deleteDashboard({ id: dashboard.id });
      },
    });
  };
  const overlay = (
    <Menu
      items={[
        {
          key: "remove",
          label: (
            <Button type="link" onClick={confirmDeleteDashboard}>
              删除
            </Button>
          ),
        },
      ]}
    ></Menu>
  );
  return (
    <Dropdown overlay={overlay}>
      <Button type="link">...</Button>
    </Dropdown>
  );
};
