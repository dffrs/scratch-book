import { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef, memo } from "react";

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
  <button ref={ref} type="button" {...props}>
    {props.children}
  </button>
));
Button.displayName = "Button";
export default memo(Button);
