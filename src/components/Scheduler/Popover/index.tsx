import { Icons } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Chip from "@/components/ui/chip";
import React, { ReactNode, memo } from "react";

type Props = {
  title?: string | ReactNode;
  pastEvent: boolean;
  start: string;
  end: string;
};

function SchedulerPopover({
  title = "Schedule Event",
  pastEvent,
  start,
  end,
}: Props) {
  return (
    <>
      <div className="flex items-center p-2 gap-2 border-b-[1px]">
        <p className="font-semibold max-w-[20rem] text-ellipsis overflow-hidden">
          {title}
        </p>
        {pastEvent && (
          <Icons.badgeCheck className="shrink-0 w-4 h-4 fill-green-500 text-white" />
        )}
      </div>
      <div className="flex flex-col p-2 space-y-3 w-full bg-background">
        <div className="flex rounded items-center gap-2 border p-1 text-blue-500 bg-blue-500/10">
          <Icons.info className="shrink-0 w-4 h-4" />
          <p className="text-xs">
            Remember to check recurrence or repeat in calendar invitation
          </p>
          <Icons.close className="shrink-0 w-4 h-4 text-muted-foreground" />
        </div>
        <div className="flex flex-col space-y-2 border-b pb-1">
          <p className="font-semibold text-sm text-muted-foreground">Tags</p>
          <div className="flex items-center gap-2 flex-wrap">
            <Chip variant="primary" label="Project Meeting">
              <Icons.fileBox className="w-3 h-3" />
            </Chip>
            <Chip variant="success" label="Meeting">
              <Icons.messageSquare className="w-3 h-3" />
            </Chip>
            <Chip variant="warning" label="Call">
              <Icons.phone className="w-3 h-3" />
            </Chip>
            <Chip variant="danger" label="Other">
              <Icons.boxes className="w-3 h-3" />
            </Chip>
          </div>
        </div>
        <div className="flex gap-2">
          <Icons.clock className="w-5 h-5 text-background fill-muted-foreground/50" />
          <div className="flex flex-col">
            <p className="text-sm font-semibold">
              {start} - {end}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <Avatar className="w-8 h-8">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="p-1 border-dashed border-2 border-muted-foreground/40 rounded-full">
                <Icons.plus className="w-5 h-5 text-muted-foreground/40" />
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Icons.mapPin className="w-5 h-5 text-background fill-muted-foreground/50" />
          <p className="font-semibold text-muted-foreground text-sm">
            Add location
          </p>
        </div>
        <div className="flex gap-2">
          <Icons.text className="w-5 h-5 text-muted-foreground/50" />
          <p className="font-semibold text-muted-foreground text-sm">
            Add description
          </p>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="outline" className="w-full h-8">
            {`${pastEvent ? "Reschedule" : "Cancel"} Event`}
          </Button>
          <Button variant="default" className="w-full h-8">
            {`${pastEvent ? "Delete" : "Update"} Event`}
          </Button>
        </div>
      </div>
    </>
  );
}

export default memo(SchedulerPopover);
