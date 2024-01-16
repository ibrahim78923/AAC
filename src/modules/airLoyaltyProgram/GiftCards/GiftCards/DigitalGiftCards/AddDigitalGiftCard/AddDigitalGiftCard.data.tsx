import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';
const optionsVisible = ['All', 'Jane', 'John'];
const optionsVisibleShop = ['Shop 1', 'Shop 2'];

export const validationSchema = Yup?.object()?.shape({
  amount: Yup?.string()?.trim()?.required('Required'),
  recipient: Yup?.mixed()?.required('Required'),
  shop: Yup?.mixed()?.required('Required'),
});

export const defaultValues = {
  amount: '',
  recipient: null,
  shop: null,
};

export const addDigitalGiftCardFormFields = [
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
    id: 2,
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
  {
    id: 3,
    componentProps: {
      name: 'shop',
      label: 'Shop',
      required: true,
      options: optionsVisibleShop,
      placeholder: 'Select',
    },
    component: RHFAutocomplete,
    md: 12,
  },
];
