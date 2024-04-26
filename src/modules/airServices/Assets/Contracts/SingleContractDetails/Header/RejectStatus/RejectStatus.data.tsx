import * as Yup from 'yup';

export const validationSchema = Yup?.object()?.shape({
  reason: Yup?.string()?.trim()?.required('Reason is required'),
});

export const defaultValues = {
  reason: '',
};
