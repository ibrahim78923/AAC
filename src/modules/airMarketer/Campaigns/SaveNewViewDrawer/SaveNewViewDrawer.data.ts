import { RHFDatePicker, RHFSelect } from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  campaignStatus: Yup?.string()?.required('Field is Required'),
  startDate: Yup?.string()?.trim()?.required('Field is Required'),
  endDate: Yup?.string()?.required('Field is Required'),
});

export const defaultValues = {
  campaignStatus: '',
  startDate: '',
  endDate: '',
};

export const dataArray = () => {
  return [
    {
      componentProps: {
        name: 'campaignStatus',
        label: 'Campaign Status',
        fullWidth: true,
        select: true,
      },

      options: [
        { value: 'scheduled', label: 'Scheduled' },
        { value: 'inProgress', label: 'InProgress' },
        { value: 'active', label: 'Active' },
        { value: 'active', label: 'Active' },
        { value: 'paused', label: 'Paused' },
        { value: 'completed', label: 'Completed' },
      ],

      component: RHFSelect,

      md: 12,
    },
    {
      componentProps: {
        name: 'startDate',
        label: 'Start Date',
        fullWidth: true,
      },

      component: RHFDatePicker,

      md: 12,
    },
    {
      componentProps: {
        name: 'endDate',
        label: 'End Date',
        fullWidth: true,
      },

      component: RHFDatePicker,

      md: 12,
    },
  ];
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
