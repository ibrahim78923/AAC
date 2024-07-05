import {
  RHFDatePicker,
  RHFEditor,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  title: Yup?.string()?.required('Field is Required'),
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

export const dataArray = (UserListData: any) => {
  return [
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
        name: 'campaignOwner',
        label: 'Compaign Owner',
        fullWidth: true,
        select: true,
      },

      options: UserListData?.data?.users?.map((item: any) => ({
        value: item?._id,
        label: `${item?.firstName} ${item?.lastName}`,
      })) ?? [{ label: '', value: '' }],

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
        name: 'campaignGoal',
        label: 'Compaign Goal',
        placeholder: 'Get 5k likes on instagram',
        fullWidth: true,
      },
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'campaignAudience',
        label: 'Compaign Audience',
        placeholder: 'Instagram influencers',
        fullWidth: true,
      },
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'campaignBudget',
        label: 'Compaign Budget',
        placeholder: '£20.105.00',
        fullWidth: true,
      },
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'campaignStatus',
        label: 'compaign Status',
        fullWidth: true,
        select: true,
      },
      options: [
        { value: 'scheduled', label: 'Scheduled' },
        { value: 'inprogress', label: 'In Progress' },
        { value: 'active', label: 'Active' },
        { value: 'paused', label: 'Paused' },
        { value: 'completed', label: 'Completed' },
      ],

      component: RHFSelect,

      md: 12,
    },
    {
      componentProps: {
        name: 'description',
        label: '',
        fullWidth: true,
        placeholder: 'This campaign is created to market our instagram page',
      },
      component: RHFEditor,
      md: 12,
    },
  ];
};
