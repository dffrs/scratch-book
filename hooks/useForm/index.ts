import { createRef } from "react";
import { convertToString } from "../../utils/methods";
const consoleError = (message: string) => {
  if (process.env.NODE_ENV === "development") console.error(message);
};
const mutateInputValueWithEventTrigger = <V>(
  ref: RegisterReturnValue["ref"],
  value: V,
  event: keyof WindowEventMap = "input",
  windowHTML: "HTMLInputElement" | "HTMLTextAreaElement" = "HTMLInputElement",
  type: "value" | "checked" = "value"
) => {
  if (!(ref && ref.current)) return;
  const { set } =
    Object.getOwnPropertyDescriptor(window?.[windowHTML].prototype, type) ?? {};
  set?.call(ref.current, value);
  ref.current.dispatchEvent(new Event(event, { bubbles: true }));
};

type RegisterReturnValue<RefType extends HTMLInputElement = HTMLInputElement> =
  {
    ref: ReturnType<typeof createRef<RefType>>;
  };

class Form {
  private formName: string;
  private registerMap: Map<string, RegisterReturnValue>;
  constructor(name: string) {
    this.formName = name;
    this.registerMap = new Map();
  }
  public get name(): string {
    return this.formName;
  }

  public register<RefType extends HTMLInputElement>(fieldName: string) {
    if (this.registerMap.has(fieldName))
      return consoleError(`${fieldName} is alrady being use.`);
    const ref = { ref: createRef<RefType>() };
    this.registerMap.set(fieldName, ref);
    return ref;
  }

  public getValue(fieldName: string) {
    const { ref } = this.registerMap.get(fieldName) ?? {};
    if (!(ref && ref.current)) {
      consoleError(`${fieldName} was not registered`);
      return;
    }
    switch (ref.current.type) {
      case "checkbox":
        return ref.current.checked;
      default:
        return ref.current.value;
    }
  }

  public getValues() {
    return Array.from(this.registerMap).reduce<
      Record<string, ReturnType<typeof this.getValue>>
    >((prev, [key]) => {
      prev[key] = this.getValue(key);
      return prev;
    }, {});
  }

  private mutateValue(
    ref: RegisterReturnValue["ref"] | undefined,
    value: unknown
  ) {
    if (!(ref && ref.current)) return consoleError("ref is undefined");
    switch (ref.current?.type) {
      case "checkbox":
        return mutateInputValueWithEventTrigger(
          ref,
          value?.toString().toLowerCase() === "true",
          "input",
          "HTMLInputElement",
          "checked"
        );
      default:
        try {
          return mutateInputValueWithEventTrigger(ref, convertToString(value));
        } catch (error) {
          return consoleError(
            `Value's type is not correct for ${ref.current.name}`
          );
        }
    }
  }
  public setValue(fieldName: string, value: unknown) {
    if (!this.registerMap.has(fieldName))
      return consoleError(`${fieldName} not found. Register it, first`);
    this.mutateValue(this.registerMap.get(fieldName)?.ref, value);
    return;
  }
}
export { Form };
