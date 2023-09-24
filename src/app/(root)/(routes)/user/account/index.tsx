import React from "react";
import FormInput from "@/components/FormInput";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { generateFallbackString } from "@/utils/strings";
import { Icons } from "@/components/icons";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { userProfileSchema } from "@/lib/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";

type TProps = {
  tabCollapsed: boolean;
  setTabCollapsed: (collapsed: boolean) => void;
};

function Account({ tabCollapsed, setTabCollapsed }: TProps) {
  const { data: session } = useSession();
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
    <>
      <div className="p-2 flex flex-col gap-2">
        <div className="flex flex-col">
          <h3 className="font-bold text-lg text-foreground">Account</h3>
          <p className="text-muted-foreground text-sm">
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
                  Update or Edit your personal information like your Name, DOB
                  etc ...
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
        onClick={() => setTabCollapsed(!tabCollapsed)}
        className="absolute -top-[17px] -left-[13px] bg-background border rounded p-1"
      >
        {tabCollapsed ? (
          <Icons.chevronRight className="w-4 h-4 text-muted-foreground" />
        ) : (
          <Icons.chevronLeft className="w-4 h-4 text-muted-foreground" />
        )}
      </span>
    </>
  );
}

export default Account;
