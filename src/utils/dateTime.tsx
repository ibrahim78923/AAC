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
