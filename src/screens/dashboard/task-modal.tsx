import React, { memo, useEffect } from "react";
import { useEditTask, useTasksModal, useDeleteTask } from "hooks/use-task";
import { useTaskQueryKey } from "./utils";

import { Modal, Form, Input, Button } from "antd";
import { useForm } from "antd/es/form/Form";
import UserSelect from "components/user-select";
import TaskTypeSelect from "components/task-type-select";

export default memo(function Index() {
  //props/state

  //redux hooks

  //other hooks
  const [form] = useForm();
  const { editingTaskId, editingTask, close } = useTasksModal();
  const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(
    useTaskQueryKey(),
  );
  const { mutateAsync: deleteTask } = useDeleteTask(useTaskQueryKey());
  //其他逻辑
  const onCancel = () => {
    close();
    form.resetFields();
  };
  const onOk = async () => {
    await editTask({ ...editingTask, ...form.getFieldsValue() });
    close();
  };

  const confirmDeleteTask = () => {
    Modal.confirm({
      okText: "确定",
      cancelText: "取消",
      title: "确定删除当前任务吗",
      onOk() {
        deleteTask({ id: Number(editingTaskId) });
        close();
      },
    });
  };
  useEffect(() => {
    form.setFieldsValue(editingTask);
  }, [form, editingTask]);
  return (
    <Modal
      forceRender
      okText="确认"
      cancelText="取消"
      confirmLoading={editLoading}
      title="编辑任务"
      visible={!!editingTaskId}
      onCancel={onCancel}
      onOk={onOk}
    >
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        initialValues={editingTask}
        form={form}
      >
        <Form.Item
          label={"任务名"}
          name={"name"}
          rules={[{ required: true, message: "请输入任务名" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"经办人"}
          name={"processorId"}
          rules={[{ required: true, message: "请选择经办人" }]}
        >
          <UserSelect defaultOptionName="经办人" />
        </Form.Item>
        <Form.Item
          label={"类型"}
          name={"typeId"}
          rules={[{ required: true, message: "请输入任务类型" }]}
        >
          <TaskTypeSelect />
        </Form.Item>
        <div style={{ textAlign: "right" }}>
          <Button onClick={confirmDeleteTask} type="primary">
            删除
          </Button>
        </div>
      </Form>
    </Modal>
  );
});
