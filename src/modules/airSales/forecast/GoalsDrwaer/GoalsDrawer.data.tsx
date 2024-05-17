import { RHFSelect } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const filterValidationSchema = Yup.object().shape({
  selectTeam: Yup.string(),
  selectUser: Yup.string(),
  pipeline: Yup.string(),
  goalDuration: Yup.string(),
  goalStatus: Yup.string(),
});

export const filterDefaultValues = {
  selectTeam: '',
  selectUser: '',
  pipeline: '',
  goalDuration: '',
  goalStatus: '',
};
export const usersFilterArray = [
  {
    componentProps: {
      name: 'selectTeam',
      label: 'Select Team',
      fullWidth: true,
      select: true,
      multiple: true,
    },
    options: [
      { value: 'TeamSales', label: 'Team Sales' },
      { value: 'TeamMarketing', label: 'Team Marketing' },
      { value: 'TeamAlpha1', label: 'Team Alpha1' },
      { value: 'TeamSales1', label: 'Team Sales1' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'selectUser',
      label: 'Select User',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'User1', label: 'User 1' },
      { value: 'User2', label: 'User 2' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'pipeline',
      label: 'Pipeline',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'Sales', label: 'Sales' },
      { value: 'Marketing', label: 'Marketing' },
      { value: 'Contact', label: 'Contact' },
      { value: 'Conversation', label: 'Conversation' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'goalDuration',
      label: 'Goal Duration',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'Monthly', label: 'Monthly' },
      { value: 'Quarterly ', label: 'Quarterly ' },
      { value: 'Yearly', label: 'Yearly' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'goalStatus',
      label: 'Goal Status',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'NotStarted', label: 'Not Started' },
      { value: 'Inprogress', label: 'Inprogress' },
      { value: 'Missed', label: 'Missed' },
      { value: 'Achieved', label: 'Achieved' },
      { value: 'Exceeded', label: 'Exceeded' },
    ],
    component: RHFSelect,
    md: 12,
  },
];
