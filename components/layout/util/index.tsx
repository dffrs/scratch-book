import Button from "../../button";

type ButtonsName = "inputs" | "store";

const drawerButtons: Array<React.ReactElement> = [
  <Button key="inputs" name="inputs">
    Inputs
  </Button>,
  <Button key="store" name="store">
    store
  </Button>,
];

export { drawerButtons };
export type { ButtonsName };
