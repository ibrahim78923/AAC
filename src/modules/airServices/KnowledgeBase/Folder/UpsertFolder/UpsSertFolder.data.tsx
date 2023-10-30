import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string().required('Field is Required'),
  description: Yup.string().required('Field is Required'),
  visible: Yup.string().trim().required('Field is Required'),
});

export const defaultValues = {
  name: '',
  description: '',
  visible: '',
};

export const visibleToDataArray = [
  { value: 'All', label: 'All' },
  { value: 'Only to you', label: 'Only to you' },
];
