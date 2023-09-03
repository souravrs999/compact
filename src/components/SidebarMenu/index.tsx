"use client";

import React, { MouseEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { cn } from "@/lib/utils";
import { Icons } from "../icons";

type MenuItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  url?: string;
  children?: MenuItem[];
};

type Props = {
  menu: MenuItem;
};

function SidebarMenuItem({ menu }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  function handleMenuItemClick(e: MouseEvent<HTMLDivElement>, el: MenuItem) {
    if (el?.url && !el?.children) {
      router.push(el.url);
    }
  }

  return (
    <li>
      <Collapsible open={open} onOpenChange={() => setOpen((open) => !open)}>
        <CollapsibleTrigger className="w-full">
          <div
            onClick={(e) => handleMenuItemClick(e, menu)}
            className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-muted text-foreground border-l-4 border-transparent hover:border-primary pr-6 justify-between"
          >
            <div className="flex items-center">
              <span className="inline-flex justify-center items-center ml-4">
                <menu.icon className="w-4 h-4" />
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">
                {menu.label}
              </span>
            </div>
            {menu.children && (
              <Icons.close
                className={cn(
                  "w-5 h-5 text-muted-foreground p-1 bg-muted rounded-full",
                  {
                    "rotate-45": !open,
                  }
                )}
              />
            )}
          </div>
        </CollapsibleTrigger>
        {menu.children && (
          <CollapsibleContent className="ml-7 border-l">
            {menu.children.map((item) => (
              <div
                key={item.id}
                onClick={(e) => handleMenuItemClick(e, item)}
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-muted text-foreground border-l-4 border-transparent hover:border-primary pr-6 cursor-pointer"
              >
                <span className="ml-2 text-sm tracking-wide truncate">
                  {item.label}
                </span>
              </div>
            ))}
          </CollapsibleContent>
        )}
      </Collapsible>
    </li>
  );
}

export default SidebarMenuItem;
