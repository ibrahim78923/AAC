import * as Yup from 'yup';

export const validationSchema: any = Yup?.object()?.shape({
  approvers: Yup?.object()?.required('Required'),
});

export const defaultValues = {
  approvers: null,
};
