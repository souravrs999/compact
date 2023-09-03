import React, { ReactNode } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

type InputProps = {
  id: string;
  form: UseFormReturn<any>;
  name: string;
  label: string;
  placeholder: string;
  className?: string;
  type?: string;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
};

function FormInput(props: InputProps) {
  const {
    id,
    form,
    name,
    label,
    className,
    startAdornment,
    endAdornment,
    ...rest
  } = props;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("relative", className)}>
          <FormLabel htmlFor={id} className="text-xs text-muted-foreground">
            {label}
          </FormLabel>
          {startAdornment && (
            <div className="absolute top-6 h-8 w-8 border-r grid place-items-center">
              <span>{startAdornment}</span>
            </div>
          )}
          <FormControl>
            <Input
              id={id}
              {...rest}
              {...field}
              className={cn(
                "h-8 focus-visible:ring-offset-0 font-semibold rounded",
                {
                  "pl-10": startAdornment,
                  "pr-10": endAdornment,
                }
              )}
            />
          </FormControl>
          {endAdornment && (
            <span className="absolute top-1/2 right-2">{endAdornment}</span>
          )}
        </FormItem>
      )}
    />
  );
}

export default FormInput;
