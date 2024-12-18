import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const addGiftCardDetailsValidationSchema = (currentAmount: any) =>
  Yup?.object()?.shape({
    amount: Yup?.number()
      ?.typeError('Amount must be a number')
      ?.required('Amount is required')
      ?.max(
        currentAmount,
        currentAmount === '0'
          ? 'No funds available. Current amount is 0'
          : `Amount cannot exceed the current amount of £${currentAmount}`,
      )
      ?.min(1, 'Amount must be greater then 0'),
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
