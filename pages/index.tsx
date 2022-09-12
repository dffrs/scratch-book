import type { NextPage } from "next";
import { memo } from "react";
import Button from "../components/button";
import Drawer from "../components/drawer";
import Input from "../components/inputs";

const Home: NextPage = () => {
  return (
    <>
      <Drawer>
        <Button>this is a test for a button</Button>
        <Button>this is a test for a button</Button>
        <Button>this is a test for a button</Button>
      </Drawer>
      <div style={{ height: "100vh", position: "relative" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%" }}>
          <Input type="checkbox" label="Click me" />
        </div>
        {/* <span style={{ position: "absolute", top: "50%", left: "50%" }} className="effect">
          Welcome
        </span> */}
      </div>
    </>
  );
};

export default memo(Home);
