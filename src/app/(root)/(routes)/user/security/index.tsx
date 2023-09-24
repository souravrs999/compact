import { Icons } from "@/components/icons";
import { Separator } from "@/components/ui/separator";
import React from "react";

function Security() {
  return (
    <>
      <div className="p-2 flex flex-col space-y-2">
        <div className="flex flex-col">
          <h3 className="font-bold text-lg text-foreground">
            Security & Login
          </h3>
          <p className="text-muted-foreground text-sm">
            Secure your account and manage your login details and privacy
            settings.
          </p>
        </div>
        <Separator />
        <div className="flex flex-col space-y-2 pt-2">
          <h4 className="font-semibold text-foreground">Recommended</h4>
          <div className="flex items-center space-x-4">
            <Icons.bell className="text-muted-foreground" />
            <div className="flex flex-col space-y-1">
              <h5>Security alert</h5>
              <p className="text-muted-foreground text-sm max-w-xl">
                Improve the security of your account by getting alert
                notifications when someone tries logging in to your account form
                an unknown device
              </p>
            </div>
          </div>
        </div>
        <Separator />
        <div className="flex flex-col space-y-2 pt-2">
          <h4 className="font-semibold text-foreground">
            Where You&apos;e Logged In
          </h4>
          <div className="flex items-center space-x-4">
            <Icons.monitorSmartphone className="text-muted-foreground" />
            <div className="flex flex-col space-y-1">
              <h5>Mac . Santa Monica, CA, United States</h5>
              <p className="text-muted-foreground text-sm max-w-xl">
                Chrome .{" "}
                <span className="font-semibold text-green-500">Active Now</span>
              </p>
            </div>
          </div>
          <Separator />
          <div className="flex items-center space-x-4">
            <Icons.smartphone className="text-muted-foreground" />
            <div className="flex flex-col space-y-1">
              <h5>Pixel 6A . Boggy Creek, CA, United States</h5>
              <p className="text-muted-foreground text-sm max-w-xl">Android</p>
            </div>
          </div>
          <Separator />
          <div className="flex items-center space-x-4">
            <Icons.tablet className="text-muted-foreground" />
            <div className="flex flex-col space-y-1">
              <h5>Samsung Galaxy Tab . NYC, United States</h5>
              <p className="text-muted-foreground text-sm max-w-xl">Android</p>
            </div>
          </div>
        </div>
        <Separator />
      </div>
    </>
  );
}

export default Security;
