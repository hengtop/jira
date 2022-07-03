import type { AppDispatch } from "store";

import React, { ReactNode, useCallback } from "react";
import * as auth from "auth-provider";
import { UserType } from "screens/project-list";
import { http } from "network";
import { useMount, useAsync } from "hooks";
import { FullPageLoading, FullPageErrorFallback } from "components/lib";
import * as authStore from "screens/login/store/auth.slice";
import { useDispatch, useSelector } from "react-redux";

export interface AuthForm {
  username: string;
  password: string;
}

// 初始化user
export const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    // 根据token获取用户信息，进行初始化
    const data = await http("/me", { token });
    user = data.user;
  }
  return user;
};

// 定义一个 context
const AuthContext = React.createContext<
  | {
      user: UserType | null;
      login: (form: AuthForm) => Promise<void>;
      register: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);

AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { error, isLoading, isIdle, isError, run } =
    useAsync<UserType | null>();
  const dispatch: (...args: unknown[]) => Promise<UserType> =
    useDispatch<AppDispatch>();
  // 初始化的时候设置user信息，保证登陆后刷新用户数据持久化
  useMount(
    useCallback(() => {
      run(dispatch(authStore.bootstrapAuth()));
    }, [run, dispatch]),
  );

  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }
  return <div>{children}</div>;
};

export const useAuth = () => {
  const dispatch: (...args: unknown[]) => Promise<UserType> =
    useDispatch<AppDispatch>();
  const user = useSelector(authStore.selectUser);
  const login = useCallback(
    (form: AuthForm) => dispatch(authStore.login(form)),
    [dispatch],
  );
  const register = useCallback(
    (form: AuthForm) => dispatch(authStore.register(form)),
    [dispatch],
  );
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch]);
  return {
    user,
    login,
    register,
    logout,
  };
};
