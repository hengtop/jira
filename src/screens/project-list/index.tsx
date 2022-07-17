import type { UserType } from "types/user";
import { useDebounce, useProjects, useUsers, useDocumentTitle } from "hooks";
import { Helmet } from "react-helmet";
import { useProjectSearchParams } from "./utils";
import { projectListAction } from "screens/project-list/store/project-list.slice";
import { useDispatch } from "react-redux";
import { useProjectModal } from "screens/project-list/utils";

import SearchPanel from "./search-panel";
import List from "./list";
import { Container } from "./style";
import { Typography } from "antd";
import { ButtonNoPadding } from "components/lib";
import { Row, ErrorBox } from "components/lib";

export const Index = () => {
  const [param, setParam] = useProjectSearchParams();
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 500));
  const { data: users } = useUsers();
  useDocumentTitle("项目列表", false);
  const dispatch = useDispatch();
  const { open } = useProjectModal();

  return (
    <Container>
      {/* <Helmet>
        <title>项目列表</title>
      </Helmet> */}
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding
          onClick={() => {
            open();
            dispatch(projectListAction.openProjectModal());
          }}
          type="link"
        >
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? <ErrorBox error={error} /> : null}
      <List users={users || []} dataSource={list || []} loading={isLoading} />
    </Container>
  );
};

//设置为true开启本组件重复渲染检查
Index.whyDidYouRender = false;
