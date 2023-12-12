import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const validationSchemaManageSharing = Yup?.object()?.shape({
  name: Yup?.string()?.trim()?.required('Field is Required'),
});

export const defaultValuesManageSharing = {
  name: '',
};

export const dataArrayManageSharing = [
  {
    componentProps: {
      name: 'name',
      label: 'Name',
      fullWidth: true,
      required: true,
    },

    component: RHFTextField,

    md: 12,
  },
];
export const specificUserOrTeamOptions = {
  specificUserOrTeam: 'specificUserOrTeam',
};
export const teamsArr = [
  {
    label: 'Marketing Team',
    value: 'marketingTeam',
  },
  {
    label: 'Team Alpha',
    value: 'teamAlpha',
  },
  {
    label: 'Team Bravo',
    value: 'teamBravo',
  },
];
export const usersArr = [
  {
    label: 'Zahir Abbas',
    value: 'zahirAbbas',
  },
  {
    label: 'Sir Usman',
    value: 'sirUsman',
  },
];
