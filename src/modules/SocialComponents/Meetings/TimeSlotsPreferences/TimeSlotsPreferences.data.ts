import * as Yup from 'yup';

export const weeklyDaysSchemaFields: any = Yup?.object()?.shape({
  months: Yup?.string(),
  weekly: Yup?.string(),
  timeSlot: Yup?.array()?.of(
    Yup?.object()?.shape({
      day: Yup?.string()?.required(),
      slots: Yup?.array()
        ?.of(
          Yup?.object()?.shape({
            start: Yup?.date()?.nullable(),
            end: Yup?.date()?.nullable(),
          }),
        )
        ?.default([]),
    }),
  ),
  beforeEvent: Yup?.mixed()?.nullable(),
  afterEvent: Yup?.mixed()?.nullable(),
});

export const defaultValues = {
  months: [],
  weekly: [],
  timeSlot: [
    { day: 'Sun', slots: [{ start: new Date(), end: new Date() }] },
    { day: 'Mon', slots: [{ start: new Date(), end: new Date() }] },
    { day: 'Tue', slots: [{ start: new Date(), end: new Date() }] },
    { day: 'Wed', slots: [{ start: new Date(), end: new Date() }] },
    { day: 'Thu', slots: [{ start: new Date(), end: new Date() }] },
    { day: 'Fri', slots: [{ start: new Date(), end: new Date() }] },
    { day: 'Sat', slots: [{ start: new Date(), end: new Date() }] },
  ],
  overrideDate: new Date(),
  overrides: [{ start: null, end: null }],
  beforeEvent: null,
  afterEvent: null,
};
