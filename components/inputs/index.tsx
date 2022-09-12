import { DetailedHTMLProps, forwardRef, InputHTMLAttributes, memo, useId } from "react";
import style from "../inputs/style/input.module.scss";

type InputProps = { label?: string } & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const id = useId();
  return (
    <>
      <input ref={ref} id={id} {...props} className={style.input} />
      {(props.label && <label htmlFor={id}>{props.label}</label>) || null}
    </>
  );
});

Input.displayName = "Input";

export default memo(Input);
