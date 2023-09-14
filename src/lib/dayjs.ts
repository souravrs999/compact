import dayjs from "dayjs";

import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);

export const dateLib = dayjs;

export function getTimeDifference(
  start: Date | undefined,
  end: Date | undefined
) {
  if (!start || !end) return;
  return dateLib(end).diff(start, "hour");
}

export function formatDate(
  date: Date | undefined,
  format: string = "MMMM Do, YYYY"
) {
  if (!date) return;
  return dayjs(date).format(format);
}
