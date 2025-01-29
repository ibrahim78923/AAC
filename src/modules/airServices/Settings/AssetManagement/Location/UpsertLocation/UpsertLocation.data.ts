import * as yup from 'yup';
import { RHFTextField } from '@/components/ReactHookForm';
import { Typography } from '@mui/material';
import {
  CHARACTERS_LIMIT,
  GLOBAL_CHARACTERS_LIMIT,
  REGEX,
} from '@/constants/validation';

export const LOCATION_TYPE = {
  PARENT: 'parent',
  CHILD: 'child',
};

export const UPSERT_LOCATION_TITLE = {
  EDIT_CHILD_LOCATION: 'Edit child location',
  EDIT_LOCATION: 'Edit location',
};

export const validationSchemaAddNewLocation = yup?.object()?.shape({
  locationName: yup?.string()?.trim()?.required('Location name is required'),
  contactName: yup
    ?.string()
    ?.trim()
    ?.max(
      CHARACTERS_LIMIT?.SERVICES_SETTING_LOCATION_NAME_MAX_CHARACTERS,
      `Maximum characters limit is ${CHARACTERS_LIMIT?.SERVICES_SETTING_LOCATION_NAME_MAX_CHARACTERS}`,
    ),
  email: yup
    ?.string()
    ?.trim()
    ?.max(
      GLOBAL_CHARACTERS_LIMIT?.EMAIL,
      `Maximum characters limit is ${GLOBAL_CHARACTERS_LIMIT?.EMAIL}`,
    )
    ?.email('Please provide valid email'),
  phone: yup
    ?.string()
    ?.trim()
    ?.test('is-valid-phone', 'Only UK phone number', function (value) {
      if (value) {
        return REGEX?.PHONE_NUMBER?.test(value);
      }
      return true;
    }),
  address: yup?.object()?.shape({
    addressLine1: yup
      ?.string()
      ?.trim()
      ?.max(
        CHARACTERS_LIMIT?.SERVICES_SETTING_LOCATION_ADDRESS_LINE_MAX_CHARACTERS,
        `Maximum characters limit is ${CHARACTERS_LIMIT?.SERVICES_SETTING_LOCATION_ADDRESS_LINE_MAX_CHARACTERS}`,
      ),
    addressLine2: yup
      ?.string()
      ?.trim()
      ?.max(
        CHARACTERS_LIMIT?.SERVICES_SETTING_LOCATION_ADDRESS_LINE_MAX_CHARACTERS,
        `Maximum characters limit is ${CHARACTERS_LIMIT?.SERVICES_SETTING_LOCATION_ADDRESS_LINE_MAX_CHARACTERS}`,
      ),
    city: yup
      ?.string()
      ?.trim()
      ?.max(
        CHARACTERS_LIMIT?.SERVICES_SETTING_LOCATION_CITY_MAX_CHARACTERS,
        `Maximum characters limit is ${CHARACTERS_LIMIT?.SERVICES_SETTING_LOCATION_CITY_MAX_CHARACTERS}`,
      ),
    country: yup
      ?.string()
      ?.trim()
      ?.max(
        CHARACTERS_LIMIT?.SERVICES_SETTING_LOCATION_COUNTRY_MAX_CHARACTERS,
        `Maximum characters limit is ${CHARACTERS_LIMIT?.SERVICES_SETTING_LOCATION_COUNTRY_MAX_CHARACTERS}`,
      ),
    state: yup
      ?.string()
      ?.trim()
      ?.max(
        CHARACTERS_LIMIT?.SERVICES_SETTING_LOCATION_STATE_MAX_CHARACTERS,
        `Maximum characters limit is ${CHARACTERS_LIMIT?.SERVICES_SETTING_LOCATION_STATE_MAX_CHARACTERS}`,
      ),
    zipCode: yup
      ?.string()
      ?.trim()
      ?.max(
        CHARACTERS_LIMIT?.SERVICES_SETTING_LOCATION_ZIP_MAX_CHARACTERS,
        `Maximum characters limit is ${CHARACTERS_LIMIT?.SERVICES_SETTING_LOCATION_ZIP_MAX_CHARACTERS}`,
      ),
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
    _id: 1,
    md: 6,
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
          _id: 2,
          md: 6,
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
    _id: 3,
    componentProps: {
      fullWidth: true,
      name: 'contactName',
      label: 'Contact Name',
    },
    component: RHFTextField,
    md: 6,
  },
  {
    _id: 4,
    md: 6,
    componentProps: {
      fullWidth: true,
      name: 'email',
      label: 'Email',
    },
    component: RHFTextField,
  },
  {
    _id: 5,
    componentProps: {
      fullWidth: true,
      name: 'phone',
      label: 'Phone',
    },
    component: RHFTextField,
    md: 6,
  },
  {
    _id: 6,
    componentProps: {
      variant: 'h4',
      fontWeight: 600,
    },
    heading: 'Address',
    md: 12,
    component: Typography,
  },
  {
    _id: 7,
    componentProps: {
      fullWidth: true,
      name: 'address.addressLine1',
      label: 'Address Line 1',
    },
    md: 6,
    component: RHFTextField,
  },
  {
    _id: 8,
    componentProps: {
      fullWidth: true,
      name: 'address.addressLine2',
      label: 'Address Line 2',
    },
    md: 6,
    component: RHFTextField,
  },
  {
    _id: 9,
    componentProps: {
      fullWidth: true,
      name: 'address.city',
      label: 'City',
    },
    md: 6,
    component: RHFTextField,
  },
  {
    _id: 10,
    componentProps: {
      fullWidth: true,
      name: 'address.country',
      label: 'Country',
    },
    component: RHFTextField,
    md: 6,
  },
  {
    _id: 11,
    componentProps: {
      fullWidth: true,
      name: 'address.state',
      label: 'State',
    },
    component: RHFTextField,
    md: 6,
  },
  {
    _id: 12,
    componentProps: {
      fullWidth: true,
      name: 'address.zipCode',
      label: 'Zip Code',
    },
    component: RHFTextField,
    md: 6,
  },
];
