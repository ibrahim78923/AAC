import {
  RHFDatePicker,
  RHFEditor,
  RHFSelect,
  RHFSwitchableDatepicker,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const validationSchema = Yup?.object()?.shape({
  title: Yup?.string()?.required('Field is Required'),
});

export const initvalues = {
  title: '',
  campaignOwner: '',
  startDate: undefined,
  endDate: undefined,
  campaignGoal: '',
  campaignStatus: '',
  description: '',
  campaignAudience: '',
  campaignBudget: null,
};
export const campaignArray = (UserListData: any) => {
  return [
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
        name: 'campaignGoal',
        label: 'Compaign Goal',
        placeholder: 'Enter goal',
        fullWidth: true,
      },
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'campaignAudience',
        label: 'Compaign Audience',
        fullWidth: true,
      },
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'campaignBudget',
        label: 'Compaign Budget',
        placeholder: 'Enter Amount',
        type: 'number',
        InputProps: { inputProps: { min: 0 } },
      },
      component: RHFTextField,
    },
    {
      componentProps: {
        label: 'Campaign Status',
        name: 'campaignStatus',
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
        fullWidth: true,
      },
      component: RHFEditor,
      md: 12,
    },
  ];
};

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
      name: 'Select Campaign 2',
      label: 'Select Campaign 2',
      fullWidth: true,
      select: true,
    },
    component: RHFSelect,
    md: 12,
  },
];
