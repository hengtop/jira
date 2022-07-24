import React, { memo, useEffect } from "react";
import styled from "@emotion/styled";

import { Drawer, DrawerProps, Form, Spin, Input, Button } from "antd";
import { useAddEpic } from "hooks/use-epic";
import { useForm } from "antd/es/form/Form";
import { ErrorBox } from "components/lib";
import { useEpicQueryKey, useProjectIdInUrl } from "./utils";

export default memo(function Index(
  props: Pick<DrawerProps, "visible"> & { onClose: () => void },
) {
  //props/state

  //redux hooks

  //other hooks
  const [form] = useForm();
  const projectId = useProjectIdInUrl();
  const { mutate: addEpic, isLoading, error } = useAddEpic(useEpicQueryKey());
  //其他逻辑
  const onFinish = async (values: any) => {
    await addEpic({ ...values, projectId });
    props.onClose();
  };

  useEffect(() => {
    form.resetFields();
  }, [form, props.visible]);

  return (
    <Drawer
      visible={props.visible}
      onClose={props.onClose}
      forceRender
      destroyOnClose
      width={"100%"}
    >
      <Container>
        <h1>创建任务组</h1>
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
            rules={[{ required: true, message: "请输入任务组名称" }]}
          >
            <Input placeholder="请输入任务组名称"></Input>
          </Form.Item>
          <Form.Item style={{ textAlign: "center" }}>
            <Button loading={isLoading} type={"primary"} htmlType={"submit"}>
              提交
            </Button>
          </Form.Item>
        </Form>
      </Container>
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
