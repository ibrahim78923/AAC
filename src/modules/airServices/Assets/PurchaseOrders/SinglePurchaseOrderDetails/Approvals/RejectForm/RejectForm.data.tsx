import * as Yup from 'yup';

export const validationSchema = Yup?.object()?.shape({
  reason: Yup?.string()?.required('Field is Required'),
});

export const defaultValues = {
  reason: '',
};
