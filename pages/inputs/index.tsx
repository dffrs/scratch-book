import { NextPage } from "next";
import { memo, useRef } from "react";
import Input from "../../components/inputs";
import Select, { SelectRef } from "../../components/inputs/select";
import Paper from "../../components/paper";

const InputsPage: NextPage = () => {
  const ref = useRef<SelectRef>(null);
  return (
    <Paper
      header={
        <div className="container">
          <div className="columns">
            <div className="col-11 d-flex just-cont-start">inputs</div>
            <div className="col-1 d-flex just-cont-end">
              <span className="icon" data-icon="&#xeb7c;" />
            </div>
          </div>
        </div>
      }
      body={
        <div style={{ height: "100%" }}>
          <Input type="checkbox" label="Click me" />
          <Input type="text" label="Name" />
          <Select
            ref={ref}
            name="select"
            defaultValue={{ key: "0", value: 0 }}
            options={[
              { key: "1", value: 1 },
              { key: "2", value: 2 },
              { key: "3", value: 3 },
            ]}
          />
        </div>
      }
    />
  );
};

export default memo(InputsPage);
