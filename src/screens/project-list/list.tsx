import type { PropsWithChildren } from "react";
import { UserType } from "./index";

interface ProjectType {
  id: number;
  name: string;
  personId: number;
}
interface ListPropsType {
  users: UserType[];
  list: ProjectType[];
}

export default function List({
  users,
  list,
}: PropsWithChildren<ListPropsType>) {
  return (
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list.map((project, index) => (
          <tr key={project.id}>
            <td>{project.name}</td>
            <td>{users.find((user) => user.id === project.personId)?.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
