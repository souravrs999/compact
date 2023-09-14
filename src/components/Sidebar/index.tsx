"use client";

import React, { useState } from "react";
import { Icons } from "../icons";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import ProfileMenu from "../SidebarProfileMenu";
import { menuList } from "@/config";
import { useDispatch, useSelector } from "@/lib/redux";
import { cn } from "@/lib/utils";
import { applicationSlice } from "@/lib/redux/slices/applicationSlice";
import SidebarMenuItem from "../SidebarMenu";
import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { ScrollArea } from "../ui/scroll-area";
import { useSession } from "next-auth/react";
import { generateFallbackString } from "@/utils/strings";

function Sidebar() {
  const { sidebar } = useSelector((state) => state.application);
  const { data: session, status } = useSession();
  const [activeClient, setActiveClient] = useState<string>("nix");
  const dispatch = useDispatch();

  return (
    <div
      className={cn(
        "flex flex-col w-0 top-0 left-0 bg-background h-full border-r text-foreground overflow-hidden transition-all duration-100 ease-in-out shadow-lg shrink-0",
        {
          "w-64": sidebar.open,
        }
      )}
    >
      <div className="flex items-center p-2 h-16 border-b justify-between">
        <Image
          width={120}
          height={50}
          src="/assets/images/logo.svg"
          alt="logo"
        />
        <span
          onClick={() =>
            dispatch(applicationSlice.actions.toggleSidebar(false))
          }
          className="p-1 border rounded hover:bg-muted"
        >
          <Icons.chevronLeft className="w-4 h-4" />
        </span>
      </div>
      <ScrollArea className="h-full flex-grow">
        <ul className="flex flex-col py-4 space-y-1">
          {menuList?.map((menu) => (
            <SidebarMenuItem key={menu.id} menu={menu} />
          ))}
        </ul>
      </ScrollArea>
      <div className="flex items-center justify-between h-16 p-2 border-t">
        <Select
          onValueChange={(client: string) => setActiveClient(client)}
          defaultValue={activeClient}
        >
          <SelectTrigger className="focus:ring-0 border-none rounded-none">
            <div className="flex items-center justify-between">
              <Image
                width={30}
                height={30}
                src={`/assets/images/${activeClient}.svg`}
                alt="client"
              />
              <p className="text-base font-bold ml-5 text-foreground tracking-wider capitalize">
                {activeClient}
              </p>
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nix">
              <p className="">Nix</p>
            </SelectItem>
            <SelectItem value="craddle">
              <p className="">Craddle</p>
            </SelectItem>
            <SelectItem value="nike">
              <p className="">Nike</p>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="h-16 flex items-center justify-between p-2 border-t">
        <div className="flex items-center">
          <div className="relative">
            <Avatar className="flex-none w-10 h-10">
              <AvatarImage
                src={session?.user?.image || undefined}
                alt="User profile image"
              />
              <AvatarFallback className="capitalize font-bold text-muted-foreground">
                {generateFallbackString(session?.user?.name || "U")}
              </AvatarFallback>
            </Avatar>
            <span className="absolute w-2 h-2 bg-green-500 rounded-full top-0 right-0 ring-2 ring-background" />
          </div>
          <div className="flex flex-shrink-0 flex-col ml-3">
            <p className="text-sm font-bold">{session?.user?.name}</p>
            <p className="text-xs text-gray-500">Therapist</p>
          </div>
        </div>
        <ProfileMenu />
      </div>
    </div>
  );
}

export default Sidebar;
