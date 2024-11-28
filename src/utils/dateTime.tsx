import { REGEX } from '@/constants/validation';
import dayjs from 'dayjs';

export const UnixDateFormatter = ({
  timestamp,
  timeZone = 'UTC',
  locale = 'en-GB',
  isTime,
}: any) => {
  if (typeof timestamp !== 'number') {
    return <span>Invalid timestamp</span>;
  }
  const date = new Date(timestamp * 1000);

  let formatterOptions: Intl.DateTimeFormatOptions = {
    timeZone,
    timeZoneName: 'short',
  };

  if (isTime) {
    formatterOptions = {
      ...formatterOptions,
      hour: 'numeric',
      minute: 'numeric',
    };
  } else {
    formatterOptions = {
      ...formatterOptions,
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
  }

  const formatter = new Intl.DateTimeFormat(locale, formatterOptions);
  const formattedDate = formatter?.format(date);

  return <span>{formattedDate}</span>;
};
export const convertTimezone = (
  dateString: any,
  fromZone: any,
  toZone: any,
) => {
  return dayjs.tz(dateString, fromZone).tz(toZone).format();
};

export const formatDurationHourMinute = (value: any) => {
  if (!value) return '';

  if (REGEX?.MINUTES_ONLY?.test(value)) return `0h${value}`;

  if (REGEX?.HOURS_ONLY?.test(value)) return `${value}0m`;

  if (REGEX?.HOURS_AND_MINUTES_NO_M?.test(value)) return `${value}m`;

  if (REGEX?.INTEGER_OR_DECIMAL?.test(value)) {
    const hours = Math?.floor(parseFloat(value));
    const minutes = Math?.round((parseFloat(value) - hours) * 60);
    return `${hours}h${minutes || 0}m`;
  }

  return value;
};
