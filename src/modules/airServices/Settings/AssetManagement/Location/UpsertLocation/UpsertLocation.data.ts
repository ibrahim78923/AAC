import * as yup from 'yup';
import { RHFTextField } from '@/components/ReactHookForm';
import { Typography } from '@mui/material';
import { VALIDATION_CONSTANT } from '@/constants';

export const LOCATION_TYPE = {
  PARENT: 'parent',
  CHILD: 'child',
};

export const validationSchemaAddNewLocation = yup?.object()?.shape({
  locationName: yup?.string()?.trim()?.required('Location name is required'),
  contactName: yup
    ?.string()
    ?.trim()
    ?.max(30, 'Contact Name up to 30 characters'),
  email: yup?.string()?.trim()?.email('Please provide valid email'),
  phone: yup
    ?.string()
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
  address: yup?.object()?.shape({
    addressLine1: yup
      ?.string()
      ?.trim()
      ?.max(500, 'Address up to 500 characters'),
    addressLine2: yup
      ?.string()
      ?.trim()
      ?.max(500, 'Address Name up to 500 characters'),
    city: yup?.string()?.trim()?.max(30, 'City up to 30 characters'),
    country: yup?.string()?.trim()?.max(30, 'Country up to 30 characters'),
    state: yup?.string()?.trim()?.max(30, 'State up to 30 characters'),
    zipCode: yup?.string()?.trim()?.max(30, 'Zip Code up to 30 characters'),
  }),
});

export const locationFormDefaultValues = {
  locationName: '',
  contactName: '',
  email: '',
  phone: '',
  address: {
    addressLine1: '',
    addressLine2: '',
    city: '',
    country: '',
    state: '',
    zipCode: '',
  },
};

export const locationDefaultValues: any = (
  locationData?: any,
  queryParams?: any,
) => {
  if (
    queryParams?.type === LOCATION_TYPE?.CHILD &&
    !!queryParams?.parentId &&
    !!!queryParams?.childId
  )
    return {
      parentLocation: locationData?.locationName ?? '',
      ...locationFormDefaultValues,
    };
  return {
    locationName: locationData?.locationName ?? '',
    parentLocation: locationData?.parentLocation ?? '',
    contactName: locationData?.contactName ?? '',
    email: locationData?.email ?? '',
    phone: locationData?.phone ?? '',
    address: {
      addressLine1: locationData?.address?.addressLine1 ?? '',
      addressLine2: locationData?.address?.addressLine2 ?? '',
      city: locationData?.address?.city ?? '',
      country: locationData?.address?.country ?? '',
      state: locationData?.address?.state ?? '',
      zipCode: locationData?.address?.zipCode ?? '',
    },
  };
};

export const addNewLocationDataFields = (type: string) => [
  {
    id: 1,
    gridLength: 6,
    componentProps: {
      fullWidth: true,
      name: 'locationName',
      label: 'Location Name',
      required: true,
    },
    component: RHFTextField,
  },
  ...(type === LOCATION_TYPE?.CHILD
    ? [
        {
          id: 2,
          gridLength: 6,
          componentProps: {
            fullWidth: true,
            disabled: type === LOCATION_TYPE?.CHILD,
            name: 'parentLocation',
            label: 'Parent Location',
          },
          component: RHFTextField,
        },
      ]
    : []),
  {
    id: 3,
    componentProps: {
      fullWidth: true,
      name: 'contactName',
      label: 'Contact Name',
    },
    component: RHFTextField,
    gridLength: 6,
  },
  {
    id: 4,
    gridLength: 6,
    componentProps: {
      fullWidth: true,
      name: 'email',
      label: 'Email',
    },
    component: RHFTextField,
  },
  {
    id: 5,
    componentProps: {
      fullWidth: true,
      name: 'phone',
      label: 'Phone',
    },
    component: RHFTextField,
    gridLength: 6,
  },
  {
    id: 6,
    componentProps: {
      variant: 'h4',
      fontWeight: 600,
    },
    heading: 'Address',
    gridLength: 12,
    component: Typography,
  },
  {
    id: 7,
    componentProps: {
      fullWidth: true,
      name: 'address.addressLine1',
      label: 'Address Line 1',
    },
    gridLength: 6,
    component: RHFTextField,
  },
  {
    id: 8,
    componentProps: {
      fullWidth: true,
      name: 'address.addressLine2',
      label: 'Address Line 2',
    },
    gridLength: 6,
    component: RHFTextField,
  },
  {
    id: 9,
    componentProps: {
      fullWidth: true,
      name: 'address.city',
      label: 'City',
    },
    gridLength: 6,
    component: RHFTextField,
  },
  {
    id: 10,
    componentProps: {
      fullWidth: true,
      name: 'address.country',
      label: 'Country',
    },
    component: RHFTextField,
    gridLength: 6,
  },
  {
    id: 11,
    componentProps: {
      fullWidth: true,
      name: 'address.state',
      label: 'State',
    },
    component: RHFTextField,
    gridLength: 6,
  },
  {
    id: 12,
    componentProps: {
      fullWidth: true,
      name: 'address.zipCode',
      label: 'Zip Code',
    },
    component: RHFTextField,
    gridLength: 6,
  },
];
