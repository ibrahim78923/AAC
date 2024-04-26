import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const validationSchema: any = Yup?.object()?.shape({
  name: Yup?.string()?.required('Field is Required'),
});

export const defaultValuesFolder = {
  name: '',
};

export const dataArray = [
  {
    componentProps: {
      name: 'name',
      label: 'Folder Name',
      fullWidth: true,
      select: false,
      placeholder: 'Enter name',
    },
    component: RHFTextField,
    md: 12,
  },
];
