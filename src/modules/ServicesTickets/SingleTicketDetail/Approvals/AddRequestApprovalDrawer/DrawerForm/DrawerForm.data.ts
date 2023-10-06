import { RHFTextField, RHFEditor } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const DrawerFormValidationSchema = Yup.object().shape({
  subject: Yup.string().trim().required('Field is Required'),
  description: Yup.string(),
});

export const DrawerFormDefaultValues = {
  subject: '',
  description: '',
};

export const DrawerFormDataArray = [
  {
    componentProps: {
      name: 'subject',
      label: 'To',
      fullWidth: true,
      require: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'description',
      label: 'Description',
      fullWidth: true,
      require: true,
    },
    component: RHFEditor,
    md: 12,
  },
];
