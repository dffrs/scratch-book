import { NextPage } from "next";
import { memo, useCallback, useEffect, useState } from "react";
import Button from "../../components/button";
import Paper from "../../components/paper";
import { User } from "../../prisma/modifiers";
const CREATE_USER: string = "http://localhost:3000/api/createBlankUser";
const GET_USER: string = "http://localhost:3000/api/getBlankUser";

const PlayGround: NextPage = () => {
  const [user, setUser] = useState<User>();
  const onCreateUser = useCallback(() => {
    fetch(CREATE_USER).then((r) => r.json());
  }, []);
  const onGetUser = useCallback(async () => {
    await fetch(GET_USER)
      .then(async (r) => await r.json())
      .then(setUser);
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <Paper
      header={{ text: "prisma playground", icon: "pyramid" }}
      body={
        <div className="container">
          <div className="columns">
            <div className="col-12 p-relative">
              <Button key="create-blank-user" name="create user" className="text-capitalize" onClick={onCreateUser}>
                create user
              </Button>
              <Button key="get-blank-user" name="get user" className="text-capitalize" onClick={onGetUser}>
                get user
              </Button>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default memo(PlayGround);
