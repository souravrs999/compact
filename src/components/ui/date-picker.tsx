"use client";

import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { dateLib } from "@/lib/dayjs";

type TDatePicker = {
  value?: Date;
  label?: string;
  className?: string;
  onChange: (date: Date) => void;
};

export function DatePicker({ value, label, onChange, className }: TDatePicker) {
  const [date, setDate] = React.useState<Date | undefined>(value);

  const handleChange = (date: Date | undefined) => {
    if (date) {
      onChange(date);
      setDate(date);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            dateLib(date).format("MMM DD, YYYY")
          ) : (
            <span>{label || "Pick a date"}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
