import { render, screen } from "@testing-library/react";
import { Mark } from "components/mark";

test("Mark 组件正确高亮", () => {
  const name = "物料管理";
  const keyword = "管理";
  render(<Mark name={name} keyword={keyword} />);
  // 关键字是否被渲染
  expect(screen.getByText(keyword)).toBeInTheDocument();
  // 关键字是否有高亮的样式
  expect(screen.getByText(keyword)).toHaveStyle("color:red");
  // 非关键字是否没有高亮的颜色
  expect(screen.getByText("物料")).not.toHaveStyle("color:red");
});
