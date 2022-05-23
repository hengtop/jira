import { useState, useEffect } from "react";
import qs from "qs";
import { cleanObject } from "utls";
import { useMount, useDebounce } from "hooks";

import SearchPanel from "./search-panel";
import List from "./list";

export interface UserType {
  id: number;
  name: string;
}

const apiUrl = process.env.REACT_APP_API_URL;

export const Index = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [list, setList] = useState([]);

  let debounceParams = useDebounce(param, 500);
  // 这里的防抖和一般的防抖思路不一样，我们是控制参数的更新来达到防抖的效果
  useEffect(() => {
    fetch(
      `${apiUrl}/projects?${qs.stringify(cleanObject(debounceParams))}`,
    ).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [debounceParams]);

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  });

  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  );
};
