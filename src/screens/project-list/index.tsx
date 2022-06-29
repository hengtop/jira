import { useState, useCallback } from "react";
import { useMount, useDebounce, useProjects, useUsers } from "hooks";
import { useHttp } from "network";

import SearchPanel from "./search-panel";
import List from "./list";
import { Container } from "./style";
import { Typography } from "antd";

export interface UserType {
  id: number;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

export const Index = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debounceParams = useDebounce(param, 500);
  const { isLoading, error, data: list } = useProjects(debounceParams);
  const { data: users } = useUsers();

  return (
    <Container>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type="danger">{error?.message}</Typography.Text>
      ) : null}
      <List users={users || []} dataSource={list || []} loading={isLoading} />
    </Container>
  );
};
