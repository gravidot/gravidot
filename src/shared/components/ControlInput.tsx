import { ForwardedRef, forwardRef, InputHTMLAttributes } from "react";

type ControlInputProps = {
  ref: ForwardedRef<HTMLInputElement>;
} & InputHTMLAttributes<HTMLInputElement>;

export const ControlInput = forwardRef<HTMLInputElement, ControlInputProps>(
  ({ ...rest }, ref) => {
    return (
      <input
        type="text"
        ref={ref}
        {...rest}
        className="flex w-11 justify-center gap-x-1.5 bg-white text-xs focus:outline-none dark:bg-black"
      />
    );
  }
);

ControlInput.displayName = "ControlInput";
