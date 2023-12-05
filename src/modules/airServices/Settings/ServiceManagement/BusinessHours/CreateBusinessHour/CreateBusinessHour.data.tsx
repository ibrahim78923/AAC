import { DeleteHolidayModal } from './DeleteDashboardModal';

export const holidaysListsData: any = [
  {
    _id: 3,
    date: `Aug 27, 2019`,
    holidayName: 'Kashmir Doy',
  },
  {
    _id: 4,
    date: `Aug 27, 2019`,
    holidayName: 'Kashmir Doy',
  },
  {
    _id: 5,
    date: `Aug 27, 2019`,
    holidayName: 'Kashmir Doy',
  },
];

export const holidaysListsColumn: any = [
  {
    accessorFn: (row: any) => row?.date,
    id: 'date',
    header: '',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.holidayName,
    id: 'holidayName',
    header: '',
    cell: (info: any) => info?.getValue(),
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
export const holidaysData = [
  { label: 'Holidays in Andorra', value: 'Andorra' },
  { label: 'Holidays in UAE', value: 'UAE' },
  { label: 'Holidays in Pakistan', value: 'Pakistan' },
  { label: 'Holidays in Albania', value: 'Albania' },
  { label: 'Holidays in Armenia', value: 'Armenia' },
  { label: 'Holidays in Angola', value: 'Angola' },
  { label: 'Holidays in Austria', value: 'Austria' },
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
