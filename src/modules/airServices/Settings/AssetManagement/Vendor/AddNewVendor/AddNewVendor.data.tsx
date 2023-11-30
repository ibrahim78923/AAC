import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const newVendorValidationSchema = Yup?.object()?.shape({
  name: Yup?.string()?.required(),
  contactNumber: Yup?.string(),
  phone: Yup?.string(),
  mobiles: Yup?.string(),
  email: Yup?.string(),
  description: Yup?.string(),
  address: Yup?.string(),
  country: Yup?.string(),
  state: Yup?.string(),
  city: Yup?.string(),
  zipCode: Yup?.string(),
});

export const newVendorDefaultValues = {
  name: '',
  contactNumber: '',
  phone: '',
  mobile: '',
  email: '',
  description: '',
  address: '',
  country: '',
  state: '',
  city: '',
  zipCode: '',
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
      name: 'contactNumber',
      label: 'Contact Number',
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
