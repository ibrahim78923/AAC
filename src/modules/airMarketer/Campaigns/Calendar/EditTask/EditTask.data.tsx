import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDatePicker,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';
import { Typography, useTheme } from '@mui/material';

import * as Yup from 'yup';
import {
  useLazyGetAllCampaignsListQuery,
  useLazyGetDealOwnersListQuery,
} from '@/services/common-APIs';
import { ROLES } from '@/constants/strings';
import { getSession } from '@/utils';

const today = new Date();
today.setHours(0, 0, 0, 0);

export const validationSchema = Yup?.object().shape({
  taskName: Yup?.string()?.required('Field is Required'),
  dueDate: Yup.date()
    ?.min(today, 'You cannot select a past date')
    ?.required('Date is required'),
});

export const defaultValues = {
  taskName: '',
  taskType: '',
  campaignId: null,
  assignedTo: null,
  dueDate: null,
  time: null,
  note: '',
};

export const dataArray = () => {
  const { user }: any = getSession();
  const orgId = user?.organization?._id;
  const theme = useTheme();
  const campaignsList = useLazyGetAllCampaignsListQuery();
  const userListData = useLazyGetDealOwnersListQuery();
  return [
    {
      componentProps: {
        name: 'taskName',
        label: 'Task Name',
        placeholder: 'Enter Name',
        required: true,
        fullWidth: true,
      },
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        placeholder: 'Select type',
        name: 'taskType',
        label: 'Task Type',
        fullWidth: true,
        options: ['email', 'call', 'others'],
      },

      component: RHFAutocomplete,
      md: 12,
    },
    {
      componentProps: {
        placeholder: 'Select campaign',
        name: 'campaignId',
        label: 'Select Campaign',
        apiQuery: campaignsList,
        fullWidth: true,
        getOptionLabel: (option: any) => option?.title,
      },
      component: RHFAutocompleteAsync,
      md: 12,
    },
    {
      componentProps: {
        placeholder: 'Select assignee',
        name: 'assignedTo',
        label: 'Assigned To',
        apiQuery: userListData,
        getOptionLabel: (option: any) =>
          `${option?.firstName} ${option?.lastName}`,
        externalParams: { role: ROLES?.ORG_EMPLOYEE, organization: orgId },
        queryKey: 'role',
      },
      component: RHFAutocompleteAsync,
      md: 12,
    },
    {
      componentProps: {
        name: 'dueDate',
        label: 'Due Date',
        fullWidth: true,
        required: true,
      },
      component: RHFDatePicker,
      md: 12,
    },
    {
      componentProps: {
        name: 'time',
        label: 'Due Time',
        fullWidth: true,
      },

      component: RHFDatePicker,

      md: 12,
    },
    {
      componentProps: {
        color: theme?.palette?.grey[500],
        variant: 'body2',
        heading: 'You can customize your default settings. Go to Settings',
      },
      gridLength: 12,
      component: Typography,
    },
    {
      componentProps: {
        name: 'note',
        label: 'Note',
        fullWidth: true,
      },
      component: RHFEditor,
      md: 12,
    },
  ];
};
