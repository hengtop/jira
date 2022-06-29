import { UserType } from "./index";
import { Table, TableColumnType, TableProps } from "antd";
import dayjs from "dayjs";

export interface ProjectType {
  id: number;
  name: string;
  personId: number | string;
  organization: string;
  created: number;
  pin: boolean;
}
interface ListPropsType extends TableProps<ProjectType> {
  users: UserType[];
}

export default function List({ users, ...props }: ListPropsType) {
  const columns: TableColumnType<ProjectType>[] = [
    {
      title: "名称",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "部门",
      dataIndex: "organization",
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
    {
      title: "创建时间",
      render(value, project) {
        return (
          <span>
            {project.created
              ? dayjs(project.created).format("YYYY-MM-DD")
              : "无"}
          </span>
        );
      },
    },
  ];
  return <Table pagination={false} columns={columns} {...props}></Table>;
}
