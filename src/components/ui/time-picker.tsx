import React, { useState } from "react";
import { Toggle } from "./toggle";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "./select";
import { ScrollArea } from "./scroll-area";

function TimePicker() {
  const [hour, setHour] = useState<number>();
  const [minute, setMinute] = useState<number>();
  const [median, setMedian] = useState<string>("AM");
  const [hour24, setHour24] = useState(true);

  function handleHourChange(hour: string) {
    setHour(+hour);
  }

  function handleMinuteChange(minute: string) {
    setMinute(+minute);
  }

  function handleMedianChange(med: string) {
    setMedian(med);
  }

  function handle24Change(val: boolean) {
    console.log(val);
    setHour24((val) => !val);
  }

  return (
    <div className="flex items-center justify-between w-full gap-1">
      <Select value={hour?.toString()} onValueChange={handleHourChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Hour" />
        </SelectTrigger>
        <SelectContent>
          <ScrollArea className="h-72">
            {Array.from({ length: hour24 ? 23 : 11 }).map((_, idx) => (
              <SelectItem key={idx + 1} value={(idx + 1).toString()}>
                {(idx + 1).toString()}
              </SelectItem>
            ))}
          </ScrollArea>
        </SelectContent>
      </Select>
      <Select value={minute?.toString()} onValueChange={handleMinuteChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Minute" />
        </SelectTrigger>
        <SelectContent>
          <ScrollArea className="h-72">
            {Array.from({ length: 59 }).map((_, idx) => (
              <SelectItem key={idx + 1} value={(idx + 1).toString()}>
                {(idx + 1).toString()}
              </SelectItem>
            ))}
          </ScrollArea>
        </SelectContent>
      </Select>
      {!hour24 && (
        <Select value={median} onValueChange={handleMedianChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="AM/PM" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AM">AM</SelectItem>
            <SelectItem value="PM">PM</SelectItem>
          </SelectContent>
        </Select>
      )}
      <Toggle pressed={hour24} onPressedChange={handle24Change}>
        24H
      </Toggle>
    </div>
  );
}

export default TimePicker;
