import { Event as RBCEvent } from "react-big-calendar";

declare module "react-big-calendar" {
  interface TEvent extends RBCEvent {
    id?: string | number;
    color?: string;
  }
}
