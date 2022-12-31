import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { CB } from "../types";

const createStatelessContext = <TInitialValue,>(initialValue: TInitialValue) => {
  const useStatelessContext = () => {
    /* 
    Ref to keep global "state"; 
    */
    const globalState = useRef<TInitialValue>(initialValue);

    /* 
    Ref of all the listeners. This is need because whenever the global state
    is changed/modified all the listeners need to be alerted.
     */
    const listeners = useRef<Set<CB>>(new Set<CB>());
    const registerListener: (selector: CB) => void = useCallback((newListener: CB) => {
      /* 
      Add the new listener to the Set.
      */
      listeners.current.add(newListener);
      /* 
      Return a callback to "cleanup" and remove the listener, in the end.
      */
      return () => listeners.current.delete(newListener);
    }, []);
    const getGlobalState: CB<undefined, TInitialValue> = useCallback(() => globalState.current, []);
    const setGlobalState: (modifiedState: Partial<TInitialValue>) => void = useCallback(
      (modifiedState: Partial<TInitialValue>) => {
        /* 
      Add the new value to the global state
       */
        globalState.current = { ...globalState.current, ...modifiedState };
        /* 
      Alert all the listeners
       */
        listeners.current.forEach((listener) => listener());
      },
      []
    );

    return { getGlobalState, setGlobalState, registerListener };
  };

  type StatelessContextReturnType = ReturnType<typeof useStatelessContext>;
  const StatelessContext = createContext<StatelessContextReturnType | null>(null);
  const Provider: FunctionComponent<PropsWithChildren> = (props) => (
    <StatelessContext.Provider value={useStatelessContext()}>{props.children}</StatelessContext.Provider>
  );

  const useController = (
    selector: (state: TInitialValue) => TInitialValue[keyof TInitialValue]
  ): [TInitialValue[keyof TInitialValue], (value: Partial<TInitialValue>) => void] => {
    const statelessContext = useContext(StatelessContext);
    if (!statelessContext) throw new Error("Initial Value not provided or not using Provider");
    /* 
    This state is what forces a rerender, making it possible to modify the statelessContext's global state.
    Remember that is it using refs, so their mutation does not cause a rerender, which would make it impossible
    to modify it in a place and get the value elsewhere.
    */
    const [initialState, setInitialState] = useState(() => selector(statelessContext.getGlobalState()));
    useEffect(() => {
      // store.subscribe returns a cleanup method.
      return statelessContext.registerListener(() => setInitialState(() => selector(statelessContext.getGlobalState())));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    /* 
    It is important to return the method that sets the globalState. This way, every where the state is being
    "listen" to, gets the latest version of it.
    */
    return [initialState, statelessContext.setGlobalState];
  };
  return { useStatelessContext, useController, Provider };
};
export { createStatelessContext };
