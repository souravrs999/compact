"use client";

import React, { useState } from "react";
import * as z from "zod";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../FormInput";
import { eventCreationSchema } from "@/lib/validations/schedule";
import { DatePicker } from "../ui/date-picker";
import ColorPicker from "../ui/color-labels";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import { SlotInfo } from "react-big-calendar";

type TEventCreationDialog = {
  slot?: SlotInfo;
  onCreate: (data: z.infer<typeof eventCreationSchema>) => void;
  onClose: () => void;
};

function EventCreationDialog({
  slot,
  onCreate,
  onClose,
}: TEventCreationDialog) {
  const form = useForm<z.infer<typeof eventCreationSchema>>({
    resolver: zodResolver(eventCreationSchema),
    defaultValues: {
      name: "",
      start: slot?.start || new Date(),
      end: slot?.end || new Date(),
      color: null,
    },
  });

  function onSubmit(values: z.infer<typeof eventCreationSchema>) {
    onCreate(values);
    onClose();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-2"
      >
        <FormInput
          form={form}
          id="event-name"
          name="name"
          label="Name *"
          type="text"
          placeholder="Event name"
        />
        <div className="flex items-center gap-1">
          <FormField
            control={form.control}
            name="start"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel>Start date</FormLabel>
                <DatePicker
                  value={field.value}
                  label="Start date"
                  onChange={field.onChange}
                />
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="end"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel>End date</FormLabel>
                <DatePicker
                  value={field.value}
                  label="End date"
                  onChange={field.onChange}
                />
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col space-y-1 items-start">
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Label</FormLabel>
                <ColorPicker
                  value={field.value || null}
                  onChange={field.onChange}
                />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col items-start space-y-1">
          <p>Participants</p>
          <span className="border-dashed border-2 p-1 rounded-full">
            <Icons.plus className="w-5 h-5 text-muted-foreground/50" />
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            onClick={() => form.reset()}
            className="w-full"
          >
            Discard changes
          </Button>
          <Button className="w-full" type="submit">
            Save changes
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default EventCreationDialog;
