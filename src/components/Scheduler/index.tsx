"use client";

import React, { FC, useCallback, useState } from "react";
import dayjs from "dayjs";
import {
  Event,
  EventPropGetter,
  EventProps,
  View,
  Views,
  dayjsLocalizer,
} from "react-big-calendar";
import withDragAndDrop, {
  EventInteractionArgs,
} from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "./styles.css";

import RBC from "../Calendar";
import { dateLib } from "@/lib/dayjs";
import { _mockScheduler } from "../../../_mock/data";
import { cn } from "@/lib/utils";
import { Icons } from "../icons";
import {
  HoverCard,
  HoverCardContent,
  HoverCardPortal,
  HoverCardTrigger,
} from "../ui/hover-card";
import Chip from "../ui/chip";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";

const localizer = dayjsLocalizer(dayjs);
const DNDCalendar = withDragAndDrop(RBC);

const CDayPropGetter = (date: Date) => {
  return {
    className: cn("bg-background", {
      "bg-primary/10": dateLib().isSame(date, "day"),
    }),
  };
};

const CEventPropGetter: EventPropGetter<Event> = (event) => {
  return {
    className: "p-0 m-0 text-foreground rounded-none font-bold text-sm",
  };
};

const CEvent: FC<EventProps<Event>> = ({ event }) => {
  const pastEvent: boolean = dateLib(event?.end).diff(dateLib()) < 0;
  return (
    <div
      className={cn(
        "flex-1 bg-primary/30 border-l-4 border-primary py-1 px-2",
        {
          "bg-red-500/30 border-red-500": event?.color === "red",
          "bg-orange-500/30 border-orange-500": event?.color === "orange",
          "bg-yellow-500/30 border-yellow-500": event?.color === "yellow",
          "bg-green-500/30 border-green-500": event?.color === "green",
          "bg-blue-500/30 border-blue-500": event?.color === "blue",
          "bg-indigo-500/30 border-indigo-500": event?.color === "indigo",
          "bg-violet-500/30 border-violet-500": event?.color === "violet",
          "bg-purple-500/30 border-purple-500": event?.color === "purple",
        }
      )}
    >
      <HoverCard openDelay={100}>
        <HoverCardTrigger asChild>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <p>{event?.title}</p>
              {pastEvent && (
                <Icons.badgeCheck className="shrink-0 w-4 h-4 fill-green-500 text-white" />
              )}
            </div>
            <p className="text-xs text-muted-foreground font-semibold">
              {dateLib(event.start).format("hh:mm a")} -{" "}
              {dateLib(event?.end).format("hh:mm a")}
            </p>
          </div>
        </HoverCardTrigger>
        <HoverCardPortal>
          <HoverCardContent className="p-0 w-[24rem] rounded">
            <div className="flex items-center p-2 gap-2 border-b-[1px]">
              <p className="font-semibold">{event?.title}</p>
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
                <p className="font-semibold text-sm text-muted-foreground">
                  Tags
                </p>
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
                    {dateLib(event.start).format("hh:mm a")} -{" "}
                    {dateLib(event?.end).format("hh:mm a")}
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
          </HoverCardContent>
        </HoverCardPortal>
      </HoverCard>
    </div>
  );
};

function Scheduler() {
  const [view, setView] = useState<View>("month");
  const [events, setEvents] = useState<Event[]>(
    _mockScheduler.map((e) => ({
      ...e,
      start: dateLib.utc(e.start).local().toDate(),
      end: dateLib.utc(e.end).local().toDate(),
    }))
  );

  const handleEventEdit = useCallback((data: EventInteractionArgs<Event>) => {
    setEvents((prevEvents) => {
      const {
        start,
        end,
        event: { id },
      } = data;

      const idx = prevEvents.findIndex((e) => e.id === id);
      if (idx > -1) {
        const temp = {
          ...prevEvents[idx],
          start: dateLib(start).toDate(),
          end: dateLib(end).toDate(),
        };

        prevEvents.splice(idx, 1);
        return [...prevEvents, temp];
      }

      return prevEvents;
    });
  }, []);

  const handleViewChange = useCallback(
    (view: View) => {
      setView(view);
    },
    [setView]
  );

  return (
    <>
      <DNDCalendar
        resizable
        popup={false}
        localizer={localizer}
        className="h-full rbc__scheduler"
        events={events}
        view={view}
        defaultView={Views.MONTH}
        onView={handleViewChange}
        onEventDrop={handleEventEdit}
        onEventResize={handleEventEdit}
        eventPropGetter={CEventPropGetter}
        dayPropGetter={CDayPropGetter}
        components={{
          month: {
            event: CEvent,
          },
        }}
      />
    </>
  );
}

export default Scheduler;
