import { NextPage } from "next";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import Paper from "../../components/paper";
import { clock } from "../../utils/observable";
const Test: FunctionComponent = () => {
  const [timer, setTimer] = useState<number>(() => 0);
  const onTimeUpdate = useCallback(
    (newTimer: number) => setTimer(newTimer),
    []
  );
  useEffect(() => {
    clock.subscribe(onTimeUpdate);
    return () => clock.unsubscribe(onTimeUpdate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div className="container d-flex just-cont-end">Timer: {timer}</div>;
};

const Observable: NextPage = () => (
  <Paper
    header={{ text: "observable", icon: "visibility" }}
    body={
      <div className="container">
        <div className="columns">
          <div className="col-6">
            <button className="text-capitalize" onClick={() => clock.run()}>
              start clock
            </button>
          </div>
          <div className="col-6">
            <Test />
          </div>
        </div>
      </div>
    }
  />
);
export default Observable;
