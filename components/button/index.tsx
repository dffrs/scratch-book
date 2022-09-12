import { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef, memo } from "react";

type MandatoryProps = "key" | "name";
type ButtonProps = Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, MandatoryProps> & {
  key: string;
  name: string;
};
const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
  <button ref={ref} type="button" {...props}>
    {props.children}
  </button>
));
Button.displayName = "Button";
export default memo(Button);
