import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

const teamMembersOptions = [
  'Senior HR Executive',
  'Software Engineer',
  'Software Developer',
];

export const upsertTeamValidationSchema: any = Yup?.object()?.shape({
  teamName: Yup?.string()?.required('Required'),
  teamMembers: Yup?.string(),
});

export const upsertTeamData = [
  {
    id: 1,
    teamName: 'John',
    teamMembers: 'E',
  },
];
export const upsertTeamDefaultValues: any = {
  teamName: '',
  teamMembers: '',
};

export const upsertTeamArray = [
  {
    id: 1,
    componentProps: {
      name: 'teamName',
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
      name: 'teamMembers',
      label: 'Team Members',
      placeholder: 'Select',
      fullWidth: true,
      options: teamMembersOptions,
    },
    component: RHFAutocomplete,
    md: 12,
  },
];
