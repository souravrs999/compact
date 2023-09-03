"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LucideIcon } from "lucide-react";
import React, { useState } from "react";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { generateFallbackString } from "@/utils/strings";
import { userProfileSchema } from "@/lib/validations/user";
import FormInput from "@/components/FormInput";

type CustomTags = {
  activeTab: string;
  value: string;
  label: string;
  description: string;
  Icon: LucideIcon;
};

const CustomTagsTrigger = ({
  activeTab,
  value,
  label,
  description,
  Icon,
}: CustomTags) => {
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
};

function UserProfile() {
  const { data: session } = useSession();
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
          <CustomTagsTrigger
            activeTab={activeTab}
            value="account"
            label="Account"
            description="Personal information"
            Icon={Icons.user}
          />
          <CustomTagsTrigger
            activeTab={activeTab}
            value="settings"
            label="Settings"
            description="Change Password, 2FA"
            Icon={Icons.settings}
          />
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
              <div className="relative">
                <Avatar className="flex-none w-24 h-24">
                  <AvatarImage
                    src={session?.user?.image || undefined}
                    alt="User profile image"
                  />
                  <AvatarFallback className="capitalize font-bold text-muted-foreground text-2xl">
                    {generateFallbackString(session?.user?.name || "U")}
                  </AvatarFallback>
                </Avatar>
                <span className="grid place-items-center absolute bg-blue-500 rounded-full w-6 h-6 bottom-1 right-1">
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
                    <FormInput
                      id="profile-username"
                      form={form}
                      name="username"
                      label="Username"
                      placeholder="jane@smith"
                    />
                    <FormInput
                      id="profile-company"
                      form={form}
                      name="company"
                      label="Company"
                      placeholder=""
                    />
                    <FormInput
                      id="profile-first-name"
                      form={form}
                      name="firstName"
                      label="First Name"
                      placeholder="Jane"
                    />
                    <FormInput
                      id="profile-last-name"
                      form={form}
                      name="lastName"
                      label="Last Name"
                      placeholder="Smith"
                    />
                    <FormInput
                      id="profile-designation"
                      form={form}
                      name="designation"
                      label="Designation"
                      placeholder=""
                    />
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
                    <FormInput
                      id="profile-address"
                      form={form}
                      name="address"
                      label="Address"
                      placeholder=""
                    />
                    <FormInput
                      id="profile-city"
                      form={form}
                      name="city"
                      label="City"
                      placeholder=""
                    />
                    <FormInput
                      id="profile-country"
                      form={form}
                      name="country"
                      label="Country"
                      placeholder=""
                    />
                    <FormInput
                      id="profile-state"
                      form={form}
                      name="state"
                      label="State"
                      placeholder=""
                    />
                    <FormInput
                      id="profile-zip"
                      form={form}
                      name="zip"
                      label="Zip"
                      placeholder=""
                    />
                  </div>
                </div>
                <div className="flex gap-2 items-center ml-2">
                  <Button variant="outline" className="w-36">
                    Discard
                  </Button>
                  <Button className="w-32">Save</Button>
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
