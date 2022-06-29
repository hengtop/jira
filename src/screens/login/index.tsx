import { useState } from "react";
import { useAuth } from "context/auth";
import { Form, Input, Divider, Button } from "antd";
import { LongButton, Title } from "./style";

export const LoginScreen = () => {
  const { login, register } = useAuth();
  const [isRegister, setIsregister] = useState(false);

  // 这里FormEvent如果不传泛型默认为Element，传了HTMLFormElement不报错的原因是因为HTMLFormElement继承了Element，所以可以借助类型兼容，因为js是面向结构编程（鸭子类型）不在乎你的类型只在乎你有没有对应的结构（属性）
  const handleSubmit = ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    // 使用as使得类型更加的具体
    // 这里登录注册是一样的逻辑
    isRegister
      ? register({ username, password })
      : login({ username, password });
  };
  return (
    <>
      <Title>{isRegister ? "注册" : "请登录"}</Title>
      <Form onFinish={handleSubmit}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "请输入用户名" }]}
        >
          <Input placeholder="用户名" type="text" id="username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input placeholder="密码" type="password" id="password" />
        </Form.Item>
        <LongButton htmlType="submit" type="primary">
          {isRegister ? "注册" : "登录"}
        </LongButton>
        <Divider />
        <Button type="link" onClick={() => setIsregister(!isRegister)}>
          {isRegister ? "已有账号了?点击登录" : "没有账号?立即注册"}
        </Button>
      </Form>
    </>
  );
};
