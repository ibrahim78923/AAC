import { RHFAutocompleteAsync, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const addDigitalGiftCardValidationSchema = Yup?.object()?.shape({
  amount: Yup?.string()?.trim()?.required('Required'),
  recipient: Yup?.mixed()?.nullable()?.required('Required'),
  shop: Yup?.mixed()?.nullable()?.required('Required'),
});

export const addDigitalGiftCardDefaultValues = {
  amount: '',
  recipient: null,
  shop: null,
};

export const addDigitalGiftCardFormFieldsDynamic = (
  shopApiQuery: any,
  contactsApiQuery: any,
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
    id: 2,
    componentProps: {
      name: 'recipient',
      label: 'Recipient',
      placeholder: 'Select recipient',
      fullWidth: true,
      required: true,
      apiQuery: contactsApiQuery,
      getOptionLabel: (option: any) => option?.contactName,
    },
    component: RHFAutocompleteAsync,
  },
  {
    id: 3,
    componentProps: {
      name: 'shop',
      label: 'Shop',
      required: true,
      placeholder: 'Select shop',
      apiQuery: shopApiQuery,
      getOptionLabel: (option: any) => option?.shopName,
    },
    component: RHFAutocompleteAsync,
  },
];
