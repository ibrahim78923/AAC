import * as Yup from 'yup';
import {
  RHFSelect,
  RHFTextField,
  RHFAutocompleteAsync,
} from '@/components/ReactHookForm';

export const companiesValidationSchema = Yup?.object()?.shape({
  domain: Yup?.string()?.required('Field is required'),
  ownerId: Yup?.string()?.required('Field is required'),
  name: Yup?.string()?.required('Field is required'),
});

export const companiesDefaultValues = {
  domain: '',
  noOfEmloyee: '',
  totalRevenue: '',
};

export const companiesDataArray = (
  companyOwners: any,
  disabledField: boolean,
) => [
  {
    id: 'domain',
    componentProps: {
      name: 'domain',
      label: 'Company Domain Name (URL)',
      fullWidth: true,
      disabled: disabledField,
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 'name',
    componentProps: {
      name: 'name',
      label: 'Company Name',
      fullWidth: true,
      disabled: disabledField,
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 'ownerId',
    componentProps: {
      name: 'ownerId',
      label: 'Company Owner',
      select: true,
      disabled: disabledField,
      required: true,
    },
    options: companyOwners,
    component: RHFSelect,
    md: 12,
  },

  {
    id: 'industry',
    componentProps: {
      name: 'industry',
      label: 'Industry',
      select: true,
      disabled: disabledField,
    },
    options: [
      { value: 'computerSoftware', label: 'Computer software' },
      { value: 'computerServices', label: 'Computer Services' },
      { value: 'construction', label: 'Construction' },
      { value: 'none', label: 'None' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    id: 'type',
    componentProps: {
      name: 'type',
      label: 'Company Type',
      fullWidth: true,
      select: true,
      disabled: disabledField,
    },
    options: [
      { value: 'Partner', label: 'Partner' },
      { value: 'Vendor', label: 'Vendor' },
      { value: 'None', label: 'None' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    id: 'noOfEmloyee',
    componentProps: {
      name: 'noOfEmloyee',
      label: 'Number of employee',
      fullWidth: true,
      disabled: disabledField,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 'totalRevenue',
    componentProps: {
      name: 'totalRevenue',
      label: 'Annual Revenue',
      fullWidth: true,
      disabled: disabledField,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 'city',
    componentProps: {
      name: 'city',
      label: 'City',
      fullWidth: true,
      disabled: disabledField,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 'postalCode',
    componentProps: {
      name: 'postalCode',
      label: 'Postal Code',
      fullWidth: true,
      disabled: disabledField,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 'address',
    md: 12,
    component: RHFTextField,
    componentProps: {
      name: 'address',
      label: 'Company Address',
      placeholder: 'Enter here',
      fullWidth: true,
      multiline: true,
      rows: 4,
      disabled: disabledField,
    },
  },
  {
    id: 'description',
    md: 12,
    component: RHFTextField,
    componentProps: {
      name: 'description',
      label: 'Description',
      placeholder: 'Enter here',
      fullWidth: true,
      multiline: true,
      rows: 3,
      disabled: disabledField,
    },
  },
  {
    id: 'linkedInUrl',
    md: 12,
    component: RHFTextField,
    componentProps: {
      name: 'linkedInUrl',
      label: 'LinkdIn Company Page',
      placeholder: 'Enter here',
      fullWidth: true,
      disabled: disabledField,
    },
  },
];

export const FORM_TYPE = {
  NEW_COMPANY: 'newCompany',
  EXISTING: 'existing',
};

export const existingCompanyValidationSchema = Yup?.object()?.shape({
  companyId: Yup?.mixed()?.nullable()?.required('Field is Required'),
});

export const existingCompanyDefaultValues = {
  companyId: null,
};

export const existingCompanyDataArray = (companiesList: any) => [
  {
    id: 'companyId',
    component: RHFAutocompleteAsync,
    md: 12,
    componentProps: {
      name: 'companyId',
      label: 'Select Company',
      placeholder: 'Select Company',
      apiQuery: companiesList,
      getOptionLabel: (option: any) => option?.name,
      externalParams: { meta: false },
      required: true,
    },
  },
];

export const DRAWER_TITLE = {
  VIEW: 'View',
  ADD: 'Add',
};
