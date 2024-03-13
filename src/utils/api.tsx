import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { enqueueSnackbar } from 'notistack';

export const transformResponse = (response: any) => {
  if (response) return response?.data;
};

export const errorSnackbar = (message?: any) => {
  enqueueSnackbar(message ?? `Something went wrong`, {
    variant: NOTISTACK_VARIANTS?.ERROR,
  });
};

export const successSnackbar = (message: any) => {
  enqueueSnackbar(message, {
    variant: NOTISTACK_VARIANTS?.SUCCESS,
  });
};

export const warningSnackbar = (message: any) => {
  enqueueSnackbar(message, {
    variant: NOTISTACK_VARIANTS?.WARNING,
  });
};

export const buildQueryParams = (
  additionalParams: any,
  filterLists: any,
  neglectKeysInLoop: any = [],
  extraFilters: any = [],
) => {
  const getQueryParam = new URLSearchParams();

  Object?.entries(filterLists || {})?.forEach(([key, value]: any) => {
    if (neglectKeysInLoop?.includes(key)) return;
    if (value instanceof Date)
      return getQueryParam?.append(key, value?.toISOString());
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
