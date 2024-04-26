import * as yup from 'yup';
import { Typography } from '@mui/material';
import { DeleteHolidayModal } from './DeleteHolidayModal';
import dayjs from 'dayjs';
export const holidaysListsColumn: any = (setHolidaysData: any) => [
  {
    accessorFn: (row: any) => row?.date,
    id: 'date',
    header: '',
    cell: (info: any) => (
      <Typography variant="body4" color="blue.dull_blue">
        {String(info?.getValue())}
      </Typography>
    ),
  },
  {
    accessorFn: (row: any) => row?.name,
    id: 'name',
    header: '',
    cell: (info: any) => (
      <Typography variant="body4" color="blue.dull_blue">
        {info?.getValue()}
      </Typography>
    ),
  },
  {
    accessorFn: (row: any) => row?.uuid,
    id: 'uuid',
    header: '',
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
export const importHolidaysDropDown = (setButtonName: any) =>
  Object.keys(holidaysDropDownData)?.map((item: any) => ({
    title: item,
    handleClick: (close: any) => {
      setButtonName(item);
      close();
    },
  }));
export const serviceHour = [
  {
    label: '24 hrs x days',
    value: '24/7',
  },
  {
    label: 'Select working days/hours',
    value: 'SELECTED',
  },
];
export const selectWorkingHours = 'SELECTED';
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
  timeZone: data?.timeZone ?? '',
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
      startTime: yup
        ?.string()
        ?.nullable()
        ?.test(
          'start_time_test',
          'Start time should follow end time',
          function (value) {
            const { endTime } = this?.parent;
            return isSameOrBeforeFunc(value, endTime);
          },
        ),
      endTime: yup
        ?.string()
        ?.nullable()
        ?.test(
          'end_time_test',
          'End time must be After start time',
          function (value) {
            const { startTime } = this?.parent;
            return isSameOrBeforeFunc(startTime, value);
          },
        ),
    }),
  ),
});
const isSameOrBeforeFunc = (startTime: any, endTime: any) => {
  if (startTime || endTime) {
    const startTimeObj = dayjs?.(startTime, 'HH:mm');
    const endTimeObj = dayjs?.(endTime, 'HH:mm');
    return (
      endTimeObj?.isAfter?.(startTimeObj) && !endTimeObj?.isSame?.(startTimeObj)
    );
  }
  return true;
};
export const businessHourValidationSchema: any = yup?.object()?.shape({
  name: yup
    ?.string()
    ?.required('Required')
    ?.required('Required')
    ?.min(3, 'At least 3 characters Required')
    ?.max(20, 'Must not exceed 20 characters'),
  description: yup?.string(),
  timeZone: yup?.string()?.required('Required'),
  serviceHours: yup?.string()?.required('Required'),
  importHolidays: yup?.string(),
  monday: dayTimingsValidationSchema,
  tuesday: dayTimingsValidationSchema,
  wednesday: dayTimingsValidationSchema,
  thursday: dayTimingsValidationSchema,
  friday: dayTimingsValidationSchema,
  saturday: dayTimingsValidationSchema,
  sunday: dayTimingsValidationSchema,
});
