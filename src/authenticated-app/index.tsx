import { useAuth } from "context/auth";
import { Index as ProjectList } from "screens/project-list";
import ProjectScreen from "screens/project";
import {
  Container,
  PageHeader,
  Main,
  PageHeaderLeft,
  PageHeaderRight,
} from "./style";
import { ReactComponent as SoftwareLogo } from "assets/img/software-logo.svg";
import { Dropdown, Menu, Button } from "antd";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";

export default function Index() {
  return (
    <Container>
      <HeaderBar />
      <Main>
        <BrowserRouter>
          <Routes>
            <Route path={"/projects"} element={<ProjectList />}></Route>
            <Route
              path={"/projects/:projectId/*"}
              element={<ProjectScreen />}
            ></Route>
          </Routes>
        </BrowserRouter>
      </Main>
    </Container>
  );
}

// 简单的提取操作
export const HeaderBar = () => {
  const { logout, user } = useAuth();
  return (
    <PageHeader between>
      <PageHeaderLeft gap>
        {/* 这里注意我们是使用的svg的形式引入的图片，这样我们就可以利用svg的样式修改图片的样式了 */}
        <SoftwareLogo width={"18rem"} color="#2684FF" />
        <h2>项目</h2>
        <h2>用户</h2>
      </PageHeaderLeft>
      <PageHeaderRight>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key={"logout"}>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <Button type="link" onClick={logout}>
                  登出
                </Button>
              </Menu.Item>
            </Menu>
          }
        >
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Button type="link" onClick={(e) => e.preventDefault()}>
            Hi, {user?.name}
          </Button>
        </Dropdown>
      </PageHeaderRight>
    </PageHeader>
  );
};
