import {
  RHFDatePicker,
  RHFEditor,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  title: Yup?.string()?.required('Field is Required'),
  // compaignOwner: Yup?.string()?.trim()?.required('Field is Required'),
  // startDate: Yup?.string()?.required('Field is Required'),
  // endDate: Yup?.string()?.required('Field is Required'),
  // compaignGoal: Yup?.string()?.required('Field is Required'),
  // compaignAudience: Yup?.string()?.required('Field is Required'),
  // compaignBudget: Yup?.string()?.required('Field is Required'),
  // compaignStatus: Yup?.string()?.required('Field is Required'),
  // editor: Yup?.string()?.required('Field is Required'),
});

export const defaultValues = {
  title: '',
  compaignOwner: '',
  startDate: null,
  endDate: null,
  compaignGoal: '',
  compaignAudience: '',
  compaignBudget: '',
  compaignStatus: '',
};

export const dataArray = [
  {
    componentProps: {
      name: 'title',
      label: 'Title',
      placeholder: 'John Allen',
      required: true,
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'compaignOwner',
      label: 'Compaign Owner',
      fullWidth: true,
      select: true,
    },

    options: [
      { value: 'fabrizioRomano', label: 'fabrizioRomano' },
      { value: 'fabrizioRomano', label: 'fabrizioRomano' },
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
  {
    componentProps: {
      name: 'compaignGoal',
      label: 'Compaign Goal',
      placeholder: 'Get 5k likes on instagram',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'compaignAudience',
      label: 'Compaign Audience',
      placeholder: 'Instagram influencers',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'compaignBudget',
      label: 'Compaign Budget',
      placeholder: '£20.105.00',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'compaignStatus',
      label: 'compaign Status',
      fullWidth: true,
      select: true,
    },

    options: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
    ],

    component: RHFSelect,

    md: 12,
  },
  {
    componentProps: {
      name: 'editor',
      label: '',
      fullWidth: true,
      placeholder: 'This campaign is created to market our instagram page',
    },
    component: RHFEditor,
    md: 12,
  },
];
