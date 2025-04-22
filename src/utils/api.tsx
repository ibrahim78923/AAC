import { MESSAGES } from '@/constants/messages';
import { SNACKBAR_VARIANTS } from '@/constants/snackbar';
import { ARRAY_INDEX } from '@/constants/strings';
import { isoDateString } from '@/lib/date-time';
import { enqueueSnackbar } from 'notistack';
import pluralize from 'pluralize';

export const transformResponse = (response: any) => {
  if (response) return response?.data;
};

export const errorSnackbar = (message?: any) => {
  const errorMessage = Array.isArray(message)
    ? message?.[ARRAY_INDEX?.ZERO]
    : message ?? MESSAGES?.SOMETHING_WENT_WRONG;

  enqueueSnackbar(errorMessage, {
    variant: SNACKBAR_VARIANTS?.ERROR,
  });
};

export const successSnackbar = (message: any = MESSAGES?.SUCCESS) => {
  enqueueSnackbar(message, {
    variant: SNACKBAR_VARIANTS?.SUCCESS,
  });
};

export const warningSnackbar = (message: any) => {
  enqueueSnackbar(message, {
    variant: SNACKBAR_VARIANTS?.WARNING,
  });
};

export const filteredEmptyValues = (data = {}) => {
  const filteredObject: any = Object?.entries(data || {})
    ?.filter(
      ([, value]: any) => value !== undefined && value !== '' && value !== null,
    )
    ?.reduce((acc: any, [key, value]: any) => ({ ...acc, [key]: value }), {});

  return filteredObject;
};

export const buildQueryParams = (
  additionalParams: any,
  filterLists: any = {},
  extraFilters: any = [],
) => {
  const getQueryParam = new URLSearchParams();

  Object?.entries(filterLists || {})?.forEach(([key, value]: any) => {
    if (value instanceof Date)
      return getQueryParam?.append(key, isoDateString(value));
    if (typeof value === 'string') return getQueryParam?.append(key, value);
    getQueryParam?.append(key, value?._id);
  });

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
export const combineDateTime = (date: string, time?: string): Date => {
  const datePart = new Date(date);
  if (time) {
    const [hours, minutes] = time.split(':').map(Number);
    datePart.setHours(hours, minutes, 0, 0);
  }
  return datePart;
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

export const camelCaseToTitleCase = (camelStr: string, filterWord?: string) =>
  camelStr
    ?.split(/(?=[A-Z])/)
    ?.filter((word: string) => !filterWord || word !== filterWord)
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

export const capitalizeFirstWord = (str: string = '---') => {
  return str?.charAt(0)?.toUpperCase() + str?.slice?.(1)?.toLowerCase();
};

export const generateRadomString = (length = 8) => {
  const CHARACTERS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = length; i > 0; --i)
    result += CHARACTERS[Math?.floor(Math?.random() * CHARACTERS?.length)];
  return result;
};

export const convertCurrentCaseToTitleCase = (
  str: any,
  split = '-',
): string => {
  return str
    ?.split?.(split)
    ?.map?.(
      (word: string) =>
        word?.charAt?.(ARRAY_INDEX?.ZERO)?.toUpperCase?.() +
        word?.slice?.(ARRAY_INDEX?.ONE),
    )
    ?.join?.(' ');
};

export const normalizeLabel = (input: string) => {
  // Convert to lowercase, replace underscores, and split into words
  const words = input.toLowerCase().replace(/_/g, ' ').split(' ');

  const capitalized = words.map((word) => {
    // Use pluralize to singularize the word
    const singular = pluralize.singular(word);
    return singular.charAt(0).toUpperCase() + singular.slice(1);
  });

  return capitalized.join(' ');
};
