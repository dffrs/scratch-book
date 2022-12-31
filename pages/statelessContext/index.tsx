import { NextPage } from "next";
import Inputs from "../../components/inputs";
import Paper from "../../components/paper";
import { StatelessProvider, useSCModifier } from "./state";

const NameListener = () => {
  const [name] = useSCModifier((state) => state.name);
  return <div className="d-block">Registered Name: {name}</div>;
};
const AgeListener = () => {
  const [age] = useSCModifier((state) => state.age);
  return <div className="d-block">Registered Age: {age}</div>;
};

const NameChanger = () => {
  const [_, globalSetter] = useSCModifier((state) => state.name);
  return <Inputs label="Name" type="text" onChange={(e) => globalSetter({ name: e.currentTarget.value })} />;
};

const AgeChanger = () => {
  const [_, globalSetter] = useSCModifier((state) => state.age);
  return <Inputs label="Age" type="text" onChange={(e) => globalSetter({ age: parseInt(e.currentTarget.value) })} />;
};
const StatelessContextDemo = () => {
  return (
    <StatelessProvider>
      <div className="container">
        <div className="columns">
          <div className="col-12">
            <NameChanger />
            <AgeChanger />
          </div>
          <div className="col-12">
            <NameListener />
            <AgeListener />
          </div>
        </div>
      </div>
    </StatelessProvider>
  );
};

const StatelessContext: NextPage = () => {
  return <Paper header={{ text: "context", icon: "public" }} body={<StatelessContextDemo />} />;
};

export default StatelessContext;
