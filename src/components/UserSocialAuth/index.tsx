"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";

import { Button } from "../ui/button";
import { Icons } from "../icons";

function UserSocialAuth() {
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);
  const [facebookLoading, setFacebookLoading] = useState<boolean>(false);

  function handleGoogleLogin() {
    setGoogleLoading(true);
    signIn("google");
  }

  function handleFacebookLogin() {
    setFacebookLoading(true);
    signIn("facebook");
  }

  return (
    <div className="flex items-center justify-between gap-2">
      <Button
        variant="outline"
        className="w-full"
        disabled={googleLoading}
        onClick={handleGoogleLogin}
      >
        <Icons.google className="w-4 h-4 mr-2" />
        Google
      </Button>
      <Button
        variant="outline"
        className="w-full"
        disabled={facebookLoading}
        onClick={handleFacebookLogin}
      >
        <Icons.facebook className="w-4 h-4 mr-2" />
        Facebook
      </Button>
    </div>
  );
}

export default UserSocialAuth;
