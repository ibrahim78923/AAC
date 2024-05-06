import * as Yup from 'yup';

export const upsertMeetingValues = {
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
  people: null,
  allowAttendee: false,
  timeSlotDuration: { label: '30 Minutes', value: 30 },
  selectedSlots: [],
  reminder: [{ type: '', counter: '', duration: '' }],
};
export const upsertMeetingSchema: any = Yup?.object()?.shape({
  title: Yup?.string()?.required('Required'),
  allDay: Yup?.boolean(),
  timeZone: Yup?.mixed()?.required('Required'),
  startDate: Yup?.date()?.required('Required'),
  startTime: Yup?.date()?.when('allDay', {
    is: (allDay: string) => allDay,
    then: (schema: any) => schema?.notRequired(),
    otherwise: (schema: any) => schema?.required('Required'),
  }),
  endDate: Yup?.mixed()?.when(['recurring', 'allowAttendee'], {
    is: (recurring: string, allowAttendee: boolean) =>
      recurring || allowAttendee,
    then: (schema: any) => schema?.notRequired(),
    otherwise: (schema: any) => schema?.required('Required'),
  }),
  endTime: Yup?.mixed()?.when(['allDay', 'recurring', 'allowAttendee'], {
    is: (allDay: boolean, recurring: boolean, allowAttendee: boolean) =>
      allDay || recurring || allowAttendee,
    then: (schema: any) => schema?.notRequired(),
    otherwise: (schema: any) => schema?.required('Required'),
  }),
  recurring: Yup?.boolean(),
  recurringType: Yup?.string()?.when('recurring', {
    is: (recurring: string) => recurring,
    then: (schema: any) => schema?.required('Required'),
    otherwise: (schema: any) => schema?.notRequired(),
  }),
  dailyType: Yup?.string()?.required('Required'),
  recurringDay: Yup?.string()?.when(['dailyType', 'recurringType'], {
    is: (type: string, recurringType: any) =>
      type === 'everyDay' && recurringType === 'Daily',
    then: (schema: any) => schema?.required('Required'),
    otherwise: (schema: any) => schema?.notRequired(),
  }),
  weekDays: Yup?.array()?.when('recurringType', {
    is: (recurringType: string) => recurringType === 'Weekly',
    then: (schema: any) => schema?.min(1, 'Required'),
    otherwise: (schema: any) => schema?.notRequired(),
  }),
  monthType: Yup?.string(),
  monthlyDate: Yup?.array()?.when(['monthType', 'recurringType', 'recurring'], {
    is: (type: string, recurringType: string, recurring: boolean) =>
      type === 'onDate' && recurringType === 'Monthly' && recurring,
    then: (schema: any) => schema?.min(1, 'Required'),
    otherwise: (schema: any) => schema?.notRequired(),
  }),
  monthlyWeeks: Yup?.array()?.when(
    ['monthType', 'recurringType', 'recurring'],
    {
      is: (type: string, recurringType: string, recurring: boolean) =>
        type === 'onThe' && recurringType === 'Monthly' && recurring,
      then: (schema: any) => schema?.min(1, 'Required'),
      otherwise: (schema: any) => schema?.notRequired(),
    },
  ),
  monthlyDays: Yup?.array()?.when(['monthType', 'recurringType', 'recurring'], {
    is: (type: string, recurringType: string, recurring: boolean) =>
      type === 'onThe' && recurringType === 'Monthly' && recurring,
    then: (schema: any) => schema?.min(1, 'Required'),
    otherwise: (schema: any) => schema?.notRequired(),
  }),
  description: Yup?.string(),
  meetingType: Yup?.string()?.required('Required'),
  location: Yup?.string()?.when('meetingType', {
    is: (type: string) => type === 'In person meeting',
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
  reminder: Yup?.object()?.shape({
    reminder: Yup?.string()?.required('Required'),
    counter: Yup?.number()?.nullable()?.required('Required'),
    duration: Yup?.string()?.required('Required'),
  }),
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
