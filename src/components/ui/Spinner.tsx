import { forwardRef } from "react";
import { cn } from "~/lib/utils";

export interface IconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const Spinner = forwardRef<SVGSVGElement, IconProps>(
  ({ width, height, className }, ref) => {
    return (
      <svg
        ref={ref}
        aria-hidden="true"
        focusable="false"
        role="presentation"
        width={width}
        height={height}
        className={cn("spinner animate-spin icon", className)}
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );
  }
);
Spinner.displayName = "Spinner";

export default Spinner;
