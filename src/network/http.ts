import qs from "qs";
import * as auth from "auth-provider";
import { useAuth } from "context/auth";
import { useCallback } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

interface CustomRequestInit extends RequestInit {
  params?: object;
  data?: object;
  token?: string;
}

export const http = async (
  url: string,
  { data, token, headers, ...customConfig }: CustomRequestInit = {},
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };
  if (config.params) {
    url += `?${qs.stringify(config.params)}`;
  }
  if (data) {
    config.body = JSON.stringify(data);
  }
  return fetch(`${apiUrl}${url}`, config).then(async (response) => {
    if (response.status === 401) {
      await auth.logout();
      return Promise.reject({ message: "请重新登录" });
    }
    const res = await response.json();
    if (response.ok) {
      return res;
    } else {
      //fetch在状态为5xx或者4xx时并不会抛出异常，我们需要手动抛异常，这也是和axios不一样的地方
      return Promise.reject(res);
    }
  });
};

// 自动添加token
export const useHttp = () => {
  const { user } = useAuth();
  // 使用了一个ts的操作符，获取函数的参数并以tuple类型传出
  /* 
    还有一个注意事项就是ts中的typeof时在静态环境运行生效
    js中的typeof是在运行时运行生效
  */
  return useCallback(
    (...[url, config]: Parameters<typeof http>) =>
      http(url, { ...config, token: user?.token }),
    [user?.token],
  );
};
