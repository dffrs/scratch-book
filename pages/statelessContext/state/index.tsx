import { createStatelessContext } from "../../../utils/statelessContext";
const statelessContext = createStatelessContext<{ name: string | undefined; age: number | undefined }>({
  name: undefined,
  age: undefined,
});
const useSCModifier = statelessContext.useController;
const StatelessProvider = statelessContext.Provider;
export { statelessContext, useSCModifier, StatelessProvider };
