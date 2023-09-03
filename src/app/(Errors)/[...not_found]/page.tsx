import { Icons } from "@/components/icons";
import Link from "next/link";
import React from "react";

function Error() {
  return (
    <div className="w-full h-full">
      <div className="h-full grid place-items-center relative">
        <div className="flex flex-col items-center space-y-6 text-center max-w-xs md:max-w-md">
          <h1 className="text-9xl md:text-[15rem] font-black tracking-widest text-muted-foreground/40">
            4<span className="text-primary">0</span>4
          </h1>
          <h1 className="font-black text-4xl md:text-6xl text-foreground">
            We&apos;ve lost this page
          </h1>
          <p className="font-semibold text-muted-foreground">
            Sorry, the page you are looking for dosen&apos;t exist or has been
            moved
          </p>
          <Link href="/dashboard">
            <p className="text-primary hover:underline">
              Take me to the home page
            </p>
          </Link>
        </div>
        <Link
          href="/dashboard"
          className="absolute hidden md:block border rounded-full p-3 text-muted-foreground left-10 top-10"
        >
          <Icons.arrowMoveLeft className="w-6 h-6 text-foreground" />
        </Link>
      </div>
    </div>
  );
}

export default Error;
