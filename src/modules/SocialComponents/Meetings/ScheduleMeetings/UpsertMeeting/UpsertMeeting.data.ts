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
export const upsertMeetingValues = (router: any) => {
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
    dailyType: 'onThe',
    recurringDay: Number(),
    weekDays: [],
    monthType: 'onDate',
    monthlyDate: [],
    monthlyWeeks: [],
    monthlyDays: [],
    description: '',
    meetingType: null,
    location: null,
    bufferBefore: true,
    bufferAfter: true,
    bufferBeforeTime: '',
    bufferAfterTime: '',
    people: router?.query?.type === schemaTypes?.group ? [] : null,
    allowAttendee: false,
    timeSlotDuration: { label: '30 Minutes', value: 30 },
    selectedSlots: [],
    reminder: [{ type: null, counter: Number(), duration: null }],
  };
};
export const upsertMeetingSchema: any = (router: any) =>
  Yup?.object()?.shape({
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
    recurringType: Yup?.mixed()
      ?.nullable()
      ?.when(schemaTypes?.recurring, {
        is: (recurring: any) => recurring?.label,
        then: (schema: any) => schema?.required('Required'),
        otherwise: (schema: any) => schema?.notRequired(),
      }),
    dailyType: Yup?.string()?.required('Required'),
    recurringDay: Yup?.number()?.when(
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
    description: Yup?.string()?.required('Required'),
    meetingType: Yup?.mixed()?.nullable()?.required('Required'),
    location: Yup?.mixed()
      ?.nullable()
      ?.when(schemaTypes?.meetingType, {
        is: (type: any) => type?.label === schemaTypes?.inPersonMeeting,
        then: (schema: any) => schema?.required('Required'),
        otherwise: (schema: any) => schema?.notRequired(),
      }),
    bufferBefore: Yup?.boolean(),
    bufferAfter: Yup?.boolean(),
    bufferBeforeTime: Yup?.mixed()?.nullable(),
    bufferAfterTime: Yup?.mixed()?.nullable(),
    people:
      router?.query?.type === schemaTypes?.group
        ? Yup?.array()?.min(1, 'Required')
        : Yup?.mixed()?.required('Required'),
    allowAttendee: Yup?.boolean(),
    timeSlotDuration: Yup?.mixed(),
    selectedSlots: Yup?.mixed(),
    reminder: Yup?.array()?.of(
      Yup?.object()?.shape({
        type: Yup?.mixed()?.nullable()?.required('Required'),
        counter: Yup?.number()?.required('Required'),
        duration: Yup?.mixed()?.nullable()?.required('Required'),
      }),
    ),
  });
export const allDayValues = [
  {
    name: 'meetingType',
    value: { value: 'IN_PERSON_MEETING', label: 'In person meeting' },
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
