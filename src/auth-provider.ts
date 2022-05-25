// 如果使用第三方的额认真，该文件就不用写了

import { UserType } from "screens/project-list/index";

const localStoregeKey = "__auth_provider_token__";
const apiUrl = process.env.REACT_APP_API_URL;

// 获取token
export const getToken = () => window.localStorage.getItem(localStoregeKey);

// 保存token
export const handleUserResponse = ({ user }: { user: UserType }) => {
  window.localStorage.setItem(localStoregeKey, user.token || "");
  return user;
};

// 保存token返回用户信息
export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(data);
    }
  });
};

export const register = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(data);
    }
  });
};

export const logout = async () =>
  window.localStorage.removeItem(localStoregeKey);
