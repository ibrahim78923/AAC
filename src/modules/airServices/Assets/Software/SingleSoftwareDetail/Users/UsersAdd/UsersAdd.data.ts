import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import * as Yup from 'yup';
export const addUserValidationSchema = Yup?.object()?.shape({
  user: Yup?.mixed()?.nullable()?.required('Required'),
  contract: Yup?.mixed()?.nullable(),
});
export const addUserDefaultValues = () => {
  return {
    user: null,
    contract: null,
  };
};

export const addUserData = (userDropdown: any, contractDropdown: any) => [
  {
    id: 1,
    componentProps: {
      name: 'user',
      label: 'User',
      fullWidth: true,
      apiQuery: userDropdown,
      required: true,
      getOptionLabel: (option: any) =>
        option?.firstName + ' ' + option?.lastName,
    },

    component: RHFAutocompleteAsync,
    md: 12,
  },
  {
    id: 2,
    componentProps: {
      name: 'contract',
      label: 'Contract',
      fullWidth: true,
      apiQuery: contractDropdown,
      getOptionLabel: (option: any) => option?.name,
    },

    component: RHFAutocompleteAsync,
    md: 12,
  },
];
