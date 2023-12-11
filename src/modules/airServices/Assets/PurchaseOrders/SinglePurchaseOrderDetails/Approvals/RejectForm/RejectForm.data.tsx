import * as Yup from 'yup';

export const validationSchema = Yup?.object()?.shape({
  reason: Yup?.string()?.required('Required'),
});

export const defaultValues = {
  reason: '',
};
