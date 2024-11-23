import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const addGiftCardDetailsValidationSchema = Yup?.object()?.shape({
  amount: Yup?.string()?.required('Amount is Required'),
});

export const addGiftCardDetailsDefaultValues = () => {
  return {
    amount: '',
  };
};

export const addGiftCardDetailsFormFieldsDynamic = () => [
  {
    id: 1,
    componentProps: {
      name: 'amount',
      label: 'Amount',
      fullWidth: true,
      placeholder: 'Enter Amount',
    },
    component: RHFTextField,
  },
];
