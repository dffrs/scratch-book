import type { NextPage } from "next";
import { memo } from "react";
import Drawer from "../components/drawer";
import Input from "../components/inputs";

const Home: NextPage = () => {
  return (
    <>
      <Drawer />
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
        </div>
      </div>
    </>
  );
};

export default memo(Home);
