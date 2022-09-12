import type { NextPage } from "next";
import { memo } from "react";
import Drawer from "../components/drawer";
import Input from "../components/inputs";

const Home: NextPage = () => {
  return (
    <>
      <Drawer></Drawer>
      <div style={{ height: "100vh", position: "relative" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%" }}>
          <Input type="checkbox" label="Click me" />
        </div>
      </div>
    </>
  );
};

export default memo(Home);
