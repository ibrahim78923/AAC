import * as Yup from 'yup';

const schemaTypes = {
  allDay: 'allDay',
  recurring: 'recurring',
  allowAttendee: 'allowAttendee',
  dailyType: 'dailyType',
  recurringType: 'recurringType',
  everyDay: 'everyDay',
  daily: 'Daily',
  weekly: 'Weekly',
  monthType: 'monthType',
  onThe: 'onThe',
  meetingType: 'meetingType',
  inPersonMeeting: 'In person meeting',
  onDate: 'onDate',
  monthly: 'Monthly',
  group: 'group',
};
export const upsertMeetingValues = () => {
  return {
    title: '',
    allDay: false,
    timeZone: null,
    startDate: new Date(),
    startTime: new Date(),
    endDate: null,
    endTime: null,
    recurring: false,
    recurringType: '',
    dailyType: 'everyDay',
    recurringDay: '',
    weekDays: [],
    monthType: 'onDate',
    monthlyDate: [],
    monthlyWeeks: [],
    monthlyDays: [],
    description: '',
    meetingType: '',
    location: '',
    bufferBefore: true,
    bufferAfter: true,
    bufferBeforeTime: '',
    bufferAfterTime: '',
    people: [],
    allowAttendee: false,
    timeSlotDuration: { label: '30 Minutes', value: 30 },
    selectedSlots: [],
    reminder: [{ type: '', counter: '', duration: '' }],
  };
};
export const upsertMeetingSchema: any = Yup?.object()?.shape({
  title: Yup?.string()?.required('Required'),
  allDay: Yup?.boolean(),
  timeZone: Yup?.mixed()?.required('Required'),
  startDate: Yup?.date()?.required('Required'),
  startTime: Yup?.date()?.when(schemaTypes?.allDay, {
    is: (allDay: string) => allDay,
    then: (schema: any) => schema?.notRequired(),
    otherwise: (schema: any) => schema?.required('Required'),
  }),
  endDate: Yup?.mixed()?.when(
    [schemaTypes?.recurring, schemaTypes?.allowAttendee],
    {
      is: (recurring: string, allowAttendee: boolean) =>
        recurring || allowAttendee,
      then: (schema: any) => schema?.notRequired(),
      otherwise: (schema: any) => schema?.required('Required'),
    },
  ),
  endTime: Yup?.mixed()?.when(
    [schemaTypes?.allDay, schemaTypes?.recurring, schemaTypes?.allowAttendee],
    {
      is: (allDay: boolean, recurring: boolean, allowAttendee: boolean) =>
        allDay || recurring || allowAttendee,
      then: (schema: any) => schema?.notRequired(),
      otherwise: (schema: any) => schema?.required('Required'),
    },
  ),
  recurring: Yup?.boolean(),
  recurringType: Yup?.string()?.when(schemaTypes?.recurring, {
    is: (recurring: string) => recurring,
    then: (schema: any) => schema?.required('Required'),
    otherwise: (schema: any) => schema?.notRequired(),
  }),
  dailyType: Yup?.string()?.required('Required'),
  recurringDay: Yup?.string()?.when(
    [
      schemaTypes?.dailyType,
      schemaTypes?.recurringType,
      schemaTypes?.recurring,
    ],
    {
      is: (type: string, recurringType: any, recurring: boolean) =>
        type === schemaTypes?.everyDay &&
        recurringType === schemaTypes?.daily &&
        recurring,
      then: (schema: any) => schema?.required('Required'),
      otherwise: (schema: any) => schema?.notRequired(),
    },
  ),
  weekDays: Yup?.array()?.when(schemaTypes?.recurringType, {
    is: (recurringType: string) => recurringType === schemaTypes?.weekly,
    then: (schema: any) => schema?.min(1, 'Required'),
    otherwise: (schema: any) => schema?.notRequired(),
  }),
  monthType: Yup?.string(),
  monthlyDate: Yup?.array()?.when(
    [
      schemaTypes?.monthType,
      schemaTypes?.recurringType,
      schemaTypes?.recurring,
    ],
    {
      is: (type: string, recurringType: string, recurring: boolean) =>
        type === schemaTypes?.onDate &&
        recurringType === schemaTypes?.monthly &&
        recurring,
      then: (schema: any) => schema?.min(1, 'Required'),
      otherwise: (schema: any) => schema?.notRequired(),
    },
  ),
  monthlyWeeks: Yup?.array()?.when(
    [
      schemaTypes?.monthType,
      schemaTypes?.recurringType,
      schemaTypes?.recurring,
    ],
    {
      is: (type: string, recurringType: string, recurring: boolean) =>
        type === schemaTypes?.onThe &&
        recurringType === schemaTypes?.monthly &&
        recurring,
      then: (schema: any) => schema?.min(1, 'Required'),
      otherwise: (schema: any) => schema?.notRequired(),
    },
  ),
  monthlyDays: Yup?.array()?.when(
    [
      schemaTypes?.monthType,
      schemaTypes?.recurringType,
      schemaTypes?.recurring,
    ],
    {
      is: (type: string, recurringType: string, recurring: boolean) =>
        type === schemaTypes?.onThe &&
        recurringType === schemaTypes?.monthly &&
        recurring,
      then: (schema: any) => schema?.min(1, 'Required'),
      otherwise: (schema: any) => schema?.notRequired(),
    },
  ),
  description: Yup?.string(),
  meetingType: Yup?.string()?.required('Required'),
  location: Yup?.string()?.when(schemaTypes?.meetingType, {
    is: (type: string) => type === schemaTypes?.inPersonMeeting,
    then: (schema: any) => schema?.notRequired(),
    otherwise: (schema: any) => schema?.required('Required'),
  }),
  bufferBefore: Yup?.boolean(),
  bufferAfter: Yup?.boolean(),
  bufferBeforeTime: Yup?.string(),
  bufferAfterTime: Yup?.string(),
  people: Yup?.mixed()?.nullable()?.required('Required'),
  allowAttendee: Yup?.boolean(),
  timeSlotDuration: Yup?.mixed(),
  selectedSlots: Yup?.mixed(),
  reminder: Yup?.array()?.of(
    Yup?.object()?.shape({
      type: Yup?.string()?.required('Required'),
      counter: Yup?.string()?.required('Required'),
      duration: Yup?.string()?.required('Required'),
    }),
  ),
});
export const allDayValues = [
  {
    name: 'meetingType',
    value: 'In person meeting',
  },
  {
    name: 'location',
    value: '',
  },
  {
    name: 'startTime',
    value: new Date(),
  },
  {
    name: 'endTime',
    value: null,
  },
  {
    name: 'recurring',
    value: false,
  },
  {
    name: 'bufferBefore',
    value: false,
  },
  {
    name: 'bufferBeforeTime',
    value: '',
  },
  {
    name: 'bufferAfter',
    value: false,
  },
  {
    name: 'bufferAfterTime',
    value: '',
  },
];
export const meetingTitle: any = {
  'one-to-one': 'One to One',
  group: 'Group',
  collective: 'Collective',
};
