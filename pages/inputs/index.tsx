import { NextPage } from "next";
import { memo } from "react";
import Paper from "../../components/paper";
import Tab from "../../components/tab";

// <div style={{ height: "100%" }}>
//           <Input type="checkbox" label="Click me" />
//           <Input type="text" label="Name" />
//           <Select
//             ref={ref}
//             name="select"
//             defaultValue={{ key: "0", value: 0 }}
//             options={[
//               { key: "1", value: 1 },
//               { key: "2", value: 2 },
//               { key: "3", value: 3 },
//             ]}
//           />
// </div>
const InputsPage: NextPage = () => {
  return <Paper header={{ text: "inputs", icon: "check" }} body={<Tab></Tab>} />;
};

export default memo(InputsPage);
