import { RHFAutocompleteAsync, RHFTextField } from '@/components/ReactHookForm';
import { PAGINATION } from '@/config';
import { fullName } from '@/utils/avatarUtils';
import * as Yup from 'yup';

export const upsertTeamValidationSchema: any = Yup?.object()?.shape({
  name: Yup?.string()?.required('Name is required'),
});

export const upsertTeamDefaultValues = (data?: any) => {
  return {
    name: data?.name ?? '',
    userAccounts: !!data?.accounts?.length ? data?.accounts : [],
  };
};

export const upsertTeamFormFieldsDynamic = (usersTeamDropdown: any) => [
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
      label: 'Select Team Members',
      placeholder: 'Select',
      fullWidth: true,
      multiple: true,
      apiQuery: usersTeamDropdown,
      externalParams: { limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT },
      getOptionLabel: (option: any) =>
        option?.user?.firstName
          ? fullName(option?.user?.firstName, option?.user?.lastName)
          : fullName(option?.firstName, option?.lastName),
    },
    component: RHFAutocompleteAsync,
    md: 12,
  },
];
