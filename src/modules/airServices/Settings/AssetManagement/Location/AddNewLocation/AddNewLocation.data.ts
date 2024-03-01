import * as yup from 'yup';
import { RHFTextField } from '@/components/ReactHookForm';
import { Typography } from '@mui/material';

export const validationSchemaAddNewLocation: any = yup?.object()?.shape({
  locationName: yup?.string()?.required('Required'),
  parentLocation: yup?.string(),
  contactName: yup?.string(),
  email: yup?.string(),
  phone: yup?.string(),
});

export const locationDefaultValues = ({
  editDataArray,
  childEditDataArray,
  parentLocationName,
}: any) => {
  return {
    locationName:
      childEditDataArray?.locationName ?? editDataArray?.locationName ?? '',
    parentLocation: parentLocationName,
    contactName:
      childEditDataArray?.contactName ?? editDataArray?.contactName ?? '',
    email: childEditDataArray?.email ?? editDataArray?.email ?? '',
    phone: childEditDataArray?.phone ?? editDataArray?.phone ?? '',
  };
};

export const addNewLocationDataFields = [
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
    md: 6,
  },
  {
    id: 2,
    gridLength: 6,
    componentProps: {
      fullWidth: true,
      disabled: true,
      name: 'parentLocation',
      label: 'Parent Location',
    },
    component: RHFTextField,
    md: 6,
  },
  {
    id: 3,
    componentProps: {
      fullWidth: true,
      name: 'contactName',
      label: 'Contact Name',
    },
    component: RHFTextField,
    gridLength: 6,
    md: 6,
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
    md: 6,
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
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: '1.875rem',
    },
    heading: 'Address',
    gridLength: 12,
    component: Typography,
  },
  {
    id: 7,
    componentProps: {
      fullWidth: true,
      name: 'addressLine1',
      label: 'Address Line 1',
    },
    gridLength: 6,
    md: 6,
    component: RHFTextField,
  },
  {
    id: 8,
    componentProps: {
      fullWidth: true,
      name: 'addressLine2',
      label: 'Address Line 2',
    },
    gridLength: 6,
    md: 6,
    component: RHFTextField,
  },
  {
    id: 9,
    componentProps: {
      fullWidth: true,
      name: 'city',
      label: 'City',
    },
    gridLength: 6,
    md: 6,
    component: RHFTextField,
  },
  {
    id: 10,
    componentProps: {
      fullWidth: true,
      name: 'country',
      label: 'Country',
    },
    component: RHFTextField,
    gridLength: 6,
    md: 6,
  },
  {
    id: 11,
    componentProps: {
      fullWidth: true,
      name: 'state',
      label: 'State',
    },
    component: RHFTextField,
    gridLength: 6,
    md: 6,
  },
  {
    id: 12,
    componentProps: {
      fullWidth: true,
      name: 'zipCode',
      label: 'Zip Code',
    },
    component: RHFTextField,
    gridLength: 6,
    md: 6,
  },
];
