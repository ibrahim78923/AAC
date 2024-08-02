import {
  RHFAutocompleteAsync,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';

import * as Yup from 'yup';
import { getSession, isNullOrEmpty } from '@/utils';

export const createComapnySchema = Yup?.object()?.shape({
  domain: Yup?.string()?.required('Field is Required'),
  name: Yup?.string()?.required('Field is Required'),
  totalRevenue: Yup?.number(),
  noOfEmloyee: Yup?.number(),
  ownerId: Yup?.string()?.required('Field is Required'),
});

export const defaultCreateCompanyValues = {
  domain: '',
  name: '',
  ownerId: null,
  industry: '',
  type: '',
  noOfEmloyee: 0,
  totalRevenue: 0,
  city: '',
  postalCode: '',
  address: '',
  description: '',
  linkedInUrl: '',
};

export const dataArray = (getCompanyContactsList: any) => {
  const { user } = getSession();

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
        placeholder: 'Select company owner',
        name: 'ownerId',
        label: 'Company Owner',
        required: true,
        apiQuery: getCompanyContactsList,
        getOptionLabel: (option: any) =>
          isNullOrEmpty(option?.firstName)
            ? `${option?.email}`
            : `${option?.firstName} ${option?.lastName}`,
        externalParams: { page: 1, limit: 100, contactOwnerId: user?._id },
        queryKey: 'contactOwnerId',
      },
      component: RHFAutocompleteAsync,
      md: 12,
    },
    {
      componentProps: {
        name: 'industry',
        label: 'Industry',
        fullWidth: true,
        select: true,
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
      componentProps: {
        name: 'type',
        label: 'Company Type',
        fullWidth: true,
        select: true,
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
      componentProps: {
        name: 'noOfEmloyee',
        label: 'No of Employees',
        placeholder: 'Enter here',
        fullWidth: true,
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
        label: 'LinkedIn Company Page',
        placeholder: 'Enter here',
        fullWidth: true,
      },
    },
  ];
};
