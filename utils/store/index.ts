// import { createContext, useContext, useEffect, useState, useSyncExternalStore } from "react";

import { useSyncExternalStore } from "react";

// type StoreInitializer<T extends unknown> = {
//   [Id in string]: {
//     initialState: T;
//   };
// };
// type ModifyingState<T> = <A extends keyof T>(property: A, newState: T[A]) => void;
// const createStoreVersion2 = <T>(initialState: StoreInitializer<T>) => {
//   const storeIds = Object.keys(initialState);
//   if (!storeIds) throw new Error("Provided initialState without id");
//   const storeId = storeIds.at(0);
//   if (!storeId) throw new Error("Provided initialState without id");
//   let currentState = { ...initialState };
//   const listeners = new Set<(newState: T[keyof T]) => any>();
//   return {
//     getState: (property?: keyof T) =>
//       (property && currentState[storeId]["initialState"][property]) || currentState[storeId]["initialState"],
//     setState: <Key extends keyof T>(property: Key, newState: T[Key]) => {
//       currentState[storeId]["initialState"][property] = newState;
//       listeners.forEach((listener) => listener(currentState[storeId]["initialState"][property]));
//     },
//     subscribe: (listener: (newState: T[keyof T]) => any) => {
//       listeners.add(listener);
//       return () => listeners.delete(listener);
//     },
//   };
// };

// const useStoreVersion2 = (selector = (state: any) => state) => {
//   const [state, setState] = useState(selector(store2.getState()));
//   useEffect(() => {
//     store.subscribe(() => setState(selector(store2.getState())));
//   }, [selector, state]);
//   return state;
// };

// const store2 = createStoreVersion2({ temp: { initialState: { name: "Daniel", age: 25 } } });

// const createStore = <T>(initialState: T) => {
//   let currentState = initialState;
//   const listeners = new Set<(newState: T) => any>();
//   let alreadyInitialize = false;
//   return {
//     getState: () => currentState,
//     setState: (newState: T) => {
//       currentState = newState;
//       listeners.forEach((listener) => listener(currentState));
//     },
//     subscribe: (listener: (newState: T) => any) => {
//       listeners.add(listener);
//       return () => listeners.delete(listener);
//     },
//     serverInitialize: (newState: T) => {
//       if (!alreadyInitialize) {
//         currentState = newState;
//         alreadyInitialize = true;
//       }
//     },
//   };
// };

// const store = createStore({ value1: 0, value2: 0 });

// const ServerSideStore = createContext<ReturnType<typeof store["getState"]>>({ value1: 1, value2: 3 });

// // Custom useStore without React's  useSyncExternalStore hook

// // const useStore = (selector = (state: any) => state) => {
// //   const [state, setState] = useState(selector(store.getState()));
// //   useEffect(() => {
// //     store.subscribe(() => setState(selector(store.getState())));
// //   }, [selector, state]);
// //   return state;
// // };
// const useStore = (selector = (state: ReturnType<typeof store["getState"]>) => state) => {
//   const serverSideValueForStore = useContext(ServerSideStore);
//   useEffect(() => store.serverInitialize(serverSideValueForStore), [serverSideValueForStore]);
//   return useSyncExternalStore(
//     store.subscribe,
//     () => selector(store.getState()),
//     () => selector(serverSideValueForStore)
//   );
// };

// export { store, useStore, ServerSideStore, useStoreVersion2, store2 };
const createStore = <T>(initialState: T) => {
  let currentState = initialState;
  let serverState: T | null = null;
  const listeners = new Set<(newState: T) => void>();
  const subscribe = (listener: (newState: T) => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  return {
    getState: () => currentState,
    setState: (newState: T) => {
      currentState = newState;
      listeners.forEach((listener) => listener(currentState));
    },
    subscribe,
    serverInitialize: (initialServerState: T) => {
      if (!serverState) {
        currentState = initialServerState;
        serverState = initialServerState;
      }
    },
    useStore: <OutPut>(selector: (state: T) => OutPut) =>
      useSyncExternalStore(
        subscribe,
        () => selector(currentState),
        () => selector(serverState ?? initialState)
      ),
  };
};

export { createStore };
