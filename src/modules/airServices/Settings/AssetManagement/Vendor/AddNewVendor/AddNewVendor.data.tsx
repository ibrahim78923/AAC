import { RHFTextField } from '@/components/ReactHookForm';
import {
  CHARACTERS_LIMIT,
  GLOBAL_CHARACTERS_LIMIT,
  REGEX,
} from '@/constants/validation';
import {
  dynamicFormInitialValue,
  dynamicFormValidationSchema,
} from '@/utils/dynamic-forms';
import * as Yup from 'yup';

export const newVendorValidationSchema = (form: any) => {
  const formSchema: any = dynamicFormValidationSchema(form);

  return Yup?.object()?.shape({
    name: Yup?.string()
      ?.trim()
      ?.required('Name is required')
      ?.max(
        GLOBAL_CHARACTERS_LIMIT?.NAME,
        `Maximum characters limit is ${GLOBAL_CHARACTERS_LIMIT?.NAME}`,
      ),
    contactName: Yup?.string()
      ?.trim()
      ?.max(
        GLOBAL_CHARACTERS_LIMIT?.NAME,
        `Maximum characters limit is ${GLOBAL_CHARACTERS_LIMIT?.NAME}`,
      ),
    phone: Yup?.string()
      ?.trim()
      ?.test('is-valid-phone', 'Only UK phone number', function (value) {
        if (value) {
          return REGEX?.PHONE_NUMBER?.test(value);
        }
        return true;
      }),
    mobiles: Yup?.string()
      ?.trim()
      ?.test('is-valid-phone', 'Only UK phone number', function (value) {
        if (value) {
          return REGEX?.PHONE_NUMBER?.test(value);
        }
        return true;
      }),
    email: Yup?.string()
      ?.trim()
      ?.max(
        GLOBAL_CHARACTERS_LIMIT?.EMAIL,
        `Maximum characters limit is ${GLOBAL_CHARACTERS_LIMIT?.EMAIL}`,
      )
      ?.email('Please provide valid email'),
    description: Yup?.string()
      ?.trim()
      ?.max(
        GLOBAL_CHARACTERS_LIMIT?.DESCRIPTION,
        `Maximum characters limit is ${GLOBAL_CHARACTERS_LIMIT?.DESCRIPTION}`,
      ),
    address: Yup?.string()
      ?.trim()
      ?.max(
        GLOBAL_CHARACTERS_LIMIT?.ADDRESS,
        `Maximum characters limit is ${GLOBAL_CHARACTERS_LIMIT?.ADDRESS}`,
      ),
    country: Yup?.string()
      ?.trim()
      ?.max(
        CHARACTERS_LIMIT?.SERVICES_SETTING_VENDOR_COUNTRY_MAX_CHARACTERS,
        `Maximum characters limit is ${CHARACTERS_LIMIT?.SERVICES_SETTING_VENDOR_COUNTRY_MAX_CHARACTERS}`,
      ),
    state: Yup?.string()
      ?.trim()
      ?.max(
        CHARACTERS_LIMIT?.SERVICES_SETTING_VENDOR_STATE_MAX_CHARACTERS,
        `Maximum characters limit is ${CHARACTERS_LIMIT?.SERVICES_SETTING_VENDOR_STATE_MAX_CHARACTERS}`,
      ),
    city: Yup?.string()
      ?.trim()
      ?.max(
        CHARACTERS_LIMIT?.SERVICES_SETTING_VENDOR_CITY_MAX_CHARACTERS,
        `Maximum characters limit is ${CHARACTERS_LIMIT?.SERVICES_SETTING_VENDOR_CITY_MAX_CHARACTERS}`,
      ),
    zipCode: Yup?.string()
      ?.trim()
      ?.max(
        CHARACTERS_LIMIT?.SERVICES_SETTING_VENDOR_ZIP_MAX_CHARACTERS,
        `Maximum characters limit is ${CHARACTERS_LIMIT?.SERVICES_SETTING_VENDOR_ZIP_MAX_CHARACTERS}`,
      ),
    ...formSchema,
  });
};
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

export const newVendorDefaultValues = (data?: any, form?: any) => {
  const initialValues: any = dynamicFormInitialValue(data, form);

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
    ...initialValues,
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
  },
  {
    id: 2,
    componentProps: {
      name: 'contactName',
      label: 'Contact Name',
      fullWidth: true,
    },
    component: RHFTextField,
  },
  {
    id: 3,
    componentProps: {
      name: 'phone',
      label: 'Phone',
      fullWidth: true,
    },
    component: RHFTextField,
  },
  {
    id: 4,
    componentProps: {
      name: 'mobile',
      label: 'Mobile',
      fullWidth: true,
    },
    component: RHFTextField,
  },
  {
    id: 5,
    componentProps: {
      name: 'email',
      label: 'Email',
      fullWidth: true,
    },
    component: RHFTextField,
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
  },
  {
    id: 8,
    componentProps: {
      name: 'country',
      label: 'Country',
      fullWidth: true,
    },
    component: RHFTextField,
  },
  {
    id: 9,
    componentProps: {
      name: 'state',
      label: 'State',
      fullWidth: true,
    },
    component: RHFTextField,
  },
  {
    id: 10,
    componentProps: {
      name: 'city',
      label: 'City',
      fullWidth: true,
    },
    component: RHFTextField,
  },
  {
    id: 11,
    componentProps: {
      name: 'zipCode',
      label: 'ZipCode',
      fullWidth: true,
    },
    component: RHFTextField,
  },
];
