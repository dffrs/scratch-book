import { NextRouter, withRouter } from "next/router";
import { FunctionComponent, memo } from "react";

type TabProps = {
  router: NextRouter;
};

const Tab: FunctionComponent<TabProps> = memo(({ router }) => {
  console.log("here", router);
  return <div className="container text-capitalize effect">here</div>;
});

Tab.displayName = "Tab";

export default withRouter(Tab);
