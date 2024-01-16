import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';
const optionsVisible = ['All', 'Jane', 'John'];

export const validationSchema = Yup?.object()?.shape({
  amount: Yup?.string()?.required('Required'),
  recipient: Yup?.string()?.required('Required'),
});

export const defaultValues = {
  amount: '',
  recipient: '',
};

export const assignedPhysicalGiftCardFormFields = [
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
      options: optionsVisible,
      placeholder: 'Select from contacts',
      required: 'true',
    },
    component: RHFAutocomplete,
  },
];
