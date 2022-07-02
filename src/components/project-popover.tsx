import React, { memo } from "react";
import { useProjects } from "hooks";

import { Popover, Typography, List, Divider } from "antd";
import styled from "@emotion/styled";

export default memo(function ProjectPopover(props: {
  projectButton: JSX.Element;
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
      {props.projectButton}
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
