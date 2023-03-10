import Router from "next/router";
import React, { FunctionComponent, memo, useCallback, useMemo } from "react";
import { Routes } from "../../utils/common";
import Drawer from "../drawer";
import Main from "../main";
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
      case "playground":
        return Router.push(Routes.PLAYGROUND);
      case "stateless context":
        return Router.push(Routes.STATELESS_CONTEXT);
      case "observable":
        return Router.push(Routes.OBSERVABLE);
      case "prisma playground":
        return Router.push(Routes.PRISMA_PLAYGROUND);
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
      <Main>{childrenToRender}</Main>
    </>
  );
};

export default memo(Layout);
