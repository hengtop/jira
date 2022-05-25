import { UserType } from "./index";
import { Table, TableColumnType } from "antd";

interface ProjectType {
  id: number;
  name: string;
  personId: number;
}
interface ListPropsType {
  users: UserType[];
  list: ProjectType[];
}

export default function List({ users, list }: ListPropsType) {
  const columns: TableColumnType<ProjectType>[] = [
    {
      title: "名称",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "负责人",
      render(value, project) {
        return (
          <span>
            {users.find((user: UserType) => user.id === project.personId)
              ?.name || "-"}
          </span>
        );
      },
    },
  ];
  return <Table pagination={false} columns={columns} dataSource={list}></Table>;
}
