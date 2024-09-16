import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFTextField,
} from '@/components/ReactHookForm';
import { COMPANITES_TYPE } from '@/constants';

import * as Yup from 'yup';

export const createComapnySchema = Yup?.object()?.shape({
  chooseCompany: Yup?.string()?.when(
    'companyType',
    ([company]: any, field: any) =>
      company !== COMPANITES_TYPE?.NEW_COMPANY
        ? field?.required('Field is required')
        : field?.optional(),
  ),
  domain: Yup?.string()?.when('companyType', ([company]: any, field: any) =>
    company === COMPANITES_TYPE?.NEW_COMPANY
      ? field?.required('Field is required')
      : field?.optional(),
  ),
  name: Yup?.string()?.when('companyType', ([company]: any, field: any) =>
    company === COMPANITES_TYPE?.NEW_COMPANY
      ? field?.required('Field is required')
      : field?.optional(),
  ),
  ownerId: Yup?.object()
    ?.nullable()
    ?.when('companyType', ([company]: any, field: any) =>
      company === COMPANITES_TYPE?.NEW_COMPANY
        ? field?.required('Field is required')
        : field?.optional(),
    ),
});

export const defaultCreateCompanyValues = {
  companyType: COMPANITES_TYPE?.NEW_COMPANY,
  domain: '',
  name: '',
  ownerId: null,
  industry: '',
  type: '',
  noOfEmloyee: null,
  totalRevenue: null,
  city: '',
  postalCode: '',
  address: '',
  description: '',
  linkedInUrl: '',
};

export const dataArray = (contacts: any) => {
  return [
    {
      componentProps: {
        name: 'domain',
        label: 'Company Domain Name (URL)',
        placeholder: 'Enter here',
        required: true,
        fullWidth: true,
        select: false,
      },
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'name',
        label: 'Company Name',
        placeholder: 'Company name',
        fullWidth: true,
        select: false,
        required: true,
      },
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'ownerId',
        label: 'Company Owner',
        placeholder: 'Select Owner',
        required: true,
        apiQuery: contacts,
        getOptionLabel: (option: any) =>
          `${option?.firstName} ${option?.lastName}`,
      },
      component: RHFAutocompleteAsync,
    },
    {
      componentProps: {
        name: 'industry',
        label: 'Industry',
        fullWidth: true,
        select: true,
        placeholder: 'Select Industry',
        options: [
          'Computer software',
          'Computer Services',
          'Construction',
          'None',
        ],
      },
      component: RHFAutocomplete,
      md: 12,
    },
    {
      componentProps: {
        name: 'type',
        label: 'Company Type',
        fullWidth: true,
        select: true,
        placeholder: 'Select Company type',
        options: ['Partner', 'Vendor', 'None'],
      },
      component: RHFAutocomplete,
      md: 12,
    },
    {
      componentProps: {
        name: 'noOfEmloyee',
        label: 'No of Employees',
        placeholder: 'Enter here',
        fullWidth: true,
        type: 'number',
      },
      md: 12,
      component: RHFTextField,
    },
    {
      md: 12,
      component: RHFTextField,
      componentProps: {
        name: 'totalRevenue',
        label: 'Total Revenue',
        placeholder: 'Enter here',
        fullWidth: true,
        type: 'number',
      },
    },
    {
      md: 12,
      component: RHFTextField,
      componentProps: {
        name: 'city',
        label: 'City',
        placeholder: 'Enter here',
        fullWidth: true,
      },
    },
    {
      md: 12,
      component: RHFTextField,
      componentProps: {
        name: 'postalCode',
        label: 'Postal Code',
        placeholder: 'Enter here',
        fullWidth: true,
      },
    },
    {
      md: 12,
      component: RHFTextField,
      componentProps: {
        name: 'address',
        label: 'Company Address',
        placeholder: 'Enter here',
        fullWidth: true,
        multiline: true,
        rows: 4,
      },
    },
    {
      md: 12,
      component: RHFTextField,
      componentProps: {
        name: 'description',
        label: 'Description',
        placeholder: 'Enter here',
        fullWidth: true,
        multiline: true,
        rows: 3,
      },
    },
    {
      md: 12,
      component: RHFTextField,
      componentProps: {
        name: 'linkedInUrl',
        label: 'LinkdIn Company Page',
        placeholder: 'Enter here',
        fullWidth: true,
      },
    },
  ];
};

export const companiesOptions = [
  {
    label: 'New Company',
    value: 'new-Company',
  },
  {
    label: 'Existing Company',
    value: 'existing-company',
  },
];
