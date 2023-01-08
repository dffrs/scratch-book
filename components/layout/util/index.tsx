import Button from "../../button";

type ButtonsName = "inputs" | "playground" | "stateless context" | "observable";

const drawerButtons: Array<React.ReactElement> = [
  <Button key="inputs" name="inputs">
    Inputs
  </Button>,
  <Button key="playground" name="playground">
    Playground
  </Button>,
  <Button key="stateless context" name="stateless context">
    Stateless Context
  </Button>,
  <Button key="observable" name="observable">
    Observable
  </Button>,
];

export { drawerButtons };
export type { ButtonsName };
