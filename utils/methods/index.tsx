import { CB } from "../types";
const objectKeys = <Obj extends {}>(obj: Obj): Array<keyof Obj> => {
  return Object.keys(obj) as Array<keyof Obj>;
};
const debounce = <Func extends CB, Delay extends number>(
  cb: Func,
  delay?: Delay
) => {
  let timer: NodeJS.Timeout;
  return (...args: Parameters<typeof cb>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => cb(...args), delay);
  };
};
const throttle = <Func extends CB, Delay extends number>(
  cb: Func,
  delay?: Delay
) => {
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
const isObject = (args: unknown): args is Record<PropertyKey, unknown> =>
  ({}?.toString.call(args) === "[object Object]");
const isArray = (args: unknown): args is Array<unknown> =>
  ({}?.toString.call(args) === "[object Array]");
const isFuntion = (args: unknown): args is Function =>
  ({}?.toString.call(args) === "[object Function]");
const convertToString = (arg: unknown): string => {
  if (isArray(arg)) return arg.join(", ");
  if (isObject(arg))
    return objectKeys(arg).reduce<string>(
      (prev, curr) => `${prev}${arg[curr?.toString()]}`,
      ""
    );
  if (isFuntion(arg)) return arg?.toString();
  return (arg ?? "").toString();
};

export {
  debounce,
  throttle,
  objectKeys,
  isObject,
  isArray,
  isFuntion,
  convertToString,
};
