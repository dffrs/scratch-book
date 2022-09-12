import React, { FunctionComponent, memo } from "react";
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
          <div className="col-1">
            <span className="icon text-color-secondary" data-icon="&#xf1b7;" />
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
