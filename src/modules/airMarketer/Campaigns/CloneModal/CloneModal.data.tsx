import {
  RHFDatePicker,
  RHFEditor,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const validationSchemaFeatures = Yup.object().shape({
  title: Yup.string()?.trim()?.required('Field is Required'),
});

export const defaultValuesFeatures = {
  title: '',
};

export const dataArrayFeatures = (UserListData: any) => {
  return [
    {
      componentProps: {
        name: 'title',
        label: 'Name',
        placeholder: 'Enter name',
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
        label: 'Campaign Goal',
        placeholder: 'Get 5k likes on instagram',
        fullWidth: true,
      },

      component: RHFTextField,

      md: 12,
    },
    {
      componentProps: {
        name: 'campaignAudience',
        label: 'Campaign Audience',
        placeholder: 'Instagram influencers',
        fullWidth: true,
      },

      component: RHFTextField,

      md: 12,
    },
    {
      componentProps: {
        name: 'campaignBudget',
        label: 'Campaign Budget',
        placeholder: '$20,105.00',
        fullWidth: true,
      },

      component: RHFTextField,

      md: 12,
    },
    {
      componentProps: {
        name: 'campaignStatus',
        label: 'Campaign Status',
        placeholder: 'Active',
        fullWidth: true,
      },

      component: RHFTextField,

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
