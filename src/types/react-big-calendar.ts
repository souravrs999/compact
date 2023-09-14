import { Event as RBCEvent } from "react-big-calendar";

declare module "react-big-calendar" {
  interface Event extends RBCEvent {
    id: string | number;
    color?: string;
  }
}
