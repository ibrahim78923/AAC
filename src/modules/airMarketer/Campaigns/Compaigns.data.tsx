import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDatePicker,
  RHFEditor,
  RHFSelect,
  RHFSwitchableDatepicker,
  RHFTextField,
} from '@/components/ReactHookForm';
import { ROLES } from '@/constants/strings';
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
export const campaignArray = (userListData: any, organizationId: any) => {
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
        name: 'campaignOwner',
        label: 'Campaign Owner',
        fullWidth: true,
        placeholder: 'Select Campaign Owner',
        apiQuery: userListData,
        getOptionLabel: (item: any) =>
          item ? `${item?.firstName} ${item?.lastName}` : '',
        externalParams: {
          role: ROLES?.ORG_EMPLOYEE,
          organization: organizationId,
        },
        queryKey: 'role',
      },
      component: RHFAutocompleteAsync,
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
        placeholder: 'select status',
        options: ['scheduled', 'inprogress', 'active', 'paused', 'completed'],
      },

      component: RHFAutocomplete,
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
