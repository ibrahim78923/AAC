import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const createFolderValidationSchema = Yup.object().shape({
  name: Yup.string().trim().required('Field is Required'),
});
export const createFolderDefaultValues = {
  name: '',
};
export const createFolderFormFields = [
  {
    id: 'name',
    componentProps: {
      name: 'name',
      label: 'Name',
      placeholder: 'Enter name',
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
];
