import { RHFAutocomplete, RHFDatePicker } from '@/components/ReactHookForm';
import { UsersListDropdown } from '../ExportTabListDropdown/UserListDropdown';

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

export const filterFields = [
  {
    _id: 1,
    component: RHFAutocomplete,
    componentProps: {
      fullWidth: true,
      name: 'product',
      label: 'Product',
      placeholder: 'Product',
      options: productOptions,
    },
  },
  {
    _id: 2,
    component: UsersListDropdown,
  },
  {
    _id: 3,
    componentProps: {
      fullWidth: true,
      name: 'object',
      label: 'Object',
      options: objectOptions,
      placeholder: 'Object',
    },
    component: RHFAutocomplete,
  },
  {
    _id: 4,
    componentProps: {
      fullWidth: true,
      name: 'createdDate',
      label: 'Created Date',
    },
    component: RHFDatePicker,
  },
];
