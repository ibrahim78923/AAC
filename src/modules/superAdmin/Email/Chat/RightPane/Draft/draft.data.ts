import * as Yup from 'yup';
export const emailDraftValidationsSchema: any = Yup?.object()?.shape({
  to: Yup?.string()?.required('Field is Required')?.trim(),
});
