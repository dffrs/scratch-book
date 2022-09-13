import { NextPage } from "next";
import { memo, useEffect, useRef } from "react";
import Input from "../../components/inputs";
import Select, { SelectRef } from "../../components/inputs/select";

const InputsPage: NextPage = () => {
  const ref = useRef<SelectRef>(null);
  useEffect(() => {
    console.log("ref", ref.current?.value);
  }, [ref]);
  return (
    <div style={{ height: "100vh", position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "self-start",
          justifyContent: "space-between",
          gap: "2em",
        }}
      >
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
    </div>
  );
};

export default memo(InputsPage);
