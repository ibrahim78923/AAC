import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const upsertShopValidationScheme = Yup?.object()?.shape({
  shopName: Yup?.string()?.trim(),
  shopType: Yup?.mixed()?.nullable?.(),
  associatedEmail: Yup?.string()?.trim()?.email('Enter valid email'),
  city: Yup?.string()?.trim(),
  country: Yup?.mixed()?.nullable(),
  postCode: Yup?.string()?.trim(),
  address: Yup?.string()?.trim(),
});

export const upsertShopFieldsValues = (data?: any) => {
  return {
    shopName: data?.shopName ?? '',
    shopType: data?.shopType ?? null,
    associatedEmail: data?.associatedEmail ?? '',
    city: data?.city ?? '',
    country: data?.country ?? null,
    postCode: data?.postCode ?? '',
    address: data?.address ?? '',
  };
};

export const upsertShopFormFieldsDynamic = () => [
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
