import { useState } from "react";
import { useAuth } from "context/auth";
import { Form, Input, Divider, Button, Typography } from "antd";
import { LongButton, Title } from "./style";
import { useAsync } from "hooks";

import { ErrorBox } from "components/lib";

export const LoginScreen = () => {
  const { login, register } = useAuth();
  // 这里也可以直接导出error进行使用，不过这个error只能在异步操作中使用，比如在ui中，当然也可以设置throwOnError为true再结合trycatch捕获error
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });
  const [isRegister, setIsregister] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // 这里FormEvent如果不传泛型默认为Element，传了HTMLFormElement不报错的原因是因为HTMLFormElement继承了Element，所以可以借助类型兼容，因为js是面向结构编程（鸭子类型）不在乎你的类型只在乎你有没有对应的结构（属性）
  const handleSubmit = async ({
    rePassword,
    ...values
  }: {
    rePassword: string;
    username: string;
    password: string;
  }) => {
    if (isRegister && rePassword !== values.password) {
      setError(new Error("两次输入的密码不正确"));
      return;
    }
    try {
      isRegister ? await run(register(values)) : await run(login(values));
    } catch (e) {
      setError(e as Error);
    }
  };
  return (
    <>
      <Title>{isRegister ? "注册" : "请登录"}</Title>
      {error ? <ErrorBox error={error} /> : null}
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
        {isRegister && (
          <Form.Item
            name="rePassword"
            rules={[{ required: true, message: "请再次输入密码" }]}
          >
            <Input placeholder="确认密码" type="password" id="rePassword" />
          </Form.Item>
        )}
        <LongButton loading={isLoading} htmlType="submit" type="primary">
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
