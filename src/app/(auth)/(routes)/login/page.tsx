import UserAuthForm from "@/components/UserAuthForm";
import { Icons } from "@/components/icons";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Login() {
  return (
    <div className="w-full h-screen grid place-items-center bg-muted">
      <div className="p-4 md:p-2 bg-background rounded shadow flex md:space-x-4">
        <div className="hidden md:block w-96">
          <AspectRatio ratio={2 / 3} className="bg-muted">
            <Image
              src="/assets/images/login-cover.jpg"
              alt="login cover"
              fill
              className="rounded object-cover"
            />
          </AspectRatio>
        </div>
        <div className="w-full md:w-96 flex flex-col items-center">
          <div className="w-64 m-auto space-y-6">
            <div className="flex flex-col">
              <h3 className="font-bold text-2xl">Welcome!</h3>
              <p className="text-muted-foreground text-sm">
                Log in your account
              </p>
            </div>
            <div className="w-full">
              <UserAuthForm />
            </div>
            <div className="w-full px-4 relative">
              <Separator />
              <span className="absolute px-2 text-xs -top-2 left-28 bg-background">
                or
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <Button variant="outline" className="w-full">
                <Icons.google className="w-4 h-4 mr-2" />
                Google
              </Button>
              <Button variant="outline" className="w-full">
                <Icons.facebook className="w-4 h-4 mr-2" />
                Facebook
              </Button>
            </div>
            <div className="w-full grid place-items-center">
              <span className="text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="hover:underline hover:text-primary"
                >
                  Sign Up
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
