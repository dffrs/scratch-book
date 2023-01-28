import Button from "../../button";

type ButtonsName = "inputs" | "playground" | "stateless context" | "observable" | "prisma playground";

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
  <Button key="prisma playground" name="prisma playground">
    Prisma Playground
  </Button>,
];

export { drawerButtons };
export type { ButtonsName };
