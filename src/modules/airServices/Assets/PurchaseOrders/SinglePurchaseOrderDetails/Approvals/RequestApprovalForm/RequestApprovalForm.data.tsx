import * as Yup from 'yup';

export const validationSchema = Yup?.object()?.shape({
  approvers: Yup?.string()?.required('Required'),
});

export const defaultValues = {
  approvers: '',
};
