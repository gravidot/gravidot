import { ButtonHTMLAttributes, ReactNode } from "react";

type ControlButtonProps = {
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function ControlButton({ children, ...rest }: ControlButtonProps) {
  return (
    <button
      type="button"
      {...rest}
      className="flex w-full justify-center gap-x-1.5 text-xs"
    >
      {children}
    </button>
  );
}
