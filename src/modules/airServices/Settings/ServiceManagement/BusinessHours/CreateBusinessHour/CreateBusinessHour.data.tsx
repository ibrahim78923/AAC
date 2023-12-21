import * as yup from 'yup';
import { Typography } from '@mui/material';
import { DeleteHolidayModal } from './DeleteDashboardModal';

export const holidaysListsData: any = [
  {
    _id: 3,
    date: `Aug 27, 2019`,
    holidayName: 'Kashmir Day',
  },
  {
    _id: 4,
    date: `Aug 27, 2019`,
    holidayName: 'Kashmir Day',
  },
  {
    _id: 5,
    date: `Aug 27, 2019`,
    holidayName: 'Kashmir Day',
  },
];

export const holidaysListsColumn: any = [
  {
    accessorFn: (row: any) => row?.date,
    id: 'date',
    header: '',
    cell: (info: any) => (
      <Typography variant="body4" color="blue.dull_blue">
        {info?.getValue()}
      </Typography>
    ),
  },
  {
    accessorFn: (row: any) => row?.holidayName,
    id: 'holidayName',
    header: '',
    cell: (info: any) => (
      <Typography variant="body4" color="blue.dull_blue">
        {info?.getValue()}
      </Typography>
    ),
  },
  {
    accessorFn: (row: any) => row?._id,
    id: '_id',
    header: '',
    cell: (info: any) => <DeleteHolidayModal id={info?.getValue()} />,
  },
];

export const weekDays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];
export const importHolidaysDropDown = [
  {
    title: 'Holidays in Andorra',
  },
  {
    title: 'Holidays in UAE',
  },
  {
    title: 'Holidays in Pakistan',
  },
  {
    title: 'Holidays in Albania',
  },
  {
    title: 'Holidays in Armenia',
  },
  {
    title: 'Holidays in Angola',
  },
  {
    title: 'Holidays in Austria',
  },
];
export const serviceHour = [
  {
    label: '24 hrs x days',
    value: '24HrsXDays',
  },
  {
    label: 'Select working days/hours',
    value: 'select',
  },
];
export const selectWorkingHours = 'select';
const defaultTimings = {
  switch: false,
  timings: [
    {
      startTime: null,
      endTime: null,
    },
  ],
};
export const businessHourDefaultValues = {
  name: '',
  description: '',
  timeZone: '',
  serviceHour: 'select',
  Monday: defaultTimings,
  Tuesday: defaultTimings,
  Wednesday: defaultTimings,
  Thursday: defaultTimings,
  Friday: defaultTimings,
  Saturday: defaultTimings,
  Sunday: defaultTimings,
};

const dayTimingsValidationSchema = yup.object().shape({
  switch: yup.boolean(),
  timings: yup.array().of(
    yup.object().shape({
      startTime: yup
        .string()
        .nullable()
        .matches(
          /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
          'Invalid start time format (HH:mm)',
        ),
      endTime: yup
        .string()
        .nullable()
        .matches(
          /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
          'Invalid end time format (HH:mm)',
        ),
    }),
  ),
});

export const businessHourValidationSchema = yup.object().shape({
  name: yup.string().required('Required'),
  description: yup.string().required('Required'),
  timeZone: yup.string().required('Required'),
  serviceHour: yup.string().required('Required'),
  Monday: dayTimingsValidationSchema,
  Tuesday: dayTimingsValidationSchema,
  Wednesday: dayTimingsValidationSchema,
  Thursday: dayTimingsValidationSchema,
  Friday: dayTimingsValidationSchema,
  Saturday: dayTimingsValidationSchema,
  Sunday: dayTimingsValidationSchema,
});
