"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Icons } from "../icons";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Switch } from "../ui/switch";
import Link from "next/link";

function ProfileMenu() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? resolvedTheme : theme;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Icons.dotsVertical className="w-4 h-4 text-gray-500 cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/user/profile">
            <DropdownMenuItem>
              <Icons.user className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem>
            <Icons.settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <div
          className={cn(
            "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-neutral-100 focus:text-neutral-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-neutral-800 dark:focus:text-neutral-50"
          )}
        >
          <Icons.moon className="mr-2 h-4 w-4" />
          <span>Dark Mode</span>
          <div className="flex-1" />
          <Switch
            id="theme switcher"
            checked={currentTheme === "dark"}
            onCheckedChange={() =>
              setTheme(theme !== "dark" ? "dark" : "light")
            }
          />
        </div>
        <DropdownMenuItem>
          <Icons.support className="mr-2 h-4 w-4" />
          <span>Support</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Icons.logout className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProfileMenu;
