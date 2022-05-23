import type { PropsWithChildren } from "react";
import { UserType } from "./index";

interface SearchPanelType {
  users: UserType[];
  param: {
    name: string;
    personId: number | string;
  };
  setParam: (param: any) => void;
}

export default function SearchPanel({
  users,
  param,
  setParam,
}: PropsWithChildren<SearchPanelType>) {
  return (
    <form action="#">
      <div>
        <input
          type="text"
          value={param.name}
          onChange={(e) =>
            setParam({
              ...param,
              name: e.target.value,
            })
          }
        ></input>
        <select
          value={param.personId}
          onChange={(e) =>
            setParam({
              ...param,
              personId: e.target.value,
            })
          }
        >
          <option value={""}>负责人</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
}
