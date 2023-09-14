"use client";

import React, { FC, SyntheticEvent, useCallback, useState } from "react";
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

import RBC from "../Calendar";
import { dateLib } from "@/lib/dayjs";
import { _mockScheduler } from "../../../_mock/data";
import SchedulerPopover from "./Popover";
import { cn } from "@/lib/utils";

const localizer = dayjsLocalizer(dayjs);
const DNDCalendar = withDragAndDrop(RBC);

type TFocusEvent = {
  event: Event;
  coords: string | number[];
};

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
      {event?.title}
    </div>
  );
};

function Scheduler() {
  const [view, setView] = useState<View>("month");
  const [activeEvent, setActiveEvent] = useState<TFocusEvent | null>(null);
  const [events, setEvents] = useState<Event[]>(
    _mockScheduler.map((e) => ({
      ...e,
      start: dateLib(e.start).utc().local().toDate(),
      end: dateLib(e.end).utc().local().toDate(),
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

  function handleEventClick(data: Event, e: SyntheticEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const top = rect.bottom + window.scrollY + 5;
    const left = rect.left + window.scrollX;

    setActiveEvent({ event: data, coords: [top, left] });
  }

  const handleViewChange = useCallback(
    (view: View) => {
      setView(view);
    },
    [setView]
  );

  const handleEventClose = useCallback(() => {
    setActiveEvent(null);
  }, [setActiveEvent]);

  return (
    <>
      <DNDCalendar
        popup
        resizable
        localizer={localizer}
        className="h-full rbc__scheduler"
        events={events}
        view={view}
        defaultView={Views.MONTH}
        onView={handleViewChange}
        onEventDrop={handleEventEdit}
        onEventResize={handleEventEdit}
        onSelectEvent={handleEventClick}
        eventPropGetter={CEventPropGetter}
        dayPropGetter={CDayPropGetter}
        components={{
          month: {
            event: CEvent,
          },
        }}
      />
      {activeEvent && (
        <SchedulerPopover
          open={Boolean(activeEvent)}
          coords={activeEvent?.coords}
          event={activeEvent?.event}
          onClose={handleEventClose}
        />
      )}
    </>
  );
}

export default Scheduler;
