import React, { memo } from "react";
import { Rate } from "antd";

interface StarProps extends React.ComponentProps<typeof Rate> {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export default memo(function Star(props: StarProps) {
  //props/state
  const { checked, onCheckedChange } = props;
  //redux hooks

  //other hooks

  //其他逻辑

  return (
    <Rate
      count={1}
      value={checked ? 1 : 0}
      onChange={(num) => onCheckedChange?.(!!num)}
    />
  );
});
