import { RHFDatePicker, RHFTextField } from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  cardNumber: Yup.string().required('Field is Required'),

  expirationDate: Yup.date(),

  nameOnCard: Yup.string().required('Field is Required'),

  CVVCode: Yup.string().required('Field is Required'),
});

export const defaultValues = {
  cardNumber: '1289991929891', //1

  expirationDate: new Date(), //2

  nameOnCard: 'John Doe', //3

  CVVCode: '345', //4
};

export const dataArray = [
  {
    md: 12,
    component: RHFTextField,
    componentProps: {
      name: 'cardNumber',
      label: 'Card Number*',
      fullWidth: true,
    },
  },
  {
    md: 12,
    component: RHFDatePicker,
    componentProps: {
      name: 'expirationDate',
      label: 'Expiration Date*',
      fullWidth: true,
    },
  },
  {
    md: 12,
    component: RHFTextField,
    componentProps: {
      name: 'nameOnCard',
      label: 'Name on Card',
      fullWidth: true,
    },
  },
  {
    md: 12,
    component: RHFTextField,
    componentProps: {
      name: 'CVVCode',
      label: 'Enter CVV code*',
      fullWidth: true,
    },
  },
];
