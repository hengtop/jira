import { useState, useEffect } from "react";
import qs from "qs";
import { cleanObject } from "utls";

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
  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(
      async (response) => {
        if (response.ok) {
          setList(await response.json());
        }
      },
    );
  }, [param]);
  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  }, []);

  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  );
};
