import React, { memo } from "react";
import { useProjects } from "hooks";

import { Popover, Typography, List, Divider } from "antd";
import { ButtonNoPadding } from "components/lib";
import styled from "@emotion/styled";

export default memo(function ProjectPopover(props: {
  setProjectModalOpen: (isOpen: boolean) => void;
}) {
  //props/state
  const { data: projects, isLoading } = useProjects();
  //所有的已收藏项目
  const pinnedProjects = projects?.filter((project) => project.pin);
  const content = (
    <PopoverContainer>
      <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map((project) => (
          <List.Item key={project.id}>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <ButtonNoPadding
        onClick={() => props.setProjectModalOpen(true)}
        type="link"
      >
        创建项目
      </ButtonNoPadding>
    </PopoverContainer>
  );
  //redux hooks

  //other hooks

  //其他逻辑

  return (
    <Popover placement={"bottom"} content={content}>
      项目
    </Popover>
  );
});

const PopoverContainer = styled.div`
  width: 30rem;
`;
