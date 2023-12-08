import {
  RHFDatePicker,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const validationSchema = Yup?.object()?.shape({
  name: Yup?.string()?.required('Field is Required'),
  industry: Yup?.string()?.trim()?.required('Field is Required'),
  companyOwner: Yup?.string()?.trim()?.required('Field is Required'),
  createdDate: Yup?.string()?.trim()?.required('Field is Required'),
});

export const defaultValuesOrganization = {
  name: '',
  industry: '',
  companyOwner: '',
  createdDate: '',
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
      name: 'industry',
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
