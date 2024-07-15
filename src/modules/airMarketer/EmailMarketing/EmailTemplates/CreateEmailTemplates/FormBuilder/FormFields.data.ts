import * as Yup from 'yup';
export const emailTemplateSendValidationSchema: any = Yup?.object()?.shape({});

export const emailTemplateSendOptions = [
  { value: 'Interested', label: 'Interested' },
  { value: 'Left message', label: 'Left message' },
  { value: 'No response', label: 'No response' },
];
