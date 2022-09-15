import { FunctionComponent, memo } from "react";
import style from "../loader/style/loading.module.scss";

const Loading: FunctionComponent = () => {
  return <div className={style.loading} />;
};

export default memo(Loading);
