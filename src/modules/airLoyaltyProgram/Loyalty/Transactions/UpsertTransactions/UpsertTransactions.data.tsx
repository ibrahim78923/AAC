import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
import {
  loyaltytransactionChannel,
  loyaltytransactionType,
} from '../Transactions.data';

export const upsertLoyaltyTransactionsValidationSchema: any =
  Yup?.object()?.shape({
    email: Yup?.string()?.email('Enter a valid email'),
    shop: Yup?.mixed()?.nullable(),
    type: Yup?.mixed()?.nullable(),
    channel: Yup?.mixed()?.nullable(),
    points: Yup?.mixed()
      ?.test('is-number', 'Please enter a valid number', (value: any) => {
        if (!value) return true;
        return !isNaN(value);
      })
      ?.typeError('must be a number')
      ?.nullable(),
  });

export const upsertLoyaltyTransactionsDefaultValues: any = {
  email: '',
  shop: null,
  type: null,
  channel: null,
  points: null,
};

export const upsertLoyaltyTransactionsFormFieldsDynamic = (
  shopApiQuery: any,
) => [
  {
    id: 1,
    componentProps: {
      name: 'email',
      label: 'Email',
      placeholder: 'Enter email',
      fullWidth: true,
    },
    component: RHFTextField,
  },
  {
    id: 2,
    componentProps: {
      name: 'shop',
      label: 'Shop',
      placeholder: 'Select shop',
      fullWidth: true,
      apiQuery: shopApiQuery,
      getOptionLabel: (option: any) => option?.name,
    },
    component: RHFAutocompleteAsync,
  },
  {
    id: 3,
    componentProps: {
      name: 'type',
      label: 'Type',
      placeholder: 'Select type',
      fullWidth: true,
      options: loyaltytransactionType,
      getOptionLabel: (option: any) => option?.label,
    },
    component: RHFAutocomplete,
  },
  {
    id: 4,
    componentProps: {
      name: 'channel',
      label: 'Channel',
      placeholder: 'Channel',
      fullWidth: true,
      options: loyaltytransactionChannel,
      getOptionLabel: (option: any) => option?.label,
    },
    component: RHFAutocomplete,
  },
  {
    id: 5,
    componentProps: {
      name: 'points',
      label: 'Points',
      placeholder: 'Enter points',
      fullWidth: true,
    },
    component: RHFTextField,
  },
];
