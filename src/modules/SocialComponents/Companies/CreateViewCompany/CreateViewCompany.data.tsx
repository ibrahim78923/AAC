import {
  RHFDatePicker,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const validationSchema = Yup?.object()?.shape({
  accountName: Yup?.string()?.required('Field is Required'),
  phoneNo: Yup?.string()?.trim()?.required('Field is Required'),
  postCode: Yup?.string()?.trim()?.required('Field is Required'),
});

export const defaultValuesOrganization = {
  accountName: '',
  phoneNo: '',
  postCode: '',
  address: '',
  unit: '',
  buildingName: '',
  buildingNumber: '',
  streetName: '',
  city: '',
  country: '',
};

export const viewCompanyArr = [
  {
    componentProps: {
      name: 'name',
      label: 'Name',
      fullWidth: true,
      select: false,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'Industry',
      label: 'Industry',
      fullWidth: true,
      select: true,
    },
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'companyOwner',
      label: 'Company Owner',
      fullWidth: true,
      select: true,
    },
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'createdDate',
      label: 'Created Date',
      fullWidth: true,
      select: true,
    },
    component: RHFDatePicker,
    md: 12,
  },
];
