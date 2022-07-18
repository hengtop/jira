import React, { memo } from "react";
import { Link } from "react-router-dom";
import { Navigate, Route, Routes, useLocation } from "react-router";
import Dashboard from "screens/dashboard";
import Epic from "screens/epic";
import styled from "@emotion/styled";
import { Menu } from "antd";

const useRouteType = () => {
  const units = useLocation().pathname.split("/");
  return units[units.length - 1];
};

export default memo(function ProjectScreen() {
  //props/state
  const routeType = useRouteType();
  //redux hooks

  //other hooks

  //其他逻辑

  return (
    <Container>
      <Aside>
        <Menu
          mode="inline"
          items={[
            {
              key: "dashboard",
              label: <Link to={"dashboard"}>看板</Link>,
            },
            {
              key: "epic",
              label: <Link to={"epic"}>任务</Link>,
            },
          ]}
          selectedKeys={[routeType]}
        ></Menu>
      </Aside>
      <Main>
        <Routes>
          <Route index element={<Navigate to={"dashboard"} replace />} />
          <Route path={"/dashboard"} element={<Dashboard />}></Route>
          <Route path={"/epic"} element={<Epic />}></Route>
        </Routes>
      </Main>
    </Container>
  );
});

const Aside = styled.aside`
  background-color: #f4f5f7;
  display: flex;
`;

const Main = styled.div`
  display: flex;
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
  overflow: hidden;
`;
