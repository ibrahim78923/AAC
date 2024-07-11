import * as Yup from 'yup';

export const validationSchema: any = Yup?.object()?.shape({
  name: Yup?.string()?.trim()?.required('Name is Required'),
  placeholder: Yup?.string()?.trim(),
  options: Yup?.array()?.of(
    Yup?.object()?.shape({
      label: Yup?.string()?.trim()?.required('Required'),
    }),
  ),
  required: Yup?.boolean()?.nullable(),
});

export const defaultValues: any = {
  name: '',
  placeholder: '',
  options: [{ label: '', value: '' }],
  required: false,
};
