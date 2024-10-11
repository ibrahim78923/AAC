import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';
import { UpsertTeamsFormDefaultValuesI } from './UpsertTeams.interface';
import { UsersFieldDropdown } from '../TeamsFormFields/UsersFieldDropdown';
import { CHARACTERS_LIMIT } from '@/constants/validation';

const { OPERATIONS_TEAM_NAME_MAX_CHARACTERS } = CHARACTERS_LIMIT ?? {};

export const upsertTeamValidationSchema = Yup?.object()?.shape({
  name: Yup?.string()
    ?.trim()
    ?.required('Name is required')
    ?.max(
      OPERATIONS_TEAM_NAME_MAX_CHARACTERS,
      `Maximum characters limit is ${OPERATIONS_TEAM_NAME_MAX_CHARACTERS}`,
    ),
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
      label: 'Team name',
      placeholder: 'Team name',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 2,
    component: UsersFieldDropdown,
  },
];
