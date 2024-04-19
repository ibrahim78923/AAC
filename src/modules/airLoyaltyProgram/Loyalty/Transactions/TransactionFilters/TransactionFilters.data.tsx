import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFTextField,
} from '@/components/ReactHookForm';
import {
  loyaltytransactionChannel,
  loyaltytransactionType,
} from '../Transactions.data';

export const filtersDefaultValues: any = (filterValue: any) => {
  return {
    shop: filterValue?.shop ?? null,
    type: filterValue?.type ?? null,
    channel: filterValue?.channel ?? null,
    credit: filterValue?.credit ?? '',
  };
};

export const transactionFilterFormFieldsDynamic = (shopApiQuery?: any) => [
  {
    id: 1,
    componentProps: {
      name: 'shop',
      label: 'Shop',
      placeholder: 'Select shop',
      fullWidth: true,
      options: [],
      apiQuery: shopApiQuery,
      getOptionLabel: (option: any) => option?.shopName,
    },
    component: RHFAutocompleteAsync,
  },
  {
    id: 2,
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
    id: 3,
    componentProps: {
      name: 'channel',
      label: 'Channel',
      placeholder: 'Select channel',
      fullWidth: true,
      options: loyaltytransactionChannel,
      getOptionLabel: (option: any) => option?.label,
    },
    component: RHFAutocomplete,
  },
  {
    id: 5,
    componentProps: {
      name: 'credit',
      label: 'Credits',
      placeholder: 'credits',
      fullWidth: true,
    },
    component: RHFTextField,
  },
];
