import Button from "../../button";

type ButtonsName = "inputs" | "store" | "playground";

const drawerButtons: Array<React.ReactElement> = [
  <Button key="inputs" name="inputs">
    Inputs
  </Button>,
  <Button key="store" name="store">
    store
  </Button>,
  <Button key="playground" name="playground">
    playground
  </Button>,
];

export { drawerButtons };
export type { ButtonsName };
