import * as Yup from 'yup';

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

export const timeSlotsDefaultValues = () => {
  return {
    months: [],
    daysTimeRanges: [
      {
        days: 'Sunday',
        timeRanges: [],
      },
      {
        days: 'Monday',
        timeRanges: [],
      },
      {
        days: 'Tuesday',
        timeRanges: [],
      },
      {
        days: 'Wednesday',
        timeRanges: [],
      },
      {
        days: 'Thursday',
        timeRanges: [],
      },
      {
        days: 'Friday',
        timeRanges: [],
      },
      {
        days: 'Saturday',
        timeRanges: [],
      },
    ],
    dateOverrides: [
      {
        date: new Date(),
        timeRanges: [{ startHour: new Date(), endHour: new Date() }],
      },
    ],
    bufferTime: {
      bufferBefore: null,
      bufferAfter: null,
    },
  };
};
