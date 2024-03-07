import {
  RHFAutocompleteAsync,
  RHFDatePicker,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
import { Typography } from '@mui/material';
import dayjs from 'dayjs';
import { CONTRACT_ACTION } from '@/constants/strings';

const todayDate = dayjs()?.format('MM/DD/YYYY');

export const updateContractFormValidationSchema = Yup?.object()?.shape({
  approver: Yup?.mixed()?.nullable(),
  startDate: Yup?.date(),
  endDate: Yup?.date(),
  cost: Yup?.string(),
});

export const updateContractFormDefaultValuesFunction = (data?: any) => {
  return {
    startDate: new Date(data?.data?.startDate ?? todayDate),
    endDate: new Date(data?.data?.endDate ?? todayDate),
    cost: data?.data?.cost ?? '',
    approver: data?.data?.approver ?? null,
  };
};

export const updateContractFormFieldsFunction = (
  apiQueryApprover: any,
  actionRenewExtend: any,
) => [
  {
    id: 5,
    componentProps: {
      variant: 'h5',
    },
    heading: 'Contract Details',
    md: 12,
    component: Typography,
  },
  {
    id: 5,
    componentProps: {
      name: 'startDate',
      label: 'Start Date',
      disabled: actionRenewExtend === CONTRACT_ACTION?.EXTEND ? true : false,
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 6,
  },
  {
    id: 6,
    componentProps: {
      name: 'endDate',
      label: 'End Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 6,
  },
  {
    id: 7,
    componentProps: {
      name: 'cost',
      label: 'Cost (£)',
      fullWidth: true,
      select: false,
    },
    component: RHFTextField,
    md: 6,
  },

  {
    id: 8,
    component: RHFAutocompleteAsync,
    md: 6,
    componentProps: {
      fullWidth: true,
      name: 'approver',
      label: 'Approver',
      apiQuery: apiQueryApprover,
      getOptionLabel: (option: any) =>
        `${option?.firstName} ${option?.lastName}`,
    },
  },
];
