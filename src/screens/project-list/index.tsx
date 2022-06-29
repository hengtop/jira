import { useState, useEffect, useCallback } from "react";
import { cleanObject } from "utls";
import { useMount, useDebounce } from "hooks";
import { useHttp } from "network";

import SearchPanel from "./search-panel";
import List from "./list";
import { Container } from "./style";

export interface UserType {
  id: number;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

export const Index = () => {
  const client = useHttp();
  const [users, setUsers] = useState<UserType[]>([]);
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [list, setList] = useState([]);

  let debounceParams = useDebounce(param, 500);
  // 这里的防抖和一般的防抖思路不一样，我们是控制参数的更新来达到防抖的效果
  useEffect(() => {
    client("/projects", {
      params: cleanObject(debounceParams),
    }).then(setList);
    // 这里注意不能将client添加到依赖数组中，否则会导致刷新
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceParams]);

  useMount(
    useCallback(() => {
      client("/users").then(setUsers);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  return (
    <Container>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </Container>
  );
};
