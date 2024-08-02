import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDatePicker,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';

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
  dueDate: Yup?.date()
    ?.min(today, 'You cannot select a past date')
    ?.required('Date is required'),
  taskType: Yup?.string()?.required('Field is Required'),
  campaignId: Yup?.object()?.required('Field is Required'),
  assignedTo: Yup?.object()?.required('Field is Required'),
  note: Yup?.string()?.required('Field is Required'),
});

export const defaultValues = {
  taskName: '',
  taskType: '',
  campaignId: null,
  assignedTo: null,
  dueDate: '',
  time: '',
  note: '',
};

export const dataArray = () => {
  const { user }: any = getSession();
  const orgId = user?.organization?._id;
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
        required: true,
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
        required: true,
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
        required: true,
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
        name: 'note',
        label: 'Note',
        fullWidth: true,
        required: true,
      },
      component: RHFEditor,
      md: 12,
    },
  ];
};
