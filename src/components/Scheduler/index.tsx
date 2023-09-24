"use client";

import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import {
  TEvent,
  Event,
  EventPropGetter,
  EventProps,
  View,
  Views,
  dayjsLocalizer,
  SlotInfo,
  ToolbarProps,
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
import Popover from "./Popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "../ui/dialog";
import EventCreationDialog from "../EventCreationDialog";
import { z } from "zod";
import { eventCreationSchema } from "@/lib/validations/schedule";
import { DatePicker } from "../ui/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

const localizer = dayjsLocalizer(dayjs);
const DNDCalendar = withDragAndDrop(RBC);

type CToolbarType = {
  onChange: (date: Date) => void;
} & ToolbarProps;

const CEventPropGetter: EventPropGetter<TEvent> = (_event) => {
  return {
    className: "p-0 m-0 text-foreground rounded-none font-bold text-sm",
  };
};

const CEvent: FC<EventProps<TEvent>> = ({ event }) => {
  const pastEvent: boolean = dateLib(event?.end).diff(dateLib()) < 0;
  return (
    <div
      className={cn(
        "flex-1 bg-primary/30 border-l-4 border-primary py-1 px-2 h-full",
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
      <HoverCard>
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
          <HoverCardContent className="p-0 w-[20rem] rounded">
            <Popover
              title={event?.title}
              pastEvent={pastEvent}
              start={dateLib(event.start).format("hh:mm a")}
              end={dateLib(event?.end).format("hh:mm a")}
            />
          </HoverCardContent>
        </HoverCardPortal>
      </HoverCard>
    </div>
  );
};

const CToolbar: FC<CToolbarType> = (props) => {
  return (
    <div className="flex items-center justify-between mt-1 mb-2">
      <div className="flex items-center space-x-2">
        <DatePicker
          value={props?.date}
          onChange={props.onChange}
          className="font-bold w-[10rem] border-0"
        />
        <Button variant="outline" onClick={() => props.onChange(new Date())}>
          Today
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="border-0"
          onClick={() => props?.onNavigate("PREV")}
        >
          <Icons.chevronLeft className="text-muted-foreground" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="border-0"
          onClick={() => props?.onNavigate("NEXT")}
        >
          <Icons.chevronRight className="text-muted-foreground" />
        </Button>
      </div>
      <Select value={props.view} onValueChange={(e) => props.onView(e as View)}>
        <SelectTrigger className="w-[8rem]">
          <SelectValue placeholder="Month" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="day">Day</SelectItem>
          <SelectItem value="week">Week</SelectItem>
          <SelectItem value="month">Month</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

function Scheduler() {
  const clickRef = useRef<number | null>(null);
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<View>("month");
  const [selectedSlots, setSelectedSlots] = useState<SlotInfo | null>();
  const [events, setEvents] = useState<Event[]>(
    _mockScheduler.map((e) => ({
      ...e,
      start: dateLib.utc(e.start).local().toDate(),
      end: dateLib.utc(e.end).local().toDate(),
    }))
  );

  const handleEventEdit = useCallback((data: EventInteractionArgs<TEvent>) => {
    setEvents((prevEvents: TEvent[]) => {
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

  const handleSlotSelection = useCallback((slotInfo: SlotInfo) => {
    window.clearTimeout(clickRef?.current || undefined);

    clickRef.current = window.setTimeout(() => {
      setSelectedSlots(slotInfo);
    }, 250);
  }, []);

  const handleSlotSelectionDiscard = () => setSelectedSlots(null);

  const handleEventCreation = (data: z.infer<typeof eventCreationSchema>) => {
    const event = { ...data, title: data.name };
    setEvents([...events, event]);
  };

  const handleDateChange = (date: Date) => {
    setDate(date);
  };

  useEffect(() => {
    return () => window.clearTimeout(clickRef?.current || undefined);
  }, []);

  return (
    <>
      <DNDCalendar
        selectable
        resizable
        popup={false}
        date={date}
        localizer={localizer}
        className="h-full rbc__scheduler"
        events={events}
        view={view}
        defaultView={Views.MONTH}
        onView={handleViewChange}
        onEventDrop={handleEventEdit}
        onEventResize={handleEventEdit}
        eventPropGetter={CEventPropGetter}
        onSelectSlot={handleSlotSelection}
        onNavigate={(newDate) => setDate(newDate)}
        components={{
          toolbar: (props) => (
            <CToolbar {...props} onChange={handleDateChange} />
          ),
          event: CEvent,
        }}
      />
      <Dialog
        open={Boolean(selectedSlots)}
        onOpenChange={handleSlotSelectionDiscard}
      >
        <DialogContent className="w-full max-w-[24rem]">
          <DialogHeader className="font-bold">Add Event</DialogHeader>
          <DialogDescription>
            <div className="flex flex-col space-y-2">
              <p className="">
                Add a new event for the time slots selected from the calendar
              </p>
              <EventCreationDialog
                onCreate={handleEventCreation}
                slot={selectedSlots || undefined}
                onClose={handleSlotSelectionDiscard}
              />
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Scheduler;
