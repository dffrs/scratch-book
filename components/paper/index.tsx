import React, { FunctionComponent, memo } from "react";
import style from "./style/paper.module.scss";

type PaperProps = {
  header?: React.ReactElement | Array<React.ReactElement>;
  body?: React.ReactElement | Array<React.ReactElement>;
  footer?: React.ReactElement | Array<React.ReactElement>;
  backgroundColor?: "primary" | "secondary" | "neutral" | "contrast";
};

const Paper: FunctionComponent<PaperProps> = ({ header, body, footer, backgroundColor = "primary" }) => {
  return (
    <div style={{ backgroundColor: `var(--${backgroundColor}-color)` }} className={style.paper}>
      {React.Children.map(header, (child) => (
        <div className={style.header}>{child}</div>
      ))}
      {React.Children.map(body, (child) => (
        <div className={style.body}>{child}</div>
      ))}
      {React.Children.map(footer, (child) => (
        <div className={style.footer}>{child}</div>
      ))}
    </div>
  );
};

export default memo(Paper);
