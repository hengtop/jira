import { useState } from "react";
import {
  useDebounce,
  useProjects,
  useUsers,
  useDocumentTitle,
  useUrlQueryParam,
} from "hooks";
import { Helmet } from "react-helmet";

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
  const [keys] = useState<("name" | "personId")[]>(["name", "personId"]);
  const [param, setParam] = useUrlQueryParam(keys);
  const debounceParams = useDebounce(param, 500);
  const { isLoading, error, data: list } = useProjects(debounceParams);
  const { data: users } = useUsers();
  useDocumentTitle("项目列表", false);

  return (
    <Container>
      {/* <Helmet>
        <title>项目列表</title>
      </Helmet> */}
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type="danger">{error?.message}</Typography.Text>
      ) : null}
      <List users={users || []} dataSource={list || []} loading={isLoading} />
    </Container>
  );
};

//设置为true开启本组件重复渲染检查
Index.whyDidYouRender = false;
