import {
  RHFAutocompleteAsync,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';

import * as Yup from 'yup';
import { isNullOrEmpty } from '@/utils';
import {
  dynamicFormInitialValue,
  dynamicFormValidationSchema,
} from '@/utils/dynamic-forms';
const phoneRegex = /^\+\d{1,3}[-.\s]?\d{10,}$/;
export const createComapnySchema = (form: any) => {
  const formSchema: any = dynamicFormValidationSchema(form);

  return Yup?.object()?.shape({
    domain: Yup?.string()?.required('Field is Required'),
    name: Yup?.string()?.required('Field is Required'),
    totalRevenue: Yup?.number(),
    noOfEmloyee: Yup?.number(),
    ownerId: Yup?.object()?.required('Field is Required'),
    phone: Yup.string()
      .nullable()
      .test(
        'isValidPhoneNumber',
        'Phone number is not valid',
        (value) => !value || phoneRegex.test(value),
      ),
    ...formSchema,
  });
};

export const defaultCreateCompanyValues = (data?: any, form?: any) => {
  const initialValues: any = dynamicFormInitialValue(data, form);

  return {
    domain: '',
    name: '',
    ownerId: null,
    industry: '',
    type: '',
    noOfEmloyee: 0,
    totalRevenue: 0,
    city: '',
    phone: null,
    postalCode: '',
    address: '',
    description: '',
    linkedInUrl: '',
    ...initialValues,
  };
};

export const dataArray = (getCompanyContactsList: any) => {
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
        externalParams: { page: 1, limit: 100 },
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
        name: 'phone',
        label: 'phone Number',
        placeholder: '+44-------',
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
