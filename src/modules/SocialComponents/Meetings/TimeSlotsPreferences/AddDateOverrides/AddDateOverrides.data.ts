import * as Yup from 'yup';

export const dateOverridesSchemaFields: any = Yup?.object()?.shape({
  overrideDate: Yup?.string(),
  overrides: Yup?.array()?.of(
    Yup?.object()?.shape({
      start: Yup?.mixed()?.nullable(),
      end: Yup?.mixed()?.nullable(),
    }),
  ),
});

export const overridesDefaultValues = {
  overrideDate: new Date(),
  overrides: [{ start: null, end: null }],
};
