import {
  RHFTextField,
  RHFDatePicker,
  RHFCheckbox,
} from '@/components/ReactHookForm';
import { Typography } from '@mui/material';

import * as Yup from 'yup';

export const validationSchema = Yup?.object()?.shape({
  cardNumber: Yup?.string()?.required('Field is Required'),

  expirationDate: Yup?.date(),

  nameOnCard: Yup?.string()?.required('Field is Required'),

  CVVCode: Yup?.string()?.required('Field is Required'),
  companyAccount: Yup?.string(),
  seePaymentMethod: Yup?.string(),
  sirSales: Yup?.string(),
  airService: Yup?.string(),
  airOperations: Yup?.string(),
});

export const defaultValues = {
  cardNumber: '',
  expirationDate: new Date(),
  nameOnCard: '',
  CVVCode: '',
  companyAccount: '',
  seePaymentMethod: '',
  sirSales: '',
  airService: '',
  airOperations: '',
};

export const dataArray = [
  {
    md: 12,
    component: RHFTextField,
    componentProps: {
      name: 'cardNumber',
      label: 'Card Number',
      placeholder: 'Enter Number',
      required: true,
      fullWidth: true,
    },
  },
  {
    md: 12,
    component: RHFDatePicker,
    componentProps: {
      name: 'expirationDate',
      label: 'Expiration Date',
      required: true,
      fullWidth: true,
    },
  },
  {
    md: 12,
    component: RHFTextField,
    componentProps: {
      name: 'nameOnCard',
      label: 'Name on Card',
      placeholder: 'Enter Name',
      fullWidth: true,
    },
  },
  {
    md: 12,
    component: RHFTextField,
    componentProps: {
      name: 'CVVCode',
      label: 'Enter CVV code',
      placeholder: '3 Digits',
      required: true,
      fullWidth: true,
    },
  },
  {
    componentProps: {
      color: '#7a7a7b',
      varient: 'h4',
      heading: 'Billing Address',
    },
    gridLength: 12,
    component: Typography,
  },
  {
    md: 12,
    component: RHFCheckbox,
    componentProps: {
      name: 'companyAccount',
      label: 'Use my company account',
      fullWidth: true,
    },
  },
  {
    md: 12,
    component: RHFCheckbox,
    componentProps: {
      name: 'seePaymentMethod',
      label: 'Allow all admin to see this payment method',
      fullWidth: true,
    },
  },
  {
    componentProps: {
      color: '#7a7a7b',
      varient: 'h4',
      heading: 'Manage Subscriptions',
    },
    gridLength: 12,
    component: Typography,
  },
  {
    componentProps: {
      color: '#7a7a7b',
      varient: 'h4',
      paragraph:
        'The subscriptions chosen below will be changed to this payment method on your next billing date',
    },
    gridLength: 12,
    component: Typography,
  },
  {
    md: 12,
    component: RHFCheckbox,
    componentProps: {
      name: 'sirSales',
      label: 'Air Sales',
      fullWidth: true,
    },
  },
  {
    md: 12,
    component: RHFCheckbox,
    componentProps: {
      name: 'airService',
      label: 'Air Services',
      fullWidth: true,
    },
  },
  {
    md: 12,
    component: RHFCheckbox,
    componentProps: {
      name: 'airOperations',
      label: 'Air Operations',
      fullWidth: true,
    },
  },
];
