import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';
import { pxToRem } from '@/utils/getFontValue';
import { optionsIndustry, optionsType } from '../Companies.data';

export const getDefaultValues = (data: any) => {
  return {
    domain: data?.domain ?? '',
    name: data?.name ?? '',
    ownerId: data?.companyOwner ?? null,
    description: data?.description ?? '',
    industry: data?.industry ?? null,
    type: data?.type ?? null,
    city: data?.city ?? '',
    postalCode: data?.postalCode ?? '',
    address: data?.address ?? '',
    noOfEmloyee: data?.noOfEmloyee ?? null,
    totalRevenue: data?.totalRevenue ?? null,
    linkedInUrl: data?.linkedInUrl ?? '',
  };
};

export const getFormFields = ({ contactOwner }: any) => [
  {
    id: 1,
    componentProps: {
      name: 'domain',
      label: 'Company Domain Name (URL)',
      placeholder: 'domain.com',
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 2,
    componentProps: {
      name: 'name',
      label: 'Company Name',
      placeholder: 'OneCareMedia',
    },
    component: RHFTextField,
  },
  { id: 3 },
  {
    id: 4,
    componentProps: {
      name: 'ownerId',
      label: 'Contact Owner',
      placeholder: 'Select Owner',
      apiQuery: contactOwner,
      required: true,
    },
    component: RHFAutocompleteAsync,
  },
  {
    id: 5,
    componentProps: {
      name: 'description',
      label: 'Description',
      placeholder: 'Description',
      style: { height: pxToRem(200) },
    },
    component: RHFEditor,
  },
  {
    id: 6,
    componentProps: {
      name: 'industry',
      label: 'Industry',
      placeholder: 'Industry',
      options: optionsIndustry,
    },
    component: RHFAutocomplete,
  },
  {
    id: 7,
    componentProps: {
      name: 'type',
      label: 'Type',
      placeholder: 'Type',
      options: optionsType,
    },
    component: RHFAutocomplete,
  },
  {
    id: 8,
    componentProps: {
      name: 'city',
      label: 'City',
      placeholder: 'City',
    },
    component: RHFTextField,
  },
  {
    id: 9,
    componentProps: {
      name: 'postalCode',
      label: 'Postal Code',
      placeholder: 'Postal Code',
    },
    component: RHFTextField,
  },
  {
    id: 10,
    componentProps: {
      name: 'address',
      label: 'Address',
      placeholder: 'Address',
    },
    component: RHFTextField,
  },
  {
    id: 11,
    componentProps: {
      name: 'noOfEmloyee',
      label: 'No Of Employees',
      placeholder: 'No Of Employees',
    },
    component: RHFTextField,
  },
  {
    id: 12,
    componentProps: {
      name: 'totalRevenue',
      label: 'Annual Revenue (£)',
      placeholder: '£ 1,000',
    },
    component: RHFTextField,
  },
  {
    id: 13,
    componentProps: {
      name: 'linkedInUrl',
      label: 'LinkedIn Company URL',
      placeholder: 'https://www.linkedin.com/',
    },
    component: RHFTextField,
  },
];
