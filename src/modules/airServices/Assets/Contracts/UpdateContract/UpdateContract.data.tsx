import { RHFDatePicker, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';
import { Typography } from '@mui/material';
import { CONTRACT_ACTION } from '@/constants/strings';
import { uiDateFormat } from '@/lib/date-time';
import GetContractAdminAgentDropdown from '../ContractFormFieldsDropdowns/GetContractAdminAgentDropdown';

export const updateContractFormValidationSchema = Yup?.object()?.shape({
  approver: Yup?.mixed()?.nullable(),
  startDate: Yup?.date(),
  endDate: Yup?.date(),
  cost: Yup?.number(),
});

export const updateContractFormDefaultValuesFunction = (data?: any) => {
  return {
    startDate: new Date(data?.data?.startDate ?? uiDateFormat(new Date())),
    endDate: new Date(data?.data?.endDate ?? uiDateFormat(new Date())),
    cost: data?.data?.cost ?? 0,
    approver: data?.data?.approver ?? null,
  };
};

export const updateContractFormFieldsFunction = (actionRenewExtend: any) => [
  {
    _id: 1,
    componentProps: {
      variant: 'h5',
    },
    heading: 'Contract Details',
    md: 12,
    component: Typography,
  },
  {
    _id: 2,
    componentProps: {
      name: 'startDate',
      label: 'Start Date',
      disabled: actionRenewExtend === CONTRACT_ACTION?.EXTEND,
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 6,
  },
  {
    _id: 3,
    componentProps: {
      name: 'endDate',
      label: 'End Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 6,
  },
  {
    _id: 4,
    componentProps: {
      name: 'cost',
      label: 'Cost (£)',
      fullWidth: true,
      type: 'number',
      inputProps: {
        min: 0,
      },
    },
    component: RHFTextField,
    md: 6,
  },

  {
    _id: 5,
    component: GetContractAdminAgentDropdown,
    md: 6,
  },
];
