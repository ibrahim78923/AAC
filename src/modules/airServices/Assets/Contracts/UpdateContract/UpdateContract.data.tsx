import {
  RHFDatePicker,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
import { Typography } from '@mui/material';

export const updateContractFormValidationSchema = Yup?.object()?.shape({
  startDate: Yup?.date(),
  endDate: Yup?.date(),
  cost: Yup?.string(),
  approver: Yup?.string(),
});

export const updateContractFormDefaultValues = {
  startDate: new Date(),
  endDate: new Date(),
  cost: '',
  approver: '',
};

export const updateContractFormFields = [
  {
    componentProps: {
      variant: 'h5',
    },
    heading: 'Contract Details',
    gridLength: 12,
    component: Typography,
  },
  {
    componentProps: {
      name: 'startDate',
      label: 'Start Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 6,
  },
  {
    componentProps: {
      name: 'endDate',
      label: 'End Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 6,
  },
  {
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
    componentProps: {
      name: 'approver',
      label: 'Approver',
      fullWidth: true,
      select: true,
    },
    options: [
      {
        value: 'markwood',
        label: 'Markwook',
      },
      {
        value: 'randall',
        label: 'Randall',
      },
      {
        value: 'shane',
        label: 'Shane',
      },
      {
        value: 'floyd',
        label: 'floyd',
      },
    ],

    component: RHFSelect,
    md: 6,
  },
];
