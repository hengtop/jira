import React, { memo } from "react";
import { Link } from "react-router-dom";
import { Navigate, Route, Routes } from "react-router";
import Dashboard from "screens/dashboard";
import Epic from "screens/epic";

export default memo(function ProjectScreen() {
  //props/state

  //redux hooks

  //other hooks

  //其他逻辑

  return (
    <div>
      <h1>我是project</h1>
      <Link to={"dashboard"}>看板</Link>
      <Link to={"epic"}>任务</Link>
      <Routes>
        <Route index element={<Navigate to={"dashboard"} replace />} />
        <Route path={"/dashboard"} element={<Dashboard />}></Route>
        <Route path={"/epic"} element={<Epic />}></Route>
      </Routes>
    </div>
  );
});
