import {
  RHFDatePicker,
  RHFEditor,
  RHFSelect,
  RHFSwitchableDatepicker,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const validationSchema = Yup?.object()?.shape({});

export const defaultValuesCompaign = {};

export const campaignArray = [
  {
    componentProps: {
      name: 'title',
      label: 'Title',
      placeholder: 'John Allen',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      label: 'Campaign Owner',
      name: 'campaignOwner',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'leslie', label: 'Leslie Alexander' },
      { value: 'jerome', label: 'Jerome Bell' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'startDate',
      label: 'Start Date',
      placeholder: 'Select',
      fullWidth: true,
    },
    component: RHFSwitchableDatepicker,
    md: 12,
  },
  {
    componentProps: {
      name: 'endDate',
      label: 'End Date',
      placeholder: 'Select',
      fullWidth: true,
    },
    component: RHFSwitchableDatepicker,
    md: 12,
  },
  {
    componentProps: {
      name: 'compaignGoal',
      label: 'Compaign Goal',
      placeholder: 'Enter goal',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'compaignAudience',
      label: 'Compaign Audience',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'compaignBudget',
      label: 'Compaign Budget',
      placeholder: '₤',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      label: 'Campaign Status',
      name: 'campaignStatus',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'schedule', label: 'Scheduled' },
      { value: 'inProgress', label: 'In Progress' },
      { value: 'active', label: 'Active' },
      { value: 'paused', label: 'Paused' },
      { value: 'completed', label: 'Completed' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'editor',
      fullWidth: true,
    },
    component: RHFEditor,
    md: 12,
  },
];

export const compareCampaignArray = [
  {
    componentProps: {
      name: 'startDate',
      label: 'Start Date',
      fullWidth: true,
      select: false,
    },
    component: RHFDatePicker,
    md: 12,
  },
  {
    componentProps: {
      name: 'endDate',
      label: 'End Date',
      fullWidth: true,
      select: false,
    },
    component: RHFDatePicker,
    md: 12,
  },
  {
    componentProps: {
      name: 'selectCampaign1',
      label: 'Select Campaign 1',
      fullWidth: true,
      select: true,
    },
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'selectCampaign2',
      label: 'Select Campaign 2',
      fullWidth: true,
      select: true,
    },
    component: RHFSelect,
    md: 12,
  },
];
