import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  projectListAction,
  selectProjectModalOpen,
} from "screens/project-list/store/project-list.slice";
import { Button, Drawer } from "antd";

export default memo(function ProjectModal() {
  //props/state

  //redux hooks
  const dispatch = useDispatch();
  const projectModalOpen = useSelector(selectProjectModalOpen);
  //other hooks

  //其他逻辑

  return (
    <Drawer
      onClose={() => dispatch(projectListAction.closeProjectModal())}
      visible={projectModalOpen}
      width={"100%"}
    >
      <h1>projec tmodal</h1>
      <Button onClick={() => dispatch(projectListAction.closeProjectModal())}>
        关闭
      </Button>
    </Drawer>
  );
});
