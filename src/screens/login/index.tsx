import type { FormEvent } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

export const LoginScreen = () => {
  const login = (params: { username: string; password: string }) => {
    fetch(`${apiUrl}/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    }).then(async (response) => {
      if (response.ok) {
        const res = await response.json();
        console.log(res);
      }
    });
  };
  // 这里FormEvent如果不传泛型默认为Element，传了HTMLFormElement不报错的原因是因为HTMLFormElement继承了Element，所以可以借助类型兼容，因为js是面向结构编程（鸭子类型）不在乎你的类型只在乎你有没有对应的结构（属性）
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 使用as使得类型更加的具体
    const username = (e.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value;
    login({ username, password });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id={"username"} />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id={"password"} />
      </div>
      <button type={"submit"}>登录</button>
    </form>
  );
};
