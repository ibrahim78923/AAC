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
  useLazyGetAllUsersDropdownQuery,
} from '@/services/common-APIs';

import { getActiveProductSession } from '@/utils';
import {
  dynamicFormInitialValue,
  dynamicFormValidationSchema,
} from '@/utils/dynamic-forms';
import { indexNumbers } from '@/constants';

import dayjs from 'dayjs';

const today = new Date();
today.setHours(0, 0, 0, 0);

export const validationSchema = (form: any) => {
  const formSchema: any = dynamicFormValidationSchema(form);
  return Yup?.object().shape({
    taskName: Yup?.string()?.required('Field is Required'),
    dueDate: Yup?.date()
      ?.min(today, 'You cannot select a past date')
      ?.required('Field is Required'),
    taskType: Yup?.string()?.required('Field is Required'),
    campaignId: Yup?.object()?.required('Field is Required'),
    assignedTo: Yup?.object()?.required('Field is Required'),
    note: Yup?.string()?.required('Field is Required'),
    time: Yup?.date()?.required('Field is Required'),
    // commented for future use
    // ?.test('is-future-time', 'Time must be in the future', function (value) {
    //   const currentDate = new Date();
    //   return value && value > currentDate;
    // }),
    ...formSchema,
  });
};
export const defaultValues = (data?: any, form?: any) => {
  const initialValues: any = dynamicFormInitialValue(data, form);
  return {
    taskName: data?.taskName ?? '',
    taskType: data?.taskType ?? '',
    campaignId: data?.campaignDetails[0] ?? null,
    assignedTo: data?.assignedTo[0] ?? null,
    dueDate: data?.dueDate ? new Date(data?.dueDate) : null,
    time: data?.time ? dayjs.utc(data?.time) : null,
    note: data?.note ?? '',
    ...initialValues,
  };
};

export const dataArray = () => {
  const activeProduct = getActiveProductSession();
  const companyAccountId =
    activeProduct?.accounts[indexNumbers?.ZERO]?.company?._id;
  const campaignsList = useLazyGetAllCampaignsListQuery();
  const userListData = useLazyGetAllUsersDropdownQuery();

  return [
    {
      componentProps: {
        name: 'taskName',
        label: 'Task Name',
        placeholder: 'Enter name',
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
        fullWidth: true,
        required: true,
        getOptionLabel: (option: any) => option?.title,
        externalParams: {
          companyId: companyAccountId,
        },
        queryKey: 'companyId',
      },
      component: RHFAutocompleteAsync,
      md: 12,
    },
    {
      componentProps: {
        placeholder: 'Select assignee',
        name: 'assignedTo',
        label: 'Assigned To',
        required: true,
        apiQuery: userListData,
        getOptionLabel: (option: any) =>
          `${option?.firstName} ${option?.lastName}`,
        externalParams: { productId: activeProduct?._id },
      },
      component: RHFAutocompleteAsync,
      md: 12,
    },
    {
      componentProps: {
        name: 'dueDate',
        label: 'Due Date',
        // minDate: new Date(),
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
