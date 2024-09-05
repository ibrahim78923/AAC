import { ARRAY_INDEX, NOTISTACK_VARIANTS } from '@/constants/strings';
import dayjs from 'dayjs';
import { enqueueSnackbar } from 'notistack';

export const transformResponse = (response: any) => {
  if (response) return response?.data;
};

export const errorSnackbar = (message?: any) => {
  enqueueSnackbar(
    Array?.isArray(message) ? message?.[0] : message ?? `Something went wrong`,
    {
      variant: NOTISTACK_VARIANTS?.ERROR,
    },
  );
};

export const successSnackbar = (message: any = 'Success') => {
  enqueueSnackbar(message, {
    variant: NOTISTACK_VARIANTS?.SUCCESS,
  });
};

export const warningSnackbar = (message: any) => {
  enqueueSnackbar(message, {
    variant: NOTISTACK_VARIANTS?.WARNING,
  });
};

export const filteredEmptyValues = (data = {}) => {
  const filteredObject: any = Object?.entries(data || {})
    ?.filter(
      ([, value]: any) => value !== undefined && value != '' && value != null,
    )
    ?.reduce((acc: any, [key, value]: any) => ({ ...acc, [key]: value }), {});

  return filteredObject;
};

export const buildQueryParams = (
  additionalParams: any,
  filterLists: any = {},
  neglectKeysInLoop: any = [],
  extraFilters: any = [],
) => {
  const getQueryParam = new URLSearchParams();

  Object?.entries(filterLists || {})?.forEach(([key, value]: any) => {
    if (neglectKeysInLoop?.includes(key)) return;
    if (value instanceof Date)
      return getQueryParam?.append(key, value?.toISOString());
    if (typeof value === 'string') return getQueryParam?.append(key, value);
    getQueryParam?.append(key, value?._id);
  });

  addDateTimeParam(
    getQueryParam,
    'plannedEndDate',
    filterLists?.plannedEndDate,
    filterLists?.plannedEndTime,
  );
  addDateTimeParam(
    getQueryParam,
    'plannedStartDate',
    filterLists?.plannedStartDate,
    filterLists?.plannedStartTime,
  );

  additionalParams?.forEach(([key, value]: any) => {
    getQueryParam?.append(key, value);
  });
  extraFilters?.forEach(([key, value]: any) => {
    getQueryParam?.append(key, value);
  });
  return getQueryParam;
};

export const makeDateTime = (date: any, time: any) => {
  const hour = time?.getHours() ?? date?.getHours();
  const minutes = time?.getMinutes() ?? date?.getMinutes();
  const year = date?.getFullYear() ?? time?.getFullYear();
  const month = date?.getMonth() ?? time?.getMonth();
  const day = date?.getDate() ?? time?.getDate();
  const combined: any = new Date(year, month, day, hour, minutes, 0);
  return combined;
};

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

export const addDateTimeParam = (
  getQueryParam: any,
  paramKey: any,
  date: any,
  time: any,
) => {
  if (!!date || !!time) {
    getQueryParam?.append(paramKey, makeDateTime(date, time)?.toISOString());
  }
};
export const capitalizeFirstLetter = (type: string) => {
  return type
    ?.split('_')
    ?.map(
      (word: string) =>
        word?.charAt(0)?.toUpperCase() + word?.slice(1)?.toLowerCase(),
    )
    ?.join('  ');
};
export const timeFormatter = (time: any) => {
  const timeComponents = time?.split(':');
  const hours = parseInt(timeComponents?.[0]);
  const minutes = parseInt(timeComponents?.[1]);
  const dateObj = new Date();
  dateObj?.setHours(hours);
  dateObj?.setMinutes(minutes);
  dateObj?.setSeconds(0);
  return dateObj;
};
export const monthFormatter = (monthString: any) => {
  const monthMap: any = {
    january: 0,
    february: 1,
    march: 2,
    april: 3,
    may: 4,
    june: 5,
    july: 6,
    august: 7,
    september: 8,
    october: 9,
    november: 10,
    december: 11,
  };
  const monthIndex = monthMap[monthString?.toLowerCase()];
  return new Date(2000, monthIndex, 1);
};

export const camelCaseToTitleCase = (camelStr: string) =>
  camelStr
    ?.split(/(?=[A-Z])/)
    ?.map(
      (word: string) =>
        word?.charAt(ARRAY_INDEX?.ZERO)?.toUpperCase() + word?.slice?.(1),
    )
    ?.join(' ');

export const splitCapitalizedWords = (str: string) => {
  return str
    ?.split('_')
    ?.map((word: string) => word?.toLowerCase())
    ?.map((word: string) => word?.charAt(0)?.toUpperCase() + word?.slice(1))
    ?.join(' ');
};

export const capitalizeFirstWord = (str: string) => {
  return str?.charAt(0)?.toUpperCase() + str?.slice(1)?.toLowerCase();
};
