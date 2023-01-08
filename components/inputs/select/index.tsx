import React, {
  DetailedHTMLProps,
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import style from "../select/style/select.module.scss";

export type SelectRef = {
  forwardRef: React.MutableRefObject<HTMLDivElement | null>;
  value: TOptions | undefined;
};

type TOptions = { key: string; value: React.ReactNode };
type CustomProps = {
  name?: string;
  id?: string;
  defaultValue?: TOptions;
  options?: Array<TOptions>;
};
type SelectProps = CustomProps &
  Omit<
    DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    keyof CustomProps
  >;

const Select = forwardRef<SelectRef, SelectProps>(
  ({ options, defaultValue, ...restOfProps }, ref) => {
    const inputDiv = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState<TOptions | undefined>(
      () => defaultValue
    );
    const handleClick = useCallback(
      (optionSelected: TOptions) => setValue(optionSelected),
      []
    );
    useImperativeHandle(ref, () => ({ forwardRef: { ...inputDiv }, value }), [
      value,
    ]);
    return (
      <div ref={inputDiv} className={style.select} {...restOfProps}>
        {value?.key}
        <div>
          {options?.map(({ key, value }) => (
            <span key={key} onClick={() => handleClick({ key, value })}>
              {key}
            </span>
          ))}
        </div>
      </div>
    );
  }
);

Select.displayName = "Select";

export default memo(Select);
