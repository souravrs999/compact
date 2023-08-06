"use client";

import { cn } from "@/lib/utils";
import { ChevronRight, ArrowLeftToLine } from "lucide-react";
import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

function Sidebar() {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <div
      className={cn(
        "w-16 border-r-[1px] border-gray-300 h-full transition-all duration-100 ease-in-out relative",
        {
          "w-64": expanded,
        }
      )}
    >
      <div className="max-h-full p-3 overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex flex-none items-center">
            <div className="relative">
              <Avatar className="rounded-lg">
                <AvatarImage src="/assets/images/avatar-cover.png" />
                <AvatarFallback className="rounded-lg bg-purple-700 text-white">
                  HP
                </AvatarFallback>
              </Avatar>
              <span className="absolute w-2 h-2 bg-green-500 ring-2 ring-white rounded-full bottom-0 right-0" />
            </div>
            <div className="flex flex-col ml-4">
              <p className="text-sm font-bold text-gray-800">Hyperion</p>
              <p className="text-[11px] font-light text-gray-500">
                Sandro&apos;s Team
              </p>
            </div>
          </div>
          <div
            onClick={() => setExpanded(false)}
            className="grid place-items-center border w-8 h-8 rounded-md cursor-pointer"
          >
            <ArrowLeftToLine className="w-4 h-4 text-gray-500" />
          </div>
        </div>
      </div>
      <span
        onClick={() => setExpanded(true)}
        className={cn(
          "p-1 bg-white border border-gray-300 rounded-full absolute -right-3 top-1/2 cursor-pointer",
          {
            hidden: expanded,
          }
        )}
      >
        <ChevronRight className="w-3 h-3 text-gray-500" />
      </span>
    </div>
  );
}

export default Sidebar;
