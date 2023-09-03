"use client";

import React, { useState } from "react";
import * as z from "zod";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import FormInput from "../FormInput";
import { Checkbox } from "../ui/checkbox";
import Link from "next/link";
import { Icons } from "../icons";
import { loginSchema } from "@/lib/validations/auth";

function UserAuthForm() {
  const [passView, setPassView] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values);
  }

  function handleViewToggle() {
    setPassView((val) => !val);
  }

  const PassFieldIcon = passView ? Icons.eyeClose : Icons.eyeOpen;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormInput
          form={form}
          id="login-email"
          name="email"
          label="Email"
          type="email"
          placeholder=""
          startAdornment={
            <Icons.send className="w-4 h-4 text-muted-foreground" />
          }
        />
        <FormInput
          form={form}
          id="login-password"
          name="password"
          label="Password"
          placeholder=""
          className="mt-2"
          type={passView ? "text" : "password"}
          startAdornment={
            <Icons.keyRound className="w-4 h-4 text-muted-foreground" />
          }
          endAdornment={
            <PassFieldIcon
              className="w-4 h-4 text-muted-foreground"
              onClick={handleViewToggle}
            />
          }
        />
        <div className="w-full flex justify-between items-center mt-2">
          <div className="flex items-center">
            <Checkbox id="remember" />
            <label htmlFor="remeber" className="text-sm ml-2">
              Remeber Me
            </label>
          </div>
          <Link
            href="/forgot-password"
            className="text-sm hover:text-primary hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
        <Button type="submit" size="sm" className="w-full mt-6">
          Log In
        </Button>
      </form>
    </Form>
  );
}

export default UserAuthForm;
