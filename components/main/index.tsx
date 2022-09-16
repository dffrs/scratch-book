import React, { FunctionComponent, memo } from "react";
import style from "./style/main.module.scss";

type MainProps = {
  children?: React.ReactElement | Array<React.ReactElement>;
};

const Main: FunctionComponent<MainProps> = ({ children }) => {
  return <main className={style.main}>{React.Children.map(children, (child) => child)}</main>;
};

export default memo(Main);
