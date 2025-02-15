import * as React from "react";
import { cn } from "~/lib/utils";

import { FieldProps } from "./field";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "name" | "onChange" | "onBlur" | "value"
> &
  Pick<FieldProps<any>, "name">;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={cn(
          "flex h-10 w-full rounded-md border border-stone-300 bg-transparent py-2 px-3 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-stone-700 dark:text-stone-50 dark:focus:ring-stone-400 dark:focus:ring-offset-stone-900",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
