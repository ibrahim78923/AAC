import {
  RHFCheckbox,
  RHFRadioGroup,
  RHFSelect,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const teamDurationValidationSchema = Yup.object().shape({
  Collaborators: Yup.string(),
  selectTeams: Yup.string(),
  duration: Yup.string(),
  userTeam: Yup.string(),
});

export const teamDurationDefaultValues = {
  Collaborators: '',
  selectTeams: '',
  duration: '',
  userTeam: 'USER',
};

export const teamDurationArray = (userTeamValue: any) => {
  return [
    {
      componentProps: {
        name: 'userTeam',
        fullWidth: true,
        defaultValue: 'USER',
        row: true,
        options: [
          { value: 'USER', label: 'Users' },
          { value: 'TEAM', label: `Teams` },
        ],
      },
      component: RHFRadioGroup,
      md: 12,
    },
    {
      componentProps: {
        name: 'Collaborators',
        label: 'collaborators',
        fullWidth: true,
        select: true,
        required: true,
      },
      options: [
        { value: 'adminServices', label: 'Admin Services' },
        { value: 'usmanSaeed', label: 'Usman Saeed' },
        { value: 'salmanIdrees', label: 'Salman Idrees' },
      ],
      component: RHFSelect,
      md: 12,
    },
    {
      componentProps: {
        name: 'selectTeams',
        label: 'Select Teams',
        fullWidth: true,
        select: true,
        disabled: userTeamValue === 'USER',
      },
      options: [
        { value: 'adminServices', label: 'Admin Services' },
        { value: 'usmanSaeed', label: 'Usman Saeed' },
        { value: 'salmanIdrees', label: 'Salman Idrees' },
      ],
      component: RHFSelect,
      md: 12,
    },
    {
      componentProps: {
        name: 'duration',
        label: 'Duration',
        fullWidth: true,
        select: true,
        required: true,
      },
      options: [
        { value: 'monthly', label: 'Monthly' },
        { value: 'quarterly', label: 'Quarterly' },
        { value: 'yearly', label: 'Yearly' },
      ],
      component: RHFSelect,
      md: 12,
    },
    {
      componentProps: {
        name: 'setting',
        label: 'Align with your fiscal year settings?',
        placeholder: 'Enter Here',
        fullWidth: true,
      },
      component: RHFCheckbox,
      md: 12,
    },
  ];
};
