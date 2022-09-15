import Router from "next/router";
import React, { FunctionComponent, memo, useCallback, useMemo } from "react";
import { Routes } from "../../utils/common";
import Drawer from "../drawer";
import { ButtonsName, drawerButtons } from "./util";

type LayoutProps = {
  children?: React.ReactElement;
};

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  const handleClick = useCallback((button: React.ReactElement) => {
    const buttonName = button.props.name as ButtonsName;
    switch (buttonName) {
      case "inputs":
        return Router.push(Routes.INPUTS);
      default:
        ((buttonName: never) => {
          throw new Error(`A new button was added - ${buttonName} . Add it to this handler, also.`);
        })(buttonName);
    }
  }, []);
  const buttonsToRender = useMemo(() => {
    return drawerButtons.map((button) => {
      return React.cloneElement<React.HTMLProps<HTMLButtonElement>>(button, {
        onClick: () => handleClick(button),
      });
    });
  }, [handleClick]);
  const childrenToRender = useMemo(() => React.Children.map(children, (children) => children), [children]);
  return (
    <>
      <Drawer>{buttonsToRender}</Drawer>
      <main>{childrenToRender}</main>
    </>
  );
};

export default memo(Layout);
