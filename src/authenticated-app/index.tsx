import { useAuth } from "context/auth";
import { Index as ProjectList } from "screens/project-list";
import {
  Container,
  PageHeader,
  Main,
  PageHeaderLeft,
  PageHeaderRight,
} from "./style";
import { ReactComponent as SoftwareLogo } from "assets/img/software-logo.svg";
import { Dropdown, Menu, Button } from "antd";

export default function Index() {
  const { logout, user } = useAuth();
  return (
    <Container>
      <PageHeader between>
        <PageHeaderLeft gap>
          {/* 这里注意我们是使用的svg的形式引入的图片，这样我们就可以利用svg的样式修改图片的样式了 */}
          <SoftwareLogo width={"18rem"} color="#2684FF" />
          <h3>项目</h3>
          <h3>用户</h3>
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
      <Main>
        {user ? `登录成功${user.name}` : ""}
        <ProjectList />
      </Main>
    </Container>
  );
}
