import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { Icons } from "../icons";
import { formatDate } from "@/lib/dayjs";
import { Calendar } from "./calendar";
import TimePicker from "./time-picker";

type Props = {
  placeholder?: string;
};

function DateTimePicker(props: Props) {
  const { placeholder } = props;
  const [date, setDate] = useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[200px] justify-start text-left font-normal h-8",
            !date && "text-muted-foreground"
          )}
        >
          <Icons.calendar className="h-4 w-4 mr-2 text-muted-foreground" />
          {date ? (
            formatDate(date)
          ) : (
            <span>{placeholder || "Pick a date"}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-1 flex flex-col">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
        <div className="flex items-center justify-between">
          <TimePicker />
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default DateTimePicker;
