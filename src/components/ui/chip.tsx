import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ChipProps = {
  variant?: "primary" | "success" | "info" | "warning" | "danger" | "outlined";
  className?: string;
  label: string;
  children?: ReactNode;
};

function Chip({ variant = "outlined", className, label, children }: ChipProps) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center border-[1px] gap-1 text-xs py-1 px-3 rounded-full font-semibold",
        {
          "text-muted-foreground border-muted": variant === "outlined",
          "text-primary bg-primary/10": variant === "primary",
          "text-green-500 bg-green-500/10": variant === "success",
          "text-blue-500 bg-blue-500/10": variant === "info",
          "text-yellow-500 bg-yellow-500/10": variant === "warning",
          "text-red-500 bg-red-500/10": variant === "danger",
        },
        className
      )}
    >
      {children}
      <p>{label}</p>
    </span>
  );
}

export default Chip;
