import type { NextPage } from "next";
import { memo } from "react";
import Paper from "../components/paper";

const Home: NextPage = () => {
  return (
    <Paper header={<div>this is a header</div>} body={<div>this is a body</div>} footer={<div>this is a footer</div>} />
  );
};

export default memo(Home);
