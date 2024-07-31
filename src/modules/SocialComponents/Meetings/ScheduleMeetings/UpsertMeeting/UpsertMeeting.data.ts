import { DATE_TIME_FORMAT } from '@/constants';
import dayjs from 'dayjs';
import * as Yup from 'yup';
import { recurringTypeOption } from './MeetingForm/Recurring/Recurring.data';
import {
  bufferTimeOption,
  meetingTypeOption,
} from './MeetingForm/MeetingForm.data';
import {
  durationOption,
  typeOptions,
} from './MeetingForm/Reminder/Reminder.data';
import { timeZone } from '@/constants/time-zone';
import { timeFormatter } from '@/utils/api';

export const schemaTypes = {
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
  onWorkingDay: 'workingDay',
};
export const upsertMeetingValues = (router: any, meetingData: any) => {
  const todayDate = dayjs()?.format(DATE_TIME_FORMAT?.UI);
  return {
    title: meetingData?.title ?? '',
    allDay: meetingData?.isAllDay ?? false,
    timeZone: meetingData?.timeZone
      ? timeZone?.find((item: any) => item?.label === meetingData?.timeZone)
      : null,
    startDate: meetingData?.startDate
      ? new Date(meetingData?.startDate ?? todayDate)
      : null,
    startTime: timeFormatter(meetingData?.startTime) ?? new Date(),
    endDate: meetingData?.startDate ? new Date(meetingData?.endDate) : null,
    endTime: timeFormatter(meetingData?.endTime) ?? new Date(),
    recurring: meetingData?.isRecurring ?? false,
    recurringType: meetingData?.recurring?.type
      ? recurringTypeOption?.find(
          (item: any) => item?.value === meetingData?.recurring?.type,
        )
      : '',
    dailyType:
      meetingData?.recurring?.isWeekdays === false
        ? schemaTypes?.onThe
        : schemaTypes?.onWorkingDay,
    recurringDay: meetingData?.recurring?.interval?.toString() ?? Number(),
    weekDays: meetingData?.recurring?.onDay ?? [],
    monthType:
      meetingData?.recurring?.isWeekdays === false
        ? schemaTypes?.onDate
        : schemaTypes?.onThe,
    monthlyDate: meetingData?.recurring?.days ?? [],
    monthlyWeeks: meetingData?.recurring?.onWeek ?? [],
    monthlyDays: meetingData?.recurring?.onDay ?? [],
    description: meetingData?.agenda ?? '',
    meetingType: meetingData?.type
      ? meetingTypeOption?.find(
          (item: any) => item?.value === meetingData?.type,
        )
      : null,
    location: meetingData?.location ?? null,
    bufferBefore: true,
    bufferAfter: true,
    bufferBeforeTime: meetingData?.bufferTime?.before
      ? bufferTimeOption?.find(
          (item: any) => item?.value === meetingData?.bufferTime?.before,
        )
      : '',
    bufferAfterTime: meetingData?.bufferTime?.after
      ? bufferTimeOption?.find(
          (item: any) => item?.value === meetingData?.bufferTime?.after,
        )
      : '',
    people:
      meetingData?.peoples ?? router?.query?.type === schemaTypes?.group
        ? []
        : null,
    allowAttendee: false,
    timeSlotDuration: { label: '30 Minutes', value: 30 },
    selectedSlots: [],
    reminder: meetingData?.reminders?.map((data: any) => ({
      type: data?.type
        ? typeOptions?.find((item: any) => item?.value === data?.type)
        : null,
      counter: data?.interval?.toString() ?? Number(),
      duration: data?.timeUnit
        ? durationOption?.find((item: any) => item?.value === data?.timeUnit)
        : null,
    })) ?? [
      {
        type: null,
        counter: Number(),
        duration: null,
      },
    ],
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
    endTime: Yup?.mixed()?.when([schemaTypes?.allDay], {
      is: (allDay: boolean, recurring: boolean, allowAttendee: boolean) =>
        allDay || recurring || allowAttendee,
      then: (schema: any) => schema?.notRequired(),
      otherwise: (schema: any) => schema?.required('Required'),
    }),
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
        : Yup?.mixed()?.nullable()?.required('Required'),
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
