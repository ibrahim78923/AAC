import { RHFRadioGroup, RHFTextField } from '@/components/ReactHookForm';
import { Typography, useTheme } from '@mui/material';
import * as Yup from 'yup';

export const validationSchemaManageSharing = Yup?.object()?.shape({
  name: Yup?.string()?.trim()?.required('Field is Required'),
});

export const defaultValuesManageSharing = {
  name: '',
};

export const dataArrayManageSharing = () => {
  const theme = useTheme();
  return [
    {
      componentProps: {
        name: 'name',
        label: 'Name',
        placeholder: 'Enter name',
        fullWidth: true,
        required: true,
      },
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        color: theme?.palette?.grey[500],
        varient: 'h4',
        heading: 'Shared with',
      },

      gridLength: 12,
      component: Typography,
    },
    {
      componentProps: {
        name: 'sharedWith',
        fullWidth: true,
        defaultValue: 'all',
        row: false,
        options: [
          { value: 'PRIVATE', label: 'Private' },
          { value: 'TEAM', label: 'My Team (test)' },
          { value: 'EVERYONE', label: 'Everyone' },
        ],
      },
      component: RHFRadioGroup,
      md: 12,
    },
  ];
};
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
