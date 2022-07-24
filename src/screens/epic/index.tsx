import React, { memo, useState } from "react";
import dayjs from "dayjs";
import { useTasks } from "hooks";
import { Link } from "react-router-dom";

import { Row, ScreenContainer } from "components/lib";
import { useDeleteEpic, useEpics } from "hooks/use-epic";
import { useEpicQueryKey, useEpicSearchParams } from "./utils";
import { useProjectInUrl } from "screens/dashboard/utils";
import { List, Button, Modal } from "antd";
import CreateEpic from "./create-epic";

export default memo(function Epic() {
  //props/state
  const [createEpicOpen, setCreateEpicOpen] = useState(false);
  //redux hooks

  //other hooks
  const { data: currentProject } = useProjectInUrl();
  const { data: epics } = useEpics(useEpicSearchParams());
  const { data: tasks } = useTasks({ projectId: currentProject?.id });
  const { mutate: deleteEpic } = useDeleteEpic(useEpicQueryKey());
  //其他逻辑
  const confirmDeleteProject = (id: number) => {
    Modal.confirm({
      title: "确定删除这个任务组吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk() {
        deleteEpic({ id });
      },
    });
  };
  return (
    <ScreenContainer>
      <Row between>
        <h1>{currentProject?.name} 任务组</h1>
        <Button
          onClick={() => {
            setCreateEpicOpen(true);
          }}
          type={"link"}
        >
          创建任务组
        </Button>
      </Row>
      <List
        style={{ overflow: "scroll" }}
        dataSource={epics}
        itemLayout={"vertical"}
        renderItem={(epic) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Row between>
                  <span>{epic.name}</span>
                  <Button
                    type="link"
                    onClick={() => confirmDeleteProject(epic.id)}
                  >
                    删除
                  </Button>
                </Row>
              }
              description={
                <div>
                  <div>开始时间：{dayjs(epic.start).format("YYYY-MM-DD")}</div>
                  <div>结束时间：{dayjs(epic.end).format("YYYY-MM-DD")}</div>
                </div>
              }
            />
            <div>
              {tasks
                ?.filter((task) => task.epicId === epic.id)
                .map((task) => (
                  <Link
                    to={`/projects/${currentProject?.id}/dashboard?editingTaskId=${task.id}`}
                    key={task.id}
                  >
                    {task.name}
                  </Link>
                ))}
            </div>
          </List.Item>
        )}
      />
      <CreateEpic
        visible={createEpicOpen}
        onClose={() => setCreateEpicOpen(false)}
      />
    </ScreenContainer>
  );
});
