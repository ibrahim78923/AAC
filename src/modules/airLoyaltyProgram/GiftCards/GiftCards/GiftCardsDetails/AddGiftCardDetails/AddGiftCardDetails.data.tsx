import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const addGiftCardDetailsValidationSchema = Yup?.object()?.shape({
  amount: Yup?.number()
    ?.typeError('Amount must be a number')
    ?.required('Amount is required'),
});

export const addGiftCardDetailsDefaultValues = () => {
  return {
    amount: null,
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
