import type { PropsWithChildren } from "react";
import type { ProjectType } from "./list";

import { UserType } from "./index";
import { Input, Select, Form } from "antd";
import UserSelect from "components/user-select";

interface SearchPanelType {
  users: UserType[];
  param: Partial<Pick<ProjectType, "name" | "personId">>;
  setParam: (param: SearchPanelType["param"]) => void;
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
          onChange={(e) =>
            setParam({
              ...param,
              name: e.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          defaultOptionName="负责人"
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        />
      </Form.Item>
    </Form>
  );
}
