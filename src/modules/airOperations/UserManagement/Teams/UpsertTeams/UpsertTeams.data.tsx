import { RHFAutocompleteAsync, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const upsertTeamValidationSchema: any = Yup?.object()?.shape({
  name: Yup?.string()?.required('Required'),
});

export const upsertTeamDefaultValues = (data?: any) => {
  return {
    name: data?.name ?? '',
    userAccounts: data?.userAccounts ?? [],
  };
};

export const upsertTeamArray = (usersTeamDropdown: any) => [
  {
    id: 1,
    componentProps: {
      name: 'name',
      label: 'Team Name',
      placeholder: 'Team Name',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 2,
    componentProps: {
      name: 'userAccounts',
      label: 'Select team',
      placeholder: 'Select',
      fullWidth: true,
      required: true,
      multiple: true,
      apiQuery: usersTeamDropdown,
      getOptionLabel: (option: any) =>
        `${option?.firstName} ${option?.lastName}`,
    },
    component: RHFAutocompleteAsync,
    md: 12,
  },
];
