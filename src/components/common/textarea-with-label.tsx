import * as React from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { FieldWrapper } from "./field-wrapper";

export interface TextareaWithLabelProps
  extends React.ComponentProps<"textarea"> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: string;
  required?: boolean;
  rows?: number;
  containerClassName?: string;
  labelClassName?: string;
  rightElement?: React.ReactNode;
  rightElementClassName?: string;
}

export function TextareaWithLabel({
  id: propId,
  label,
  description,
  error,
  required,
  rows = 5,
  className,
  containerClassName,
  labelClassName,
  rightElement,
  rightElementClassName,
  ...props
}: TextareaWithLabelProps) {
  const generatedId = React.useId();
  const id = propId || generatedId;

  return (
    <FieldWrapper
      id={id}
      label={label}
      description={description}
      error={error}
      required={required}
      className={containerClassName}
      labelClassName={labelClassName}
    >
      <div className="relative w-full">
        <Textarea
          id={id}
          rows={rows}
          required={required}
          aria-invalid={!!error}
          className={cn(
            "field-sizing-fixed w-full px-4 py-3 rounded-[10px] border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-600 text-sm font-medium transition-all resize-none",
            rightElement && "pb-7 pr-3",
            error && "border-destructive focus-visible:ring-destructive/20",
            className
          )}
          {...props}
        />
        {rightElement && (
          <div
            className={cn(
              "absolute right-3 bottom-2.5 flex items-center justify-center pointer-events-none select-none",
              rightElementClassName
            )}
          >
            {rightElement}
          </div>
        )}
      </div>
    </FieldWrapper>
  );
}
