import { NextPage } from "next";
import { memo } from "react";
import Inputs from "../../components/inputs";
import Paper from "../../components/paper";
import { Form } from "../../hooks/useForm";
const InputsPage: NextPage = () => {
  const form = new Form("test");
  return (
    <Paper
      header={{ text: "inputs", icon: "check" }}
      body={
        <div className="container">
          <div className="columns">
            <div className="col-12">
              <Inputs
                type="checkbox"
                label="Click me"
                onClick={() => form.setValue("name", `${Math.random()}`)}
                {...form.register("checkbox")}
              />
            </div>
            <div className="col-12">
              <Inputs
                type="text"
                label="Random Number"
                onChange={() =>
                  form.setValue(
                    "test-checkbox",
                    !!!form.getValue("test-checkbox")
                  )
                }
                {...form.register("name")}
              />
            </div>
            <div className="col-12">
              <Inputs
                type="checkbox"
                label="This checkbox should change whenever input text field's value changed"
                {...form.register("test-checkbox")}
              />
            </div>
          </div>
        </div>
      }
      footer={
        <button
          className="text-capitalize"
          onClick={() => console.log("form.getValues", form.getValues())}
        >
          get form values
        </button>
      }
    />
  );
};

export default memo(InputsPage);
