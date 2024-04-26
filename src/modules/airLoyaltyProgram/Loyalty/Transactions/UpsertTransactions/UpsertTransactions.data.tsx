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
    channel: Yup?.string(),
    points: Yup?.string(),
  });

export const upsertLoyaltyTransactionsDefaultValues: any = {
  email: '',
  shop: null,
  type: null,
  channel: loyaltytransactionChannel?.[0]?.label,
  points: '',
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
      getOptionLabel: (option: any) => option?.shopName,
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
      disabled: true,
    },
    component: RHFTextField,
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
