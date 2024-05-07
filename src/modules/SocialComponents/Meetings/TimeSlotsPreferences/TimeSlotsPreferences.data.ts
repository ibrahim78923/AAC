import * as Yup from 'yup';

export const weeklyDaysSchemaFields: any = Yup?.object()?.shape({
  months: Yup?.string(),
  weekly: Yup?.string(),
  timeSlot: Yup?.array()?.of(
    Yup?.object()?.shape({
      timeSlotStart: Yup?.mixed()?.nullable(),
      timeSlotEnd: Yup?.mixed()?.nullable(),
    }),
  ),
  beforeEvent: Yup?.mixed()?.nullable(),
  afterEvent: Yup?.mixed()?.nullable(),
});

export const defaultValues = {
  months: [],
  weekly: [],
  timeSlot: [
    {
      timeSlotStart: null,
      timeSlotEnd: null,
    },
  ],
  overrideDate: new Date(),
  overrides: [{ start: null, end: null }],
  beforeEvent: null,
  afterEvent: null,
};
