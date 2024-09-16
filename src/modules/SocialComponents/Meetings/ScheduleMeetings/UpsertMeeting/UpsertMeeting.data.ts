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
import { capitalizeFirstWord, timeFormatter } from '@/utils/api';
import { ARRAY_INDEX } from '@/constants/strings';
import { localeDateTime } from '@/utils/dateTime';

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
  const recurringType = recurringTypeOption?.find(
    (item: any) => item?.value === meetingData?.recurring?.type,
  );
  return {
    title: meetingData?.title ?? '',
    allDay: meetingData?.isAllDay ?? false,
    timeZone: meetingData?.timeZone
      ? timeZone?.find((item: any) => item?.label === meetingData?.timeZone)
      : null,
    startDate: meetingData?.startDate
      ? localeDateTime(meetingData?.startDate)
      : null,
    startTime: meetingData?.startTime
      ? timeFormatter(meetingData?.startTime)
      : null,
    endDate: meetingData?.startDate
      ? localeDateTime(meetingData?.endDate)
      : null,
    endTime: meetingData?.startTime
      ? timeFormatter(meetingData?.endTime)
      : null,
    recurring: meetingData?.isRecurring ?? false,
    recurringType: meetingData?.recurring?.type ? recurringType : '',
    dailyType:
      meetingData?.recurring?.isWeekdays === false
        ? schemaTypes?.onThe
        : schemaTypes?.onWorkingDay,
    recurringDay: meetingData?.recurring?.interval?.toString() ?? Number(),
    weekDays: meetingData?.recurring?.days ?? [],
    monthType:
      meetingData?.recurring?.isWeekdays === false
        ? schemaTypes?.onDate
        : schemaTypes?.onThe,
    monthlyDate: meetingData?.recurring?.onDay ?? [],
    monthlyWeeks:
      meetingData?.recurring?.onWeek?.map(capitalizeFirstWord) ?? [],
    monthlyDays: meetingData?.recurring?.days?.map(capitalizeFirstWord) ?? [],
    description: meetingData?.agenda ?? '',
    meetingType: meetingData?.type
      ? meetingTypeOption?.find(
          (item: any) => item?.value === meetingData?.type,
        )
      : null,
    location: meetingData?.locationDetails
      ? meetingData?.locationDetails
      : null,
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
      router?.query?.type === schemaTypes?.group
        ? meetingData?.peoplesDetails ?? []
        : meetingData?.peoplesDetails?.[ARRAY_INDEX?.ZERO] ?? null,
    allowAttendee: false,
    timeSlotDuration: { label: '30 Minutes', value: 30 },
    selectedSlots: [],
    reminder: meetingData?.reminders?.map((data: any) => ({
      type: data?.type
        ? typeOptions?.find((item: any) => item?.value === data?.type)
        : null,
      counter: data?.interval?.toString() ?? '',
      duration: data?.timeUnit
        ? durationOption?.find((item: any) => item?.value === data?.timeUnit)
        : null,
    })) ?? [
      {
        type: null,
        counter: '',
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
    startTime: Yup?.mixed()?.when(
      [schemaTypes?.allDay, schemaTypes?.allowAttendee],
      {
        is: (allDay: string, allowAttendee: boolean) => allDay || allowAttendee,
        then: (schema: any) => schema?.notRequired(),
        otherwise: (schema: any) => schema?.required('Required'),
      },
    ),
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
      [schemaTypes?.allDay, schemaTypes?.allowAttendee],
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
        : Yup?.mixed()?.nullable()?.required('Required'),
    allowAttendee: Yup?.boolean(),
    timeSlotDuration: Yup?.mixed(),
    selectedSlots: Yup?.mixed(),
    reminder: Yup?.array()?.of(
      Yup?.object()?.shape({
        type: Yup?.mixed()?.nullable()?.required('Required'),
        counter: Yup?.string()?.required('Required'),
        duration: Yup?.mixed()?.nullable()?.required('Required'),
      }),
    ),
  });

export const meetingTitle: any = {
  'one-to-one': 'One to One',
  group: 'Group',
  collective: 'Collective',
};
