import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDatePicker,
} from '@/components/ReactHookForm';
import { UsersDropdownOptionsI } from './Filter.interface';

export const productOptions = [
  'SALES',
  'MARKETING',
  'SERVICES',
  'OPERATIONS',
  'LOYALTY_PROGRAM',
];

export const objectOptions = [
  'TICKET',
  'MANAGE_PORTAL',
  'ARTICLES',
  'CONTRACTS',
  'SETTINGS',
  'ASSETS',
  'CONTACT',
  'DEPARTMENTS',
  'QUOTE',
  'EMAILS',
  'PHYSICAL_REWARDS',
  'DIGITAL_REWARDS',
  'ROLES_AND_TIERS',
  'COMPANIES',
  'LOYALTY_SHOPS',
  'REPORTS',
];

export const defaultValues = (filterValues: any) => {
  return {
    product: filterValues?.product ?? null,
    user: filterValues?.user ?? null,
    object: filterValues?.object ?? null,
    createdDate: filterValues?.createdDate ?? null,
  };
};

export const filterFields = (userList: any) => [
  {
    id: 2,
    component: RHFAutocomplete,
    gridLength: 12,
    componentProps: {
      fullWidth: true,
      name: 'product',
      label: 'Product',
      placeholder: 'Product',
      options: productOptions,
    },
  },
  {
    id: 920,
    componentProps: {
      name: 'user',
      label: 'User',
      fullWidth: true,
      placeholder: 'User',
      apiQuery: userList,
      getOptionLabel: (option: UsersDropdownOptionsI) =>
        `${option?.firstName} ${option?.lastName}`,
    },
    gridLength: 12,
    component: RHFAutocompleteAsync,
  },
  {
    id: 4575,
    componentProps: {
      fullWidth: true,
      name: 'object',
      label: 'Object',
      options: objectOptions,
      placeholder: 'Object',
    },
    gridLength: 12,
    component: RHFAutocomplete,
  },
  {
    id: 150,
    componentProps: {
      fullWidth: true,
      name: 'createdDate',
      label: 'Created Date',
    },
    gridLength: 12,
    component: RHFDatePicker,
  },
];
