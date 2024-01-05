import { RHFAutocomplete } from '@/components/ReactHookForm';
import * as Yup from 'yup';
export const addUserValidationSchema = Yup?.object()?.shape({
  user: Yup?.string()?.required('Required'),
  contract: Yup?.string()?.notRequired(),
});
export const addUserDefaultValues = {
  user: '',
  contract: '',
};
export const userSelectOption = ['Andrew', 'John', 'Root'];

export const userSelectData = ['BE1', 'BE2', 'BE3'];

export const addUserData = [
  {
    id: 1,
    componentProps: {
      name: 'user',
      label: 'User',
      fullWidth: true,
      options: userSelectOption,
      required: true,
    },

    component: RHFAutocomplete,
    md: 12,
  },
  {
    id: 1,
    componentProps: {
      name: 'contract',
      label: 'Contract',
      fullWidth: true,
      options: userSelectData,
    },

    component: RHFAutocomplete,
    md: 12,
  },
];
