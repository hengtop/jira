import type { PropsWithChildren } from "react";
import { UserType } from "./index";
import { Input, Select, Form } from "antd";

interface SearchPanelType {
  users: UserType[];
  param: {
    name: string;
    personId: number | string;
  };
  setParam: (param: any) => void;
}

export default function SearchPanel({
  users,
  param,
  setParam,
}: PropsWithChildren<SearchPanelType>) {
  return (
    <Form style={{ marginBottom: "2rem" }} layout="inline">
      <Form.Item>
        <Input
          type="text"
          value={param.name}
          onChange={(value) =>
            setParam({
              ...param,
              name: value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <Select
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        >
          <Select.Option value={""}>负责人</Select.Option>
          {users.map((user) => (
            <Select.Option key={user.id} value={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
}
