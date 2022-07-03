import { useDebounce, useProjects, useUsers, useDocumentTitle } from "hooks";
import { Helmet } from "react-helmet";
import { useProjectSearchParams } from "./utils";
import { projectListAction } from "screens/project-list/store/project-list.slice";
import { useDispatch } from "react-redux";

import SearchPanel from "./search-panel";
import List from "./list";
import { Container } from "./style";
import { Typography } from "antd";
import { ButtonNoPadding } from "components/lib";
import { Row } from "components/lib";

export interface UserType {
  id: number;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

export const Index = () => {
  const [param, setParam] = useProjectSearchParams();
  const {
    isLoading,
    error,
    data: list,
    retry,
  } = useProjects(useDebounce(param, 500));
  const { data: users } = useUsers();
  useDocumentTitle("项目列表", false);
  const dispatch = useDispatch();

  return (
    <Container>
      {/* <Helmet>
        <title>项目列表</title>
      </Helmet> */}
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding
          onClick={() => dispatch(projectListAction.openProjectModal())}
          type="link"
        >
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type="danger">{error?.message}</Typography.Text>
      ) : null}
      <List
        refresh={retry}
        users={users || []}
        dataSource={list || []}
        loading={isLoading}
      />
    </Container>
  );
};

//设置为true开启本组件重复渲染检查
Index.whyDidYouRender = false;
