import * as yup from 'yup';
import { DeleteHolidayModal } from './DeleteHolidayModal';
import dayjs from 'dayjs';
import { timeZone } from '@/constants/time-zone';
import { GLOBAL_CHARACTERS_LIMIT } from '@/constants/validation';
import { TIME_FORMAT } from '@/constants';

export const holidaysListsColumn: any = (setHolidaysData: any) => [
  {
    accessorFn: (row: { date: string }) => row?.date,
    id: 'date',
    header: 'Date',
    cell: (info: any) => String(info?.getValue()),
  },
  {
    accessorFn: (row: { name: string }) => row?.name,
    id: 'name',
    header: 'Holiday Name',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: { uuid: string }) => row?.uuid,
    id: 'uuid',
    header: 'Action',
    cell: (info: any) => (
      <DeleteHolidayModal
        setHolidaysData={setHolidaysData}
        id={info?.getValue()}
      />
    ),
  },
];

export const weekDays = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

export const holidaysDropDownData: any = {
  'Holidays in UK': 'GB',
  'Holidays in USA': 'US',
  'Holidays in UAE': 'AE',
  'Holidays in Pakistan': 'PK',
};

const getDefaultTimings = (value: any) => {
  if (value) {
    const hasNonNullTimings = value?.some(
      (timing: any) => timing?.startTime !== null || timing?.endTime !== null,
    );
    const formattedTimings = hasNonNullTimings
      ? value?.map((timing: any) => ({
          startTime: new Date(timing.startTime),
          endTime: new Date(timing.endTime),
        }))
      : [
          {
            startTime: null,
            endTime: null,
          },
        ];
    return {
      switch: hasNonNullTimings,
      timings: formattedTimings,
    };
  }
  return {
    switch: false,
    timings: [
      {
        startTime: null,
        endTime: null,
      },
    ],
  };
};

export const businessHourDefaultValues = (data?: any) => ({
  name: data?.name ?? '',
  description: data?.description ?? '',
  timeZone: data?.timeZone
    ? timeZone?.find((item: any) => item?.label === data?.timeZone)
    : null,
  serviceHours: data?.serviceHours ?? 'SELECTED',
  importHolidays: '',
  monday: getDefaultTimings(data?.monday),
  tuesday: getDefaultTimings(data?.tuesday),
  wednesday: getDefaultTimings(data?.wednesday),
  thursday: getDefaultTimings(data?.thursday),
  friday: getDefaultTimings(data?.friday),
  saturday: getDefaultTimings(data?.saturday),
  sunday: getDefaultTimings(data?.sunday),
});

const dayTimingsValidationSchema: any = yup?.object()?.shape({
  switch: yup?.boolean(),
  timings: yup?.array()?.of(
    yup?.object()?.shape({
      startTime: yup?.string()?.nullable(),
      endTime: yup
        ?.string()
        ?.nullable()
        ?.test('end_time_test', 'After start time', function (value) {
          const { startTime } = this?.parent;
          return isSameOrBeforeFunc(startTime, value);
        }),
    }),
  ),
});

const isSameOrBeforeFunc = (startTime: any, endTime: any) => {
  if (startTime || endTime) {
    const startTimeObj = dayjs?.(startTime, TIME_FORMAT?.TH);
    const endTimeObj = dayjs?.(endTime, TIME_FORMAT?.TH);
    return (
      endTimeObj?.isAfter?.(startTimeObj) && !endTimeObj?.isSame?.(startTimeObj)
    );
  }
  return true;
};

export const businessHourValidationSchema: any = yup?.object()?.shape({
  name: yup
    ?.string()
    ?.required('Name is required')
    ?.min(3, 'At least 3 characters required')
    ?.max(
      GLOBAL_CHARACTERS_LIMIT?.NAME,
      `Maximum characters limit is ${GLOBAL_CHARACTERS_LIMIT?.NAME}`,
    ),
  description: yup?.string(),
  timeZone: yup?.mixed()?.required('Time Zone is Required'),
  serviceHours: yup?.string()?.required('Service Hours are Required'),
  importHolidays: yup?.string(),
  monday: dayTimingsValidationSchema,
  tuesday: dayTimingsValidationSchema,
  wednesday: dayTimingsValidationSchema,
  thursday: dayTimingsValidationSchema,
  friday: dayTimingsValidationSchema,
  saturday: dayTimingsValidationSchema,
  sunday: dayTimingsValidationSchema,
});
