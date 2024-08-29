import {
  RHFAutocompleteAsync,
  RHFDatePicker,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';
import { ROLES } from '@/constants/strings';
import * as Yup from 'yup';

export const validationSchemaFeatures = Yup.object().shape({
  title: Yup.string()?.trim()?.required('Field is Required'),
});

export const defaultValuesFeatures = {
  title: '',
};

export const dataArrayFeatures = (userListData: any, organizationId: any) => {
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
        label: 'Campaign Owner',
        fullWidth: true,
        placeholder: 'Select Owner',
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
        placeholder: 'Enter goal',
        fullWidth: true,
      },
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'campaignAudience',
        label: 'Campaign Audience',
        placeholder: 'Enter audience',
        fullWidth: true,
      },

      component: RHFTextField,

      md: 12,
    },
    {
      componentProps: {
        name: 'campaignBudget',
        label: 'Campaign Budget',
        placeholder: 'Enter budget',
        fullWidth: true,
      },
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'campaignStatus',
        label: 'Campaign Status',
        placeholder: 'Enter status',
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
