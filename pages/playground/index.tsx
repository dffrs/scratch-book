import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import React, { FunctionComponent, memo, PropsWithChildren } from "react";
import Paper from "../../components/paper";
import { useFetch } from "../../hooks/useFetch";
import { Data } from "../api/dummyData";

const URL: string = "http://localhost:3000/api/dummyData";
const RenderComponent: FunctionComponent<PropsWithChildren> = (props) => {
  // const deferredArray = useDeferredValue(props.children);
  return (
    <>
      {React.Children.map(props.children, (child) => (
        <div
          key={JSON.stringify(child)}
          className="d-flex just-cont-center"
          style={{
            padding: "1em",
            border: "1px solid var(--secondary-color)",
            margin: "1em",
            borderRadius: "var(--unit-1)",
          }}
        >
          {child}
        </div>
      ))}
    </>
  );
};

const PlayGround: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  console.log("props", props);
  const [data, isLoading] = useFetch<Data>({ url: URL });
  return (
    <Paper
      header={{ text: "welcome to playground", icon: "construction" }}
      body={
        <div className="container">
          <div className="columns">
            <div className="col-12 p-relative">
              {props.arrayToRender.map(({ number }) => (
                <div
                  key={number}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    border: "1px solid var(--neutral-color)",
                    borderRadius: "var(--unit-2)",
                    padding: "1em",
                    margin: "1em",
                  }}
                >
                  {number}
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    />
  );
};

export const getServerSideProps: GetServerSideProps<{ arrayToRender: Data["arrayToRender"] }> = async () => {
  const { arrayToRender }: Data = await fetch(URL).then((r) => r.json());
  return {
    props: {
      arrayToRender,
    },
  };
};

export default memo(PlayGround);
