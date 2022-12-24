import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import { FC } from "react";
import Button from "../../components/button";
import Paper from "../../components/paper";
import { createStore } from "../../utils/store";
const store = createStore<{ value1: number; value2: number }>({ value1: 0, value2: 0 });

const IncrementValue: FC<{ item: keyof ReturnType<typeof store.getState> }> = ({ item }) => (
  <Button
    key={item}
    name={item}
    onClick={() => {
      const state = store.getState();
      console.log("before", store.getState());
      store.setState({ ...state, [item]: state[item] + 1 });
      console.log("after", store.getState());
    }}
  >
    Increment {item}
  </Button>
);

const DisplayValue: FC<{ item: keyof ReturnType<typeof store.getState> }> = ({ item }) => {
  const value = store.useStore((state) => state[item]);
  return (
    <div>
      {item}: {value}
    </div>
  );
};
const StorePage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ initialState }) => {
  store.serverInitialize(initialState);
  return (
    <Paper
      header={{ text: "store", icon: "store" }}
      body={
        <div className="container">
          <div className="columns">
            <div className="col-6">
              <div className="columns d-flex al-it-center">
                <div className="col-6">
                  <IncrementValue item="value1" />
                </div>
                <div className="col-6">
                  <DisplayValue item="value1" />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="columns d-flex al-it-center">
                <div className="col-6">
                  <IncrementValue item="value2" />
                </div>
                <div className="col-6">
                  <DisplayValue item="value2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
};

export const getServerSideProps: GetServerSideProps<{ initialState: { value1: number; value2: number } }> = async () => {
  const initialState: { value1: number; value2: number } = {
    value1: 1,
    value2: 2,
  };
  return {
    props: {
      initialState,
    },
  };
};

export default StorePage;
