import React, { memo } from "react";
import { useUsers } from "hooks";

import { Popover, Typography, List, Divider } from "antd";
import styled from "@emotion/styled";

export default memo(function UserPopover() {
  //props/state
  const { data: users, refetch } = useUsers();
  const content = (
    <PopoverContainer>
      <Typography.Text type={"secondary"}>组员列表</Typography.Text>
      <List>
        {users?.map((user) => (
          <List.Item key={user.id}>
            <List.Item.Meta title={user.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
    </PopoverContainer>
  );
  //redux hooks

  //other hooks

  //其他逻辑

  return (
    <Popover
      onVisibleChange={() => refetch()}
      placement={"bottom"}
      content={content}
    >
      组员
    </Popover>
  );
});

const PopoverContainer = styled.div`
  width: 30rem;
`;
