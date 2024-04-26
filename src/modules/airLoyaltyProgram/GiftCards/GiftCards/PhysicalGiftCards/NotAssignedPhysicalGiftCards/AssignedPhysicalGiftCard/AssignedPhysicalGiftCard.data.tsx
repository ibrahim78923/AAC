import { RHFAutocompleteAsync, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const validationSchema = Yup?.object()?.shape({
  amount: Yup?.string()?.required('Amount is equired'),
  recipient: Yup?.mixed()?.nullable()?.required('Recipient is required'),
});

export const defaultValues = {
  amount: '',
  recipient: null,
};

export const assignedPhysicalGiftCardFormFieldsDynamic = (
  recipientsApiQuery: any,
) => [
  {
    id: 1,
    componentProps: {
      name: 'amount',
      label: 'Amount',
      required: true,
      placeholder: 'Enter Amount',
    },

    component: RHFTextField,
  },
  {
    id: 3,
    componentProps: {
      name: 'recipient',
      label: 'Recipient',
      fullWidth: true,
      placeholder: 'Select from contacts',
      required: true,
      apiQuery: recipientsApiQuery,
      getOptionLabel: (option: any) => option?.contactName,
    },
    component: RHFAutocompleteAsync,
  },
];
