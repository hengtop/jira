// 错误边界一定要使用class组件
import type { ReactElement, PropsWithChildren } from "react";
import { Component } from "react";

type FallbackRender = (props: { error: Error | null }) => ReactElement;

// 该组件是我们自行实现的错误边界，也可以使用一个第三方的库，地址如下：
// https://github.com/bvaughn/react-error-boundary
export default class ErrorBoundary extends Component<
  PropsWithChildren<{ fallbackRender: FallbackRender }>,
  { error: Error | null }
> {
  state = { error: null };

  // 当子组件抛出异常这里会接收到并且调用(注意只能是子组件中抛出错误)
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;
    if (error) {
      console.log(error);
      return fallbackRender({ error });
    }
    return children;
  }
}
