import React, { memo } from "react";
import { useProjects } from "hooks";

import { Popover, Typography, List, Divider } from "antd";
import { ButtonNoPadding } from "components/lib";
import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import { projectListAction } from "screens/project-list/store/project-list.slice";

export default memo(function ProjectPopover() {
  //props/state
  const { data: projects, isLoading } = useProjects();
  const dispatch = useDispatch();
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
        onClick={() => dispatch(projectListAction.openProjectModal())}
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
