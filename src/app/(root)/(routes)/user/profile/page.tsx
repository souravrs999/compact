"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LucideIcon } from "lucide-react";
import React, { useState } from "react";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { UseFormReturn, useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const userProfileSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be atleast 2 characters" }),
  firstName: z
    .string()
    .min(2, { message: "First name must be atleast 2 characters" }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be atleast 2 characters" }),
  company: z
    .string()
    .min(2, { message: "Company must be atleast 2 characters" }),
  designation: z.string().optional(),
  address: z
    .string()
    .min(5, { message: "Address must be atleast 5 characters" }),
  city: z.string().min(5, { message: "City must be atleast 5 characters" }),
  country: z
    .string()
    .min(5, { message: "Country must be atleast 5 characters" }),
  state: z.string().min(5, { message: "State must be atleast 5 characters" }),
  zip: z.string().min(5, { message: "State must be atleast 5 characters" }),
});

function customTagsTrigger(
  activeTab: string,
  value: string,
  label: string,
  description: string,
  Icon: LucideIcon
) {
  return (
    <TabsTrigger
      value={value}
      className="data-[state=active]:shadow-none w-full justify-start rounded p-1 overflow-hidden"
    >
      <div className="flex items-center justify-between gap-2 w-full">
        <div className="flex items-center ml-1">
          <div
            className={cn("p-3 bg-muted rounded", {
              "bg-primary text-white": activeTab === value,
            })}
          >
            <Icon className="w-4 h-4" />
          </div>
          <div className="flex flex-col gap-1 items-start p-2 ml-2">
            <p className="text-foreground">{label}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
        <Icons.chevronRight className="w-4 h-4" />
      </div>
    </TabsTrigger>
  );
}

function customFormField(
  form: UseFormReturn<any>,
  name: string,
  label: string
) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-xs text-muted-foreground">
            {label}
          </FormLabel>
          <FormControl>
            <Input
              placeholder="Last Name"
              {...field}
              className="h-8 focus-visible:ring-offset-0 font-semibold rounded"
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

function UserProfile() {
  const [activeTab, setActiveTab] = useState<string>("account");
  const [tabCollapsed, setTabCollapsed] = useState<boolean>(false);

  const form = useForm<z.infer<typeof userProfileSchema>>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      username: "jane@smith",
      firstName: "Jane",
      lastName: "Smith",
      company: "Lucide",
      designation: "Developer",
      address: "1234 Buggy Street, MC Square",
      city: "New York NY",
      country: "United States of America",
      state: "California",
      zip: "01234",
    },
  });

  function onSubmit(values: z.infer<typeof userProfileSchema>) {
    console.log(values);
  }

  return (
    <div className="w-full h-full overflow-y-auto bg-background rounded p-2">
      <div className="border-b p-2">
        <h3 className="font-bold text-2xl text-foreground">Account</h3>
      </div>
      <Tabs
        onValueChange={(tab) => setActiveTab(tab)}
        defaultValue="account"
        orientation="vertical"
        className="flex mt-1"
      >
        <TabsList
          className={cn(
            "flex flex-col bg-background h-full w-80 overflow-hidden",
            {
              "w-[72px]": tabCollapsed,
            }
          )}
        >
          {customTagsTrigger(
            activeTab,
            "account",
            "Account",
            "Personal information",
            Icons.user
          )}
          {customTagsTrigger(
            activeTab,
            "settings",
            "Settings",
            "Change Password, 2FA",
            Icons.settings
          )}
        </TabsList>
        <TabsContent
          value="account"
          className="relative border-l p-1 w-full mt-0"
        >
          <div className="p-2 flex flex-col gap-2">
            <div className="flex flex-col">
              <h3 className="font-bold text-foreground">Account</h3>
              <p className="text-muted-foreground text-xs">
                Review or Edit personal information, profile picture, contact
                information etc...
              </p>
            </div>
            <div className="flex items-center mt-2 py-2 border-b">
              <div className="relative w-24 h-24">
                <Image
                  src="https://github.com/shadcn.png"
                  width={100}
                  height={100}
                  alt="user profile image"
                  className="overflow-hidden rounded-full"
                />
                <span className="grid place-items-center absolute bg-blue-500 rounded-full w-6 h-6 bottom-0 right-0">
                  <Icons.pencil className="w-3 h-3 text-white" />
                </span>
              </div>
              <div className="ml-4">
                <h3 className="font-bold text-foreground">Profile Picture</h3>
                <p className="text-muted-foreground text-xs">
                  Update or Edit your profile picture over here
                </p>
              </div>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-2 grid-cols-1 lg:grid-cols-2"
              >
                <div className="flex flex-col p-2">
                  <div className="flex flex-col">
                    <h3 className="font-bold text-foreground">
                      Personal Information
                    </h3>
                    <p className="text-muted-foreground text-xs">
                      Update or Edit your personal information like your Name,
                      DOB etc ...
                    </p>
                  </div>
                  <div className="mt-4 grid md:grid-cols-2 gap-2">
                    {customFormField(form, "username", "Username")}
                    {customFormField(form, "company", "Company")}
                    {customFormField(form, "firstName", "First Name")}
                    {customFormField(form, "lastName", "Last Name")}
                    {customFormField(form, "designation", "Designation")}
                  </div>
                </div>
                <div className="flex flex-col p-2">
                  <div className="flex flex-col">
                    <h3 className="font-bold text-foreground">
                      Contact Information
                    </h3>
                    <p className="text-muted-foreground text-xs">
                      Update or Edit your contact information like your Address,
                      Phone etc ...
                    </p>
                  </div>
                  <div className="mt-4 grid md:grid-cols-2 gap-2">
                    {customFormField(form, "address", "Address")}
                    {customFormField(form, "city", "City")}
                    {customFormField(form, "country", "Country")}
                    {customFormField(form, "state", "State/Province")}
                    {customFormField(form, "zip", "Zip")}
                  </div>
                </div>
                <div className="flex gap-2 items-center ml-2">
                  <Button variant="outline" className="w-36">
                    Discard Changes
                  </Button>
                  <Button className="w-32">Save Changes</Button>
                </div>
              </form>
            </Form>
          </div>
          <span
            onClick={() => setTabCollapsed((collapsed) => !collapsed)}
            className="absolute -top-[17px] -left-[13px] bg-background border rounded p-1"
          >
            {tabCollapsed ? (
              <Icons.chevronRight className="w-4 h-4 text-muted-foreground" />
            ) : (
              <Icons.chevronLeft className="w-4 h-4 text-muted-foreground" />
            )}
          </span>
        </TabsContent>
        <TabsContent
          value="settings"
          className="relative border-l p-1 w-full mt-0"
        >
          <p>settings</p>
          <span
            onClick={() => setTabCollapsed((collapsed) => !collapsed)}
            className="absolute -top-[17px] -left-[13px] bg-background border rounded p-1"
          >
            {tabCollapsed ? (
              <Icons.chevronRight className="w-4 h-4 text-muted-foreground" />
            ) : (
              <Icons.chevronLeft className="w-4 h-4 text-muted-foreground" />
            )}
          </span>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default UserProfile;
