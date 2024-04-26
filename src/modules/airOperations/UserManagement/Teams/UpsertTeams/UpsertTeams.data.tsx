import { RHFAutocompleteAsync, RHFTextField } from '@/components/ReactHookForm';
import { fullName } from '@/utils/avatarUtils';
import * as Yup from 'yup';

export const upsertTeamValidationSchema: any = Yup?.object()?.shape({
  name: Yup?.string()?.required('Required'),
});

export const upsertTeamDefaultValues = (data?: any) => {
  return {
    name: data?.data?.name ?? '',
    userAccounts: data?.data?.accounts?.map((user: any) => user?.user) ?? [],
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
      label: 'Select Team Members',
      placeholder: 'Select',
      fullWidth: true,
      required: true,
      multiple: true,
      apiQuery: usersTeamDropdown,
      externalParams: { limit: 100 },
      isOptionEqualToValue: (option: any, newValue: any) =>
        option?.user?._id === newValue?._id,
      getOptionLabel: (option: any) =>
        option?.user?.firstName
          ? fullName(option?.user?.firstName, option?.user?.lastName)
          : fullName(option?.firstName, option?.lastName),
    },
    component: RHFAutocompleteAsync,
    md: 12,
  },
];
