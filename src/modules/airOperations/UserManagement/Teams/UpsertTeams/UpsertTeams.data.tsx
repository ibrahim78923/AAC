import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';
import { UpsertTeamsFormDefaultValuesI } from './UpsertTeams.interface';
import { UsersFieldDropdown } from '../../UserManagementFormFields/UsersFieldDropdown';

export const upsertTeamValidationSchema = Yup?.object()?.shape({
  name: Yup?.string()?.trim()?.required('Name is required'),
  userAccounts: Yup?.array(),
});

export const upsertTeamDefaultValues = (
  data?: UpsertTeamsFormDefaultValuesI,
) => {
  return {
    name: data?.name ?? '',
    userAccounts: !!data?.accounts?.length ? data?.accounts : [],
  };
};

export const upsertTeamFormFieldsDynamic = () => [
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
    component: UsersFieldDropdown,
    md: 12,
  },
];
