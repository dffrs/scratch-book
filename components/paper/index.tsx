import React, { FunctionComponent, memo } from "react";
import style from "./style/paper.module.scss";

type HeaderProps = {
  text: string;
  icon?: string;
};

type PaperProps = {
  header?: HeaderProps;
  body?: React.ReactElement | Array<React.ReactElement>;
  footer?: React.ReactElement | Array<React.ReactElement>;
  backgroundColor?: "primary" | "secondary" | "neutral" | "contrast";
};

const Paper: FunctionComponent<PaperProps> = ({ header, body, footer = <></>, backgroundColor = "primary" }) => {
  return (
    <div style={{ backgroundColor: `var(--${backgroundColor}-color)` }} className={style.paper}>
      {header && (
        <div className={style.header}>
          <div className="container">
            <div className="columns">
              <div className={`col-${(header?.icon && "11") || "12"} d-flex just-cont-start`}>{header.text}</div>
              {header.icon && (
                <div className="col-1 d-flex just-cont-end">
                  <span className="icon" data-icon={header.icon}></span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
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
