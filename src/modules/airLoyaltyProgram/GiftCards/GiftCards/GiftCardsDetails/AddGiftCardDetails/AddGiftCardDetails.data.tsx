import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

const optionsVisibleTo = ['+', '-'];

export const addGiftCardDetailsValidationSchema = Yup?.object()?.shape({
  add: Yup?.string()?.required('Add is Required'),
  amount: Yup?.string()?.required('Amount is Required'),
});

export const addGiftCardDetailsDefaultValues = () => {
  return {
    add: '',
    amount: '',
  };
};

export const addGiftCardDetailsFormFieldsDynamic = () => [
  {
    id: 1,
    componentProps: {
      name: 'add',
      label: 'Amount',
      options: optionsVisibleTo,
      required: 'true',
      isOptionEqualToValue: (option: any, newValue: any) => option === newValue,
    },
    component: RHFAutocomplete,
    md: 3,
  },
  {
    id: 2,
    componentProps: {
      name: 'amount',
      label: '\u00a0\u00a0',
      placeholder: 'Enter Amount',
    },
    component: RHFTextField,
    md: 9,
  },
];
