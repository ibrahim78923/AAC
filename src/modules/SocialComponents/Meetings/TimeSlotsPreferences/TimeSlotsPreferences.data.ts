import * as Yup from 'yup';
import { bufferTime } from './DateOverrides/DateOverrides.data';

const timeSlotsWeeklyDataArray = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const weeklyDaysSchemaFields: any = Yup?.object()?.shape({
  months: Yup?.array()
    ?.of(Yup?.string())
    ?.default([]),
  daysTimeRanges: Yup?.array()
    ?.of(
      Yup?.object()?.shape({
        days: Yup?.string()?.required(),
        timeRanges: Yup?.array()
          ?.of(
            Yup?.object()?.shape({
              startHour: Yup?.date()?.nullable(),
              endHour: Yup?.date()?.nullable(),
            }),
          )
          ?.default([]),
      }),
    )
    ?.default([]),
  dateOverrides: Yup?.array()
    ?.of(
      Yup?.object()?.shape({
        date: Yup?.date()?.required(),
        timeRanges: Yup?.array()
          ?.of(
            Yup?.object()?.shape({
              startHour: Yup?.date()?.nullable(),
              endHour: Yup?.date()?.nullable(),
            }),
          )
          ?.default([]),
      }),
    )
    ?.default([]),
  bufferTime: Yup?.object()?.shape({
    bufferBefore: Yup?.mixed()?.nullable(),
    bufferAfter: Yup?.mixed()?.nullable(),
  }),
});

export const timeSlotsDefaultValues = (timeSlotsData: any) => {
  return {
    months: timeSlotsData?.months?.map((item: any) => item) ?? [],
    daysTimeRanges: timeSlotsWeeklyDataArray?.map((day: any) => ({
      days: day,
      timeRanges:
        timeSlotsData?.daysTimeRanges
          ?.find((item: any) => item?.days === day)
          ?.timeRanges?.map((slot: any) => ({
            startHour: new Date(slot?.startHour),
            endHour: new Date(slot?.endHour),
          })) ?? [],
    })),
    bufferTime: {
      bufferBefore: timeSlotsData?.bufferTime?.bufferBefore
        ? bufferTime?.find(
            (item: any) =>
              item?.value === timeSlotsData?.bufferTime?.bufferBefore,
          )
        : null,
      bufferAfter: timeSlotsData?.bufferTime?.bufferAfter
        ? bufferTime?.find(
            (item: any) =>
              item?.value === timeSlotsData?.bufferTime?.bufferAfter,
          )
        : null,
    },
  };
};
