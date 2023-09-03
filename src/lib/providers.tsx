"use client";

import { Provider } from "react-redux";
import { reduxStore } from "@/lib/redux";
import { SessionProvider } from "next-auth/react";

export const Providers = (props: React.PropsWithChildren) => {
  return (
    <Provider store={reduxStore}>
      <SessionProvider>{props.children}</SessionProvider>
    </Provider>
  );
};
