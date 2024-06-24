import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDatePicker,
} from '@/components/ReactHookForm';
import { ROLES } from '@/constants/strings';

import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({});

export const defaultValues = {
  campaignOwner: '',
  campaignStatus: '',
  startDate: null,
  endDate: null,
};

export const dataArray = (userListData: any, organizationId: any) => {
  return [
    {
      componentProps: {
        name: 'campaignStatus',
        label: 'Campaign Status',
        fullWidth: true,
        placeholder: 'select status',
        options: ['scheduled', 'inprogress', 'active', 'paused', 'completed'],
      },
      component: RHFAutocomplete,
      md: 12,
    },
    {
      componentProps: {
        name: 'campaignOwner',
        label: 'Campaign Owner',
        fullWidth: true,
        placeholder: 'Select Campaign Owner',
        apiQuery: userListData,
        getOptionLabel: (item: any) => `${item?.firstName} ${item?.lastName}`,
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
  ];
};
