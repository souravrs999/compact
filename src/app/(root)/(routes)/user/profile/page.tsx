"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LucideIcon } from "lucide-react";
import React, { useState } from "react";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import Account from "../account";
import Security from "../security";

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
  const [activeTab, setActiveTab] = useState<string>("account");
  const [tabCollapsed, setTabCollapsed] = useState<boolean>(false);

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
            value="security"
            label="Security & Login"
            description="Change Password, 2FA"
            Icon={Icons.settings}
          />
        </TabsList>
        <TabsContent
          value="account"
          className="relative border-l p-1 w-full mt-0"
        >
          <Account
            tabCollapsed={tabCollapsed}
            setTabCollapsed={setTabCollapsed}
          />
        </TabsContent>
        <TabsContent
          value="security"
          className="relative border-l p-1 w-full mt-0"
        >
          <Security />
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
