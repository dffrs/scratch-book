import Router from "next/router";
import React, { FunctionComponent, memo } from "react";
import { Routes } from "../../utils/common";
import style from "./style/drawer.module.scss";

type DrawerProps = {
  isOpened?: boolean;
  children?: React.ReactNode;
};

const Drawer: FunctionComponent<DrawerProps> = (props) => {
  return (
    <nav className={style.drawer}>
      <div className="container">
        <div className="columns">
          <div className="col-1 c-pointer" onClick={() => Router.push(Routes.HOME)}>
            <span className="icon text-color-secondary" data-icon="&#xead6;" />
          </div>
          {React.Children.map(props.children, (children) => (
            <div className="col-3">{children}</div>
          ))}
        </div>
      </div>
    </nav>
  );
};
export default memo(Drawer);
