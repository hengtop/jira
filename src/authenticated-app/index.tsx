import { useState } from "react";
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
import ProjectPopover from "components/project-popover";
import { ButtonNoPadding } from "components/lib";
import ProjectModal from "screens/project-list/project-modal";
import { ReactComponent as SoftwareLogo } from "assets/img/software-logo.svg";
import { resetRouter } from "utils";
import { Dropdown, Menu, Button } from "antd";
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";

export default function Index() {
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  return (
    <Container>
      <HeaderBar
        projectButton={
          <ButtonNoPadding
            onClick={() => setProjectModalOpen(true)}
            type="link"
          >
            创建项目
          </ButtonNoPadding>
        }
      />
      <Main>
        <BrowserRouter>
          <Routes>
            <Route
              path={"/projects"}
              element={
                <ProjectList
                  projectButton={
                    <ButtonNoPadding
                      onClick={() => setProjectModalOpen(true)}
                      type="link"
                    >
                      创建项目
                    </ButtonNoPadding>
                  }
                />
              }
            />
            <Route
              path={"/projects/:projectId/*"}
              element={<ProjectScreen />}
            />
            <Route path="*" element={<Navigate to="/projects" />} />
          </Routes>
        </BrowserRouter>
      </Main>
      <ProjectModal
        projectModalOpen={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
      />
    </Container>
  );
}

// 简单的提取操作
export const HeaderBar = (props: { projectButton: JSX.Element }) => {
  return (
    <PageHeader between>
      <PageHeaderLeft gap>
        {/* 这里注意我们是使用的svg的形式引入的图片，这样我们就可以利用svg的样式修改图片的样式了 */}
        <ButtonNoPadding type="link" onClick={resetRouter}>
          <SoftwareLogo width={"18rem"} color="#2684FF" />
        </ButtonNoPadding>

        <ProjectPopover {...props} />
        <span>用户</span>
      </PageHeaderLeft>
      <PageHeaderRight>
        <User />
      </PageHeaderRight>
    </PageHeader>
  );
};

export const User = () => {
  const { logout, user } = useAuth();
  return (
    <Dropdown
      overlay={
        <Menu
          items={[
            {
              label: (
                <Button type="link" onClick={logout}>
                  登出
                </Button>
              ),
              key: "logout",
            },
          ]}
        ></Menu>
      }
    >
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <Button type="link" onClick={(e) => e.preventDefault()}>
        Hi, {user?.name}
      </Button>
    </Dropdown>
  );
};
