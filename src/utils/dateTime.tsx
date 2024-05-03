import dayjs from 'dayjs';

const MINUTES_IN_HOUR = 60;
const MINUTES_IN_DAY = 24 * MINUTES_IN_HOUR;
const MINUTES_IN_MONTH = 30 * MINUTES_IN_DAY;
const MINUTES_IN_YEAR = 365 * MINUTES_IN_DAY;

export const formatTimeDifference = (isoDateString: string) => {
  const diffMinutes = dayjs().diff(dayjs(isoDateString), 'minute');

  if (diffMinutes < MINUTES_IN_HOUR) {
    return formatTimeUnit(diffMinutes, 'minute');
  }
  if (diffMinutes < MINUTES_IN_DAY) {
    return formatTimeUnit(diffMinutes, 'hour', MINUTES_IN_HOUR);
  }
  if (diffMinutes < MINUTES_IN_MONTH) {
    return formatTimeUnit(diffMinutes, 'day', MINUTES_IN_DAY);
  }
  if (diffMinutes < MINUTES_IN_YEAR) {
    return formatTimeUnit(diffMinutes, 'month', MINUTES_IN_MONTH);
  }

  return formatTimeUnit(diffMinutes, 'year', MINUTES_IN_YEAR);
};

const formatTimeUnit = (diff: number, unit: string, base: number = 1) => {
  const value = Math.floor(diff / base);
  return `${value} ${unit}${value !== 1 ? 's' : ''} ago`;
};

export const UnixDateFormatter = ({
  timestamp,
  timeZone = 'UTC',
  locale = 'en-GB',
}: any) => {
  if (typeof timestamp !== 'number') {
    return <span>Invalid timestamp</span>;
  }
  const date = new Date(timestamp * 1000);

  const formatter = new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone,
    timeZoneName: 'short',
  });

  const formattedDate = formatter?.format(date);

  return <span>{formattedDate}</span>;
};
