import * as Yup from 'yup';

export const validationSchema: any = Yup?.object()?.shape({
  name: Yup?.string()?.trim()?.required('Field Name is Required'),
  placeholder: Yup?.string()?.trim(),
  required: Yup?.boolean()?.nullable(),
});

export const defaultValues: any = {
  name: '',
  placeholder: '',
  required: false,
};
