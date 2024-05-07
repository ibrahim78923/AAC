import {
  RHFAutocomplete,
  RHFDropZone,
  RHFTextField,
} from '@/components/ReactHookForm';
import { FILE_MAX_SIZE } from '@/config';
import { LOYALTY_SHOP_TYPE_MAPPED } from '@/constants/api-mapped';
import { LOYALTY_SHOP_TYPE } from '@/constants/strings';
import * as Yup from 'yup';

export const shopTypeOptions = [
  {
    _id: LOYALTY_SHOP_TYPE?.ON_SITE,
    label: LOYALTY_SHOP_TYPE_MAPPED?.[LOYALTY_SHOP_TYPE?.ON_SITE],
  },
  {
    _id: LOYALTY_SHOP_TYPE?.DEPARTMENT,
    label: LOYALTY_SHOP_TYPE_MAPPED?.[LOYALTY_SHOP_TYPE?.DEPARTMENT],
  },
  {
    _id: LOYALTY_SHOP_TYPE?.HEADQUARTERS,
    label: LOYALTY_SHOP_TYPE_MAPPED?.[LOYALTY_SHOP_TYPE?.HEADQUARTERS],
  },
  {
    _id: LOYALTY_SHOP_TYPE?.POINT_OF_SALE,
    label: LOYALTY_SHOP_TYPE_MAPPED?.[LOYALTY_SHOP_TYPE?.POINT_OF_SALE],
  },
  {
    _id: LOYALTY_SHOP_TYPE?.WEB_SHOP,
    label: LOYALTY_SHOP_TYPE_MAPPED?.[LOYALTY_SHOP_TYPE?.WEB_SHOP],
  },
];

export const countryOptions = [
  {
    _id: 'United Kingdom',
    label: 'United Kingdom',
  },
];

export const upsertShopValidationScheme = Yup?.object()?.shape({
  name: Yup?.string()?.trim()?.required('Shop name is required'),
  shopType: Yup?.mixed()?.nullable?.()?.required('Shop type is required'),
  email: Yup?.string()
    ?.trim()
    ?.email('Enter valid email')
    ?.required('Email is required'),
  city: Yup?.string()?.trim()?.required('City is required'),
  country: Yup?.mixed()?.nullable()?.required('Country is required'),
  postCode: Yup?.string()?.trim()?.required('Post code is required'),
  address: Yup?.string()?.trim()?.required('Address is required'),
  fileUrl: Yup?.mixed()?.nullable(),
});

export const upsertShopFieldsValues = (data?: any) => {
  return {
    name: data?.name ?? '',
    shopType: data?.shopType ?? null,
    email: data?.email ?? '',
    city: data?.city ?? '',
    country: data?.country ?? null,
    postCode: data?.postCode ?? '',
    address: data?.address ?? '',
    fileUrl: null,
  };
};

export const upsertShopFormFieldsDynamic = () => [
  {
    id: 1,
    component: RHFTextField,
    componentProps: {
      fullWidth: true,
      name: 'name',
      label: 'Shop Name',
      placeholder: 'Enter Shop Name',
      required: true,
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
      required: true,
    },
  },
  {
    id: 3,
    component: RHFTextField,
    componentProps: {
      fullWidth: true,
      name: 'email',
      label: 'Associated Email',
      placeholder: 'Enter Associated Email',
      required: true,
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
      required: true,
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
      required: true,
    },
  },
  {
    id: 6,
    component: RHFTextField,
    componentProps: {
      fullWidth: true,
      name: 'postCode',
      label: 'Post Code',
      placeholder: 'Enter Post Code',
      required: true,
    },
  },
  {
    id: 7,
    component: RHFTextField,
    componentProps: {
      fullWidth: true,
      name: 'address',
      label: 'Address',
      placeholder: 'Enter Address',
      required: true,
    },
  },
  {
    id: 17,
    componentProps: {
      name: 'fileUrl',
      fullWidth: true,
      label: 'Logo',
      fileType: 'PNG or JPG  (max 2.44 MB)',
      maxSize: FILE_MAX_SIZE?.ATTACH_FILE_MAX_SIZE,
      accept: {
        'image/*': ['.png', '.jpg'],
      },
    },
    component: RHFDropZone,
  },
];
