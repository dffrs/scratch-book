import { CB } from "../types";

const debounce = <Func extends CB, Delay extends number>(cb: Func, delay?: Delay) => {
  let timer: NodeJS.Timeout;
  return (...args: Parameters<typeof cb>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => cb(...args), delay);
  };
};

const throttle = <Func extends CB, Delay extends number>(cb: Func, delay?: Delay) => {
  let hasBeenCalledWhileWaiting: boolean;
  return (...args: Parameters<typeof cb>) => {
    if (hasBeenCalledWhileWaiting) return;
    hasBeenCalledWhileWaiting = true;
    setTimeout(() => {
      cb(...args);
      hasBeenCalledWhileWaiting = false;
    }, delay || 0);
  };
};

export { debounce, throttle };
