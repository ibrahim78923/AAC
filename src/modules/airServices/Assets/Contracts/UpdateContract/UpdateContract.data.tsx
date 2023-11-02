import {
  RHFDatePicker,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
import { Typography } from '@mui/material';
import { ItemDetail } from '../UpsertContract/ItemDetail';
import { CONTRACT_TYPES } from '../UpsertContract/UpsertContract.data';

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

export const updateContractFormFieldsFunction = (router: any) => [
  {
    componentProps: {
      variant: 'h5',
    },
    heading: 'Contract Details',
    md: 12,
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
  ...(router?.query?.contractType === CONTRACT_TYPES?.SOFTWARE_LICENSE
    ? [
        {
          id: 3,
          componentProps: {
            color: 'slateBlue.main',
            variant: 'h4',
          },
          heading: 'Item & Cost Details',
          md: 12,
          component: Typography,
        },
        {
          id: 54383,
          componentProps: {
            name: 'itemDetail',
          },
          component: ItemDetail,
          md: 12,
        },
      ]
    : []),
];
