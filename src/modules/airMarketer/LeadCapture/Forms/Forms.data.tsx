import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const FormsvalidationSchema = Yup?.object()?.shape({
  Name: Yup?.string()?.required('Required Field'),
});

export const FormsDefaultValues = {
  Name: '',
};

export const formsArray = [
  {
    componentProps: {
      name: 'Name',
      label: 'Name',
      fullWidth: true,
      placeholder: 'Enter form name',
    },
    component: RHFTextField,
    md: 12,
  },
];
