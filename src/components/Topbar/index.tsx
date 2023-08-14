"use client";

import React from "react";
import { Icons } from "../icons";
import { useDispatch, useSelector } from "@/lib/redux";
import { applicationSlice } from "@/lib/redux/slices/applicationSlice";

function Topbar() {
  const { sidebar } = useSelector((state) => state.application);
  const dispatch = useDispatch();

  function handleSidebarOpen() {
    if (!sidebar.open) {
      dispatch(applicationSlice.actions.toggleSidebar(true));
    }
  }

  return (
    <div className="h-16 border-b">
      <div className="flex items-center p-2 h-full">
        <span
          onClick={handleSidebarOpen}
          className="p-1 border rounded bg-background hover:bg-muted"
        >
          <Icons.menuLine className="w-4 h-4 -rotate-90" />
        </span>
      </div>
    </div>
  );
}

export default Topbar;
