import type { ProjectType } from "types/project";
import type { UserType } from "types/user";
import { useDispatch } from "react-redux";
import { projectListAction } from "screens/project-list/store/project-list.slice";
import {
  Dropdown,
  Menu,
  Modal,
  Table,
  TableColumnType,
  TableProps,
} from "antd";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { useAddProject, useEditProject } from "hooks";
import {
  useProjectModal,
  useProjectsQueryKey,
} from "screens/project-list/utils";

import Star from "components/star";
import { ButtonNoPadding } from "components/lib";
import { useDeleteProject } from "hooks/use-projects";

interface ListPropsType extends TableProps<ProjectType> {
  users: UserType[];
  //refresh?: () => void;
}

export default function List({ users, ...props }: ListPropsType) {
  const { mutate } = useEditProject(useProjectsQueryKey());
  const { mutate: deleteProject } = useDeleteProject(useProjectsQueryKey());
  const confirmDeleteProject = (id: number) => {
    Modal.confirm({
      title: "确定删除这个项目吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk() {
        deleteProject({ id });
      },
    });
  };
  const dispatch = useDispatch();
  const { open, startEdit } = useProjectModal();
  // 柯里化
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });
  const columns: TableColumnType<ProjectType>[] = [
    {
      title: <Star checked={true} disabled={true} />,
      render(value, project) {
        return (
          <Star
            checked={project.pin}
            disabled={true}
            onCheckedChange={pinProject(project.id)}
          />
        );
      },
    },
    {
      title: "名称",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render(value, project) {
        return <Link to={String(project.id)}>{project.name}</Link>;
      },
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
    {
      render(value, project) {
        return (
          <Dropdown
            overlay={
              <Menu
                items={[
                  {
                    key: "edit",
                    label: (
                      <ButtonNoPadding
                        onClick={() => {
                          startEdit(project.id);
                          dispatch(projectListAction.openProjectModal());
                        }}
                        type="link"
                      >
                        编辑
                      </ButtonNoPadding>
                    ),
                  },
                  {
                    key: "delete",
                    label: (
                      <ButtonNoPadding
                        onClick={() => confirmDeleteProject(project.id)}
                        type="link"
                      >
                        删除
                      </ButtonNoPadding>
                    ),
                  },
                ]}
              ></Menu>
            }
          >
            <ButtonNoPadding type="link">...</ButtonNoPadding>
          </Dropdown>
        );
      },
    },
  ];
  return (
    <Table
      rowKey={"id"}
      pagination={false}
      columns={columns}
      {...props}
    ></Table>
  );
}
