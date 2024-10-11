import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFTextField,
} from '@/components/ReactHookForm';
import {
  loyaltytransactionChannel,
  loyaltytransactionType,
} from '../../Transactions.data';

export const filtersDefaultValues: any = (filterValue: any) => {
  return {
    email: filterValue?.email ?? '',
    shop: filterValue?.shop ?? null,
    type: filterValue?.type ?? null,
    channel: filterValue?.channel ?? null,
    points: filterValue?.points ?? '',
  };
};

export const transactionFilterFormFieldsDynamic = (shopApiQuery?: any) => [
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
      name: 'points',
      label: 'Credits',
      placeholder: 'credits',
      fullWidth: true,
    },
    component: RHFTextField,
  },
];
