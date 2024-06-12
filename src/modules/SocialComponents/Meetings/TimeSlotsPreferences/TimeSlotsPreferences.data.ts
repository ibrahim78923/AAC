import * as Yup from 'yup';

export const weeklyDaysSchemaFields: any = Yup?.object()?.shape({
  months: Yup?.array()
    ?.of(Yup?.string())
    ?.default([]),
  weekly: Yup?.array()
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
  beforeEvent: Yup?.mixed()?.nullable(),
  afterEvent: Yup?.mixed()?.nullable(),
});

export const defaultValues = {
  months: [],
  weekly: [],
  daysTimeRanges: [
    { days: '', timeRanges: [{ startHour: new Date(), endHour: new Date() }] },
  ],
  dateOverrides: [
    {
      date: new Date(),
      timeRanges: [{ startHour: new Date(), endHour: new Date() }],
    },
  ],
  beforeEvent: null,
  afterEvent: null,
};
