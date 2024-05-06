import { RHFTextField } from '@/components/ReactHookForm';
import { VALIDATION_CONSTANT } from '@/constants';
import * as Yup from 'yup';

export const newVendorValidationSchema = Yup?.object()?.shape({
  name: Yup?.string()
    ?.trim()
    ?.required('Name is required')
    ?.max(30, 'Name up to 30 characters'),
  contactName: Yup?.string()
    ?.trim()
    ?.max(30, 'Contact Name up to 30 characters'),
  phone: Yup?.string()
    ?.trim()
    ?.test(
      'is-valid-phone',
      VALIDATION_CONSTANT?.PHONE_NUMBER?.message,
      function (value) {
        if (value) {
          return VALIDATION_CONSTANT?.PHONE_NUMBER?.regex?.test(value);
        }
        return true;
      },
    ),
  mobiles: Yup?.string()
    ?.trim()
    ?.test(
      'is-valid-phone',
      VALIDATION_CONSTANT?.PHONE_NUMBER?.message,
      function (value) {
        if (value) {
          return VALIDATION_CONSTANT?.PHONE_NUMBER?.regex?.test(value);
        }
        return true;
      },
    ),
  email: Yup?.string()?.trim()?.email('Please provide valid email'),
  description: Yup?.string()?.trim(),
  address: Yup?.string()?.trim()?.max(500, 'Address up to 500 characters'),
  country: Yup?.string()?.trim()?.max(30, 'Country up to 30 characters'),
  state: Yup?.string()?.trim()?.max(30, 'State up to 30 characters'),
  city: Yup?.string()?.trim()?.max(30, 'City up to 30 characters'),
  zipCode: Yup?.string()?.trim()?.max(30, 'Zip Code up to 30 characters'),
});
export const newVendorDefaultValuesFunction = (data?: any) => {
  return {
    name: data?.name ?? '',
    assetType: data?.assetType ?? null,
    manufacturer: data?.manufacturer === '--' ? '' : data?.manufacturer ?? '',
    status: data?.status ?? null,
    modeOfProcurement: data?.modeOfProcurement ?? null,
    description: data?.description ?? '',
  };
};
export const newVendorDefaultValues = (data?: any) => {
  return {
    name: data?.name ?? '',
    contactName: data?.contactName ?? '',
    phone: data?.phone ?? '',
    mobile: data?.mobile ?? '',
    email: data?.email ?? '',
    description: data?.description ?? '',
    address: data?.address ?? '',
    country: data?.country ?? '',
    state: data?.state ?? '',
    city: data?.city ?? '',
    zipCode: data?.zipCode ?? '',
  };
};

export const newVendorDataArray = [
  {
    id: 1,
    componentProps: {
      name: 'name',
      label: 'Name',
      fullWidth: true,
      required: true,
    },

    component: RHFTextField,
    md: 12,
  },
  {
    id: 2,
    componentProps: {
      name: 'contactName',
      label: 'Contact Name',
      fullWidth: true,
    },

    component: RHFTextField,
    md: 12,
  },
  {
    id: 3,
    componentProps: {
      name: 'phone',
      label: 'Phone',
      fullWidth: true,
    },

    component: RHFTextField,
    md: 12,
  },
  {
    id: 4,
    componentProps: {
      name: 'mobile',
      label: 'Mobile',
      fullWidth: true,
    },

    component: RHFTextField,
    md: 12,
  },
  {
    id: 5,
    componentProps: {
      name: 'email',
      label: 'Email',
      fullWidth: true,
    },

    component: RHFTextField,
    md: 12,
  },
  {
    id: 6,
    componentProps: {
      name: 'description',
      label: 'Description',
      fullWidth: true,
      placeholder: 'Description',
      multiline: true,
      minRows: 3,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 7,
    componentProps: {
      name: 'address',
      label: 'Address',
      fullWidth: true,
      placeholder: 'Address',
      multiline: true,
      minRows: 3,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 8,
    componentProps: {
      name: 'country',
      label: 'Country',
      fullWidth: true,
    },

    component: RHFTextField,
    md: 12,
  },
  {
    id: 9,
    componentProps: {
      name: 'state',
      label: 'State',
      fullWidth: true,
    },

    component: RHFTextField,
    md: 12,
  },
  {
    id: 10,
    componentProps: {
      name: 'city',
      label: 'City',
      fullWidth: true,
    },

    component: RHFTextField,
    md: 12,
  },
  {
    id: 11,
    componentProps: {
      name: 'zipCode',
      label: 'ZipCode',
      fullWidth: true,
    },

    component: RHFTextField,
    md: 12,
  },
];
