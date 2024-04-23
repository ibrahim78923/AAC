import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

const optionsVisibleTo = ['+', '-'];

export const addGiftCardDetailsValidationSchema = Yup?.object()?.shape({
  add: Yup?.string()?.required('Required'),
  amount: Yup?.string()?.required('Required'),
  shop: Yup?.mixed()?.nullable()?.required('Required'),
  giftCardNo: Yup?.string()?.required('Required'),
});

export const addGiftCardDetailsDefaultValues = () => {
  return {
    add: '',
    amount: '',
    shop: null,
    giftCardNo: '',
  };
};

export const addGiftCardDetailsFormFieldsDynamic = (shopApiQuery: any) => [
  {
    id: 1,
    componentProps: {
      name: 'add',
      label: 'Amount',
      options: optionsVisibleTo,
      required: 'true',
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
  {
    id: 3,
    componentProps: {
      name: 'shop',
      label: 'Shop',
      fullWidth: true,
      placeholder: 'Select',
      required: true,
      apiQuery: shopApiQuery,
      getOptionLabel: (option: any) => option?.shopName,
    },
    component: RHFAutocompleteAsync,
    md: 12,
  },
];
