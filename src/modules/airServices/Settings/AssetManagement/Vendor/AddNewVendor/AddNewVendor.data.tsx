import { RHFTextField } from '@/components/ReactHookForm';
import { VALIDATION_CONSTANT } from '@/constants';
import { ARRAY_INDEX } from '@/constants/strings';
import { FIELDS_CONSTANTS } from '@/utils/dynamic-forms';
import * as Yup from 'yup';

export const newVendorValidationSchema = (form: any) => {
  const formSchema: any = form
    ?.map((item: any) => {
      let schema;

      if (
        item?.component === FIELDS_CONSTANTS?.RHFMULTICHECKBOX ||
        item?.component === FIELDS_CONSTANTS?.RHFAUTOCOMPLETE
      ) {
        schema = Yup?.array()?.min(1, 'At least 1 Required');
      } else if (item?.component === FIELDS_CONSTANTS?.RHFDATEPICKER) {
        schema = Yup?.date()?.nullable();
      } else if (item?.component === FIELDS_CONSTANTS?.RHFDROPZONE) {
        schema = Yup?.mixed()?.nullable();
      } else {
        schema = Yup?.string();
      }

      return item?.componentProps?.required
        ? {
            [item?.componentProps?.label]: schema?.required(
              `${item?.componentProps?.label} is Required`,
            ),
          }
        : null;
    })
    ?.filter((val: any) => val !== null)
    ?.reduce((acc: any, obj: any) => {
      const key: any = Object?.keys(obj)[ARRAY_INDEX?.ZERO];
      const value = obj[key];
      acc[key] = value;
      return acc;
    }, {});

  return Yup?.object()?.shape({
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
  const initialValues: any = form
    ?.map((item: any) => {
      let initialValue: string | boolean | string[] | null | any;
      const key = item?.componentProps?.label;

      if (item?.component === FIELDS_CONSTANTS?.RHFMULTICHECKBOX) {
        initialValue = data?.customFields?.[key] ?? [];
      } else if (
        item?.component === FIELDS_CONSTANTS?.RHFDROPZONE ||
        item?.component === FIELDS_CONSTANTS?.RHFAUTOCOMPLETE
      ) {
        initialValue = data?.customFields?.[key] ?? null;
      } else if (item?.component === FIELDS_CONSTANTS?.RHFDATEPICKER) {
        initialValue = new Date(data?.customFields?.[key]) ?? null;
      } else {
        initialValue = data?.customFields?.[key] ?? '';
      }
      return { [key]: initialValue };
    })
    ?.filter(
      (item: any) => Object.keys(item)[ARRAY_INDEX?.ZERO] !== 'undefined',
    )
    ?.reduce((acc: any, obj: any) => {
      const key: any = Object?.keys(obj)[ARRAY_INDEX?.ZERO];
      const value = obj[key];
      acc[key] = value;
      return acc;
    }, {});

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
