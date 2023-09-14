import React from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const Scheduler = dynamic(() => import("@/components/Scheduler"), {
  loading: () => <Skeleton className="h-full w-full rounded" />,
});

function Schedule() {
  return (
    <>
      <div className="h-screen bg-background p-2 rounded">
        <Scheduler />
      </div>
    </>
  );
}

export default Schedule;
