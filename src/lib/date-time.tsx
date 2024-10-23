import { DATE_FORMAT, DATE_TIME_FORMAT } from '@/constants';
import dayjs, { ManipulateType, OpUnitType } from 'dayjs';

const JUST_NOW = 0;
const MINUTES_IN_HOUR = 60;
const MINUTES_IN_DAY = 24 * MINUTES_IN_HOUR;
const MINUTES_IN_MONTH = 30 * MINUTES_IN_DAY;
const MINUTES_IN_YEAR = 365 * MINUTES_IN_DAY;

export const localeDateTime = (date: string) =>
  new Date(dayjs(date?.slice?.(0, -1))?.format());

export const isoDateString = (date: Date) =>
  dayjs(date)?.format(DATE_TIME_FORMAT?.YYMMDD);

export const uiDateFormat = (date: Date | string) =>
  dayjs(date)?.format(DATE_FORMAT?.UI);

export const otherDateFormat = (date: Date | string, format?: string) =>
  dayjs(date)?.format(format);

export const formatTimeDifference = (isoDateString: string | Date) => {
  const diffMinutes = dayjs()?.diff(dayjs(isoDateString), 'minute');

  if (diffMinutes <= JUST_NOW) {
    return 'Just now';
  }

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
  const value = Math?.floor(diff / base);
  return `${value} ${unit}${value !== 1 ? 's' : ''} ago`;
};

export const diffMinutesFormate = (
  dateString: Date | string,
  baseDate: Date | string,
) => dayjs(dateString)?.diff(dayjs(baseDate), 'minute');

export const TimeFormatDuration = (
  startTime: string,
  endTime: string,
): string => {
  const [startHours, startMinutes] = startTime?.split(':')?.map(Number) || [
    0, 0,
  ];
  const [endHours, endMinutes] = endTime?.split(':')?.map(Number) || [0, 0];
  const startDateTime = dayjs()
    .set('hour', startHours)
    ?.set('minute', startMinutes);
  const endDateTime = dayjs().set('hour', endHours)?.set('minute', endMinutes);
  const durationMinutes = endDateTime?.diff(startDateTime, 'minute');
  const adjustedDurationMinutes =
    durationMinutes < 0 ? 1440 + durationMinutes : durationMinutes;
  return `${Math?.floor(adjustedDurationMinutes / 60)}h ${
    adjustedDurationMinutes % 60
  }m`;
};

export const subtractTime = (
  date: Date | string,
  value: number,
  unit: ManipulateType | undefined,
  toDate?: boolean,
) => {
  const result = dayjs(date)?.subtract(value, unit);
  return toDate ? result?.toDate() : result?.toISOString();
};

export const addTime = (
  date: Date | string,
  value: number,
  unit: ManipulateType | undefined,
  toDate?: boolean,
) => {
  const result = dayjs(date)?.add(value, unit);
  return toDate ? result?.toDate() : result?.toISOString();
};

export const startOfTime = (
  date: Date | string,
  unit: OpUnitType,
  toDate?: boolean,
) => {
  const result = dayjs(date)?.startOf(unit);
  return toDate ? result?.toDate() : result?.toISOString();
};

export const endOfTime = (
  date: Date | string,
  unit: OpUnitType,
  toDate?: boolean,
) => {
  const result = dayjs(date)?.endOf(unit);
  return toDate ? result?.toDate() : result?.toISOString();
};

export const parsedDateFormat = (date: Date | string, format?: string) =>
  format ? dayjs(date, format) : dayjs(date);

export const formatDateExpiry = (date: any) => {
  const parsedDate = dayjs(date);
  const presentDate = dayjs();
  const isExpired = presentDate?.isAfter(parsedDate);
  if (isExpired) return 'Expired';
  else {
    const formattedDate = parsedDate?.format(DATE_TIME_FORMAT?.DMMMY);
    const daysDifference = parsedDate?.diff(dayjs(), 'day');
    const finalOutput = `${formattedDate} (in ${daysDifference} days)`;
    return finalOutput;
  }
};
const today = dayjs();
export const disableTime = (time: any, dateFrom: any, dateTo: any) => {
  if (dayjs(dateFrom && dateTo)?.isSame(today, 'day')) {
    return dayjs(time)?.isBefore(today, 'minute');
  }
  return false;
};
export const disableTimeCheckingStartTime = (
  time: any,
  dateFrom: any,
  dateTo: any,
  startTime: any,
) => {
  if (dateFrom && dateTo && dayjs(dateFrom)?.isSame(dateTo, 'day')) {
    return time < startTime;
  }
  return false;
};
export const startOfFormat = (
  date: Date | string,
  unit: OpUnitType,
  format: string,
) => dayjs(date)?.startOf(unit)?.format(format);

export const endOfFormat = (
  date: Date | string,
  unit: OpUnitType,
  format: string,
) => dayjs(date)?.endOf(unit)?.format(format);

export const startOfAddTime = (
  date: Date | string,
  unitStart: OpUnitType,
  value: number,
  unitAdd: ManipulateType | undefined,
  toDate?: boolean,
) => {
  const result = dayjs(date)?.startOf(unitStart)?.add(value, unitAdd);
  return toDate ? result?.toDate() : result?.toISOString();
};
