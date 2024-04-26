import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';
const optionsVisibleTo = ['+', '-'];
const optionsVisible = [' All', 'lists', 'tires'];
export const validationSchema = Yup?.object()?.shape({
  add: Yup?.string()?.required('Required'),
  amount: Yup?.string()?.required('Required'),
  shop: Yup?.string()?.required('Required'),
  giftCardNo: Yup?.string()?.required('Required'),
});
export const defaultValues = {
  add: '',
  amount: '',
  shop: '',
  giftCardNo: '',
};
export const addTransactionDrawerData = [
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
      options: optionsVisible,
      placeholder: 'Select',
      required: 'true',
    },
    component: RHFAutocomplete,
    md: 12,
  },
  {
    id: 4,
    componentProps: {
      name: 'giftCardNo',
      label: 'Gift Card No',
      fullWidth: true,
      options: optionsVisibleTo,
      placeholder: 'Enter Card Number',
      required: 'true',
    },
    component: RHFTextField,
    md: 12,
  },
];
