import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';

export const upsertShopFields = [
  {
    id: 1,
    component: RHFTextField,
    componentProps: {
      fullWidth: true,
      name: 'shopName',
      label: 'Shop Name',
      placeholder: 'Enter Shop Name',
    },
  },
  {
    id: 2,
    component: RHFAutocomplete,
    componentProps: {
      fullWidth: true,
      name: 'shopType',
      label: 'Shop Type',
      select: true,
      placeholder: 'Select',
      options: [''],
    },
  },
  {
    id: 3,
    component: RHFTextField,
    componentProps: {
      fullWidth: true,
      name: 'associatedEmail',
      label: 'Associated Email',
      placeholder: 'Enter Associated Email',
    },
  },
  {
    id: 4,
    component: RHFTextField,
    componentProps: {
      fullWidth: true,
      name: 'city',
      label: 'City',
      placeholder: 'Enter City',
    },
  },
  {
    id: 5,
    component: RHFAutocomplete,
    componentProps: {
      fullWidth: true,
      name: 'country',
      label: 'Country',
      select: true,
      placeholder: 'Select',
      options: [''],
    },
  },
  {
    id: 3,
    component: RHFTextField,
    componentProps: {
      fullWidth: true,
      name: 'postCode',
      label: 'Post Code',
      placeholder: 'Enter Post Code',
    },
  },
  {
    id: 4,
    component: RHFTextField,
    componentProps: {
      fullWidth: true,
      name: 'address',
      label: 'Address',
      placeholder: 'Enter Address',
    },
  },
];
