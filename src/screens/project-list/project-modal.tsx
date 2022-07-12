import React, { memo, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import {
  projectListAction,
  selectProjectModalOpen,
} from "screens/project-list/store/project-list.slice";
import { Button, Drawer, Spin, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import {
  useProjectModal,
  useProjectsQueryKey,
} from "screens/project-list/utils";
import UserSelect from "components/user-select";
import { useAddProject, useEditProject } from "hooks";
import { ErrorBox } from "components/lib";

export default memo(function ProjectModal() {
  //props/state

  //redux hooks
  const {
    projectModalOpen: urlProjectModalOpen,
    open,
    close,
    editingProject,
    isLoading,
  } = useProjectModal();

  const dispatch = useDispatch();
  const projectModalOpen = useSelector(selectProjectModalOpen);
  const useMutateProject = editingProject ? useEditProject : useAddProject;
  const {
    mutateAsync,
    error,
    isLoading: mutateLoading,
  } = useMutateProject(useProjectsQueryKey());
  const [form] = useForm();
  useEffect(() => {
    if (urlProjectModalOpen) {
      dispatch(projectListAction.openProjectModal());
    } else {
      dispatch(projectListAction.closeProjectModal());
    }
  }, [urlProjectModalOpen, dispatch]);
  //other hooks
  useEffect(() => {
    form.setFieldsValue(editingProject);
  }, [editingProject, form]);
  //其他逻辑
  const title = editingProject ? "编辑项目" : "创建项目";
  const onFinish = (formValue: any) => {
    mutateAsync({ ...editingProject, ...formValue }).then(() => {
      onCloseModal();
    });
  };
  const onCloseModal = useCallback(() => {
    form.resetFields();
    close();
    dispatch(projectListAction.closeProjectModal());
  }, [close, dispatch, form]);
  return (
    <Drawer
      forceRender={true}
      onClose={onCloseModal}
      visible={projectModalOpen}
      width={"100%"}
    >
      {isLoading ? (
        <Container>
          <Spin size="large" />
        </Container>
      ) : (
        <Container>
          <h1>{title}</h1>
          <ErrorBox error={error} />
          <Form
            form={form}
            layout="vertical"
            style={{ width: "40rem" }}
            onFinish={onFinish}
          >
            <Form.Item
              label="名称"
              name={"name"}
              rules={[{ required: true, message: "请输入项目名" }]}
            >
              <Input placeholder="请输入项目名"></Input>
            </Form.Item>
            <Form.Item
              label="部门"
              name={"organization"}
              rules={[{ required: true, message: "请输入部门名" }]}
            >
              <Input placeholder="请输入部门名"></Input>
            </Form.Item>
            <Form.Item label="负责人" name={"personId"}>
              <UserSelect defaultOptionName="负责人" />
            </Form.Item>
            <Form.Item style={{ textAlign: "center" }}>
              <Button
                loading={mutateLoading}
                type={"primary"}
                htmlType={"submit"}
              >
                提交
              </Button>
            </Form.Item>
          </Form>
        </Container>
      )}
    </Drawer>
  );
});

const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
