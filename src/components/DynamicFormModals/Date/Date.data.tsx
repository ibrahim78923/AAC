import * as Yup from 'yup';

export const validationSchema: any = Yup?.object()?.shape({
  name: Yup?.string()?.trim()?.required('Field Name is Required'),
  dateFormat: Yup?.mixed()?.nullable(),
  required: Yup?.boolean()?.nullable(),
});

export const defaultValues: any = {
  name: '',
  dateFormat: null,
  required: false,
};

export const DateFormatOptions = [
  { label: 'MM/DD/YYYY', value: 'MM/dd/yyyy' },
  { label: 'DD/MM/YYYY', value: 'dd/MM/yyyy' },
  { label: 'YYYY/MM/DD', value: 'yyyy/MM/dd' },
];
