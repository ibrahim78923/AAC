import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';
import { LOYALTY_SHOP_TYPE_MAPPED } from '@/constants/api-mapped';
import { LOYALTY_SHOP_TYPE } from '@/constants/strings';
import * as Yup from 'yup';

export const shopTypeOptions = [
  {
    _id: LOYALTY_SHOP_TYPE?.ON_SITE,
    label: LOYALTY_SHOP_TYPE_MAPPED?.ON_SITE,
  },
  {
    _id: LOYALTY_SHOP_TYPE?.DEPARTMENT,
    label: LOYALTY_SHOP_TYPE_MAPPED?.DEPARTMENT,
  },
  {
    _id: LOYALTY_SHOP_TYPE?.HEADQUARTERS,
    label: LOYALTY_SHOP_TYPE_MAPPED?.HEADQUARTERS,
  },
  {
    _id: LOYALTY_SHOP_TYPE?.POINT_OF_SALE,
    label: LOYALTY_SHOP_TYPE_MAPPED?.POINT_OF_SALE,
  },
  {
    _id: LOYALTY_SHOP_TYPE?.WEB_SHOP,
    label: LOYALTY_SHOP_TYPE_MAPPED?.WEB_SHOP,
  },
];

export const countryOptions = [
  {
    _id: 'United Kingdom',
    label: 'United Kingdom',
  },
];

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
      placeholder: 'Select shop type',
      options: shopTypeOptions,
      getOptionLabel: (option: any) => option?.label,
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
      options: countryOptions,
      getOptionLabel: (option: any) => option?.label,
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
