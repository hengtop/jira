import React, { memo } from "react";
import { Link } from "react-router-dom";
import { Navigate, Route, Routes } from "react-router";
import Dashbord from "screens/dashbord";
import Epic from "screens/epic";

export default memo(function ProjectScreen() {
  //props/state

  //redux hooks

  //other hooks

  //其他逻辑

  return (
    <div>
      <h1>我是project</h1>
      <Link to={"dashbord"}>看板</Link>
      <Link to={"epic"}>任务</Link>
      <Routes>
        <Route path={"/dashbord"} element={<Dashbord />}></Route>
        <Route path={"/epic"} element={<Epic />}></Route>
        <Route path="*" element={<Navigate to={"dashbord"} />} />
      </Routes>
    </div>
  );
});
