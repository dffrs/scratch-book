import { useSyncExternalStore } from "react";

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
