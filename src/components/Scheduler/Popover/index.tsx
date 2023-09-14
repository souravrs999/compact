import React, { memo } from "react";
import { Event } from "react-big-calendar";

import { Popover, PopoverContent } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getTimeDifference } from "@/lib/dayjs";
import DateTimePicker from "@/components/ui/date-time-picker";
import ColorLabels from "@/components/ui/color-labels";

type Props = {
  open: boolean;
  coords: string | number[] | undefined;
  event: Event | undefined;
  onClose: () => void;
};

function SchedulerPopover({ open, coords, event, onClose }: Props) {
  return (
    <Popover open={open} onOpenChange={onClose}>
      <PopoverContent
        className="absolute rounded w-90 p-0"
        style={{ top: coords?.[0], left: coords?.[1] }}
      >
        <div className="flex flex-col">
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={onClose}
              >
                <Icons.close className="w-5 h-5 text-muted-foreground" />
              </Button>
              <Select>
                <SelectTrigger className="h-8 w-28 bg-primary text-white rounded focus:ring-offset-0">
                  <SelectValue placeholder="Confirmed" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="confirm">Confirm</SelectItem>
                    <SelectItem value="reject">Reject</SelectItem>
                    <SelectItem value="rsvp">RSVP</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" className="h-8">
              Cancel Event
            </Button>
          </div>
          <Separator />
          <div className="flex flex-col space-y-4 p-2">
            <div className="flex items-center">
              <h3 className="text-xl font-black text-foreground">
                {event?.title}
                <span className="ml-3 text-base font-semibold text-muted-foreground">
                  {getTimeDifference(event?.start, event?.end)}H
                </span>
              </h3>
            </div>
            <div className="flex items-center gap-2 justify-between">
              <DateTimePicker placeholder="Start Date & Time" />
              <Icons.chain className="text-primary w-4 h-4" />
              <DateTimePicker placeholder="End Date & Time" />
            </div>
            <div className="flex flex-col gap-1">
              <h5 className="text-sm text-muted-foreground">
                Assign a color to this event
              </h5>
              <ColorLabels />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default memo(SchedulerPopover);
