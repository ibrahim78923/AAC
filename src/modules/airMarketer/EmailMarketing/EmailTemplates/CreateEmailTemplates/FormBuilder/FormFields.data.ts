import * as Yup from 'yup';
export const emailTemplateSendValidationSchema: any = Yup?.object()?.shape({
  subject: Yup?.string()?.trim()?.required('Field is Required'),
  from: Yup?.string()?.trim()?.required('Field is Required'),
});
export const emailTemplateValidationSchema: any = Yup?.object()?.shape({});
