import React, { memo } from "react";
import { Button, Drawer } from "antd";

export default memo(function ProjectModal(props: {
  projectModalOpen: boolean;
  onClose: () => void;
}) {
  //props/state

  //redux hooks

  //other hooks

  //其他逻辑

  return (
    <Drawer
      onClose={props.onClose}
      visible={props.projectModalOpen}
      width={"100%"}
    >
      <h1>projec tmodal</h1>
      <Button onClick={props.onClose}>关闭</Button>
    </Drawer>
  );
});
