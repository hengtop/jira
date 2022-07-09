import type { Raw } from "types";

import React, { memo } from "react";
import { Select } from "antd";

type SelectProps = React.ComponentProps<typeof Select>;

interface IdSelectProps
  extends Omit<SelectProps, "value" | "onChange" | "options"> {
  value?: Raw | null | undefined;
  onChange?: (value?: number) => void;
  defaultOptionName?: string;
  options?: {
    name: string;
    id: number;
  }[];
}

/**
 * value 可以传入多种类型的值
 * onchange只会回调number|undefined的类型
 * 当isNaN(Number(value))为true的时候代表选择默认类型
 * 当选择默认类型的时候，onChange回调undefined
 */
export default memo(function IdSelect(props: IdSelectProps) {
  //props/state
  const { value, onChange, defaultOptionName, options, ...restProps } = props;
  //redux hooks

  //other hooks

  //其他逻辑

  return (
    <Select
      value={options?.length ? toNumber(value) : 0}
      onChange={(value) => onChange?.(toNumber(value) || undefined)}
      {...restProps}
    >
      {defaultOptionName ? (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}
      {options?.map((option) => (
        <Select.Option key={option.id} value={option.id}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  );
});

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));
