import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDatePicker,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';
import { indexNumbers } from '@/constants';
import { ROLES } from '@/constants/strings';
import {
  dynamicFormInitialValue,
  dynamicFormValidationSchema,
} from '@/utils/dynamic-forms';

import * as Yup from 'yup';

export const validationSchema = (form: any) => {
  const formSchema: any = dynamicFormValidationSchema(form);
  return Yup?.object()?.shape({
    title: Yup?.string()?.required('Field is Required'),
    ...formSchema,
  });
};

export const defaultValues = (data?: any, form?: any) => {
  const initialValues: any = dynamicFormInitialValue(data, form);
  return {
    title: data?.title ?? '',
    campaignOwner: data?.campaignOwnerDetails[0] ?? null,
    startDate: data?.startDate ? new Date(data?.startDate) : null,
    endDate: data?.endDate ? new Date(data?.endDate) : null,
    campaignGoal: data?.campaignGoal ?? '',
    campaignStatus: data?.campaignStatus ?? '',
    description: data?.description ?? '',
    campaignAudience: data?.campaignAudience ?? '',
    campaignBudget: data?.campaignBudget ?? null,
    ...initialValues,
  };
};

export const dataArray = (userListData: any, organizationId: any) => {
  return [
    {
      componentProps: {
        name: 'title',
        label: 'Title',
        placeholder: 'Enter Title',
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
        minDate: new Date(),
        fullWidth: true,
      },

      component: RHFDatePicker,

      md: 12,
    },
    {
      componentProps: {
        name: 'endDate',
        label: 'End Date',
        minDate: new Date(),
        fullWidth: true,
      },

      component: RHFDatePicker,

      md: 12,
    },
    {
      componentProps: {
        name: 'campaignGoal',
        label: 'Campaign Goal',
        placeholder: 'Enter Goal',
        fullWidth: true,
      },
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'campaignAudience',
        label: 'Campaign Audience',
        placeholder: 'Enter Audience',
        fullWidth: true,
      },
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'campaignBudget',
        label: 'Campaign Budget (₤)',
        placeholder: 'Enter Budget',
        fullWidth: true,
      },
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'campaignStatus',
        label: 'Campaign Status',
        fullWidth: true,
        placeholder: 'Select Status',
        options: ['scheduled', 'inprogress', 'active', 'paused', 'completed'],
        getOptionLabel: (option: any) =>
          option?.charAt(indexNumbers?.ZERO)?.toUpperCase() +
          option?.slice(indexNumbers?.ONE),
      },
      component: RHFAutocomplete,
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
