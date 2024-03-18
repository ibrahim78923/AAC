import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';

import {
  softwareDateOptions,
  softwareStatusOptions,
  softwareTypeOptions,
} from '../Software.data';

export const softwareFilterDefaultValues = (filterValues: any) => {
  return {
    type: filterValues?.type,
    status: filterValues?.status,
    category: filterValues?.category,
    publisher: filterValues?.publisher,
    createdDate: filterValues?.createdDate,
    updatedDate: filterValues?.updatedDate,
  };
};

export const softwareFilterDataArray = [
  {
    id: 2435,
    componentProps: {
      name: 'status',
      label: 'Status',
      fullWidth: true,
      options: softwareStatusOptions,
    },
    component: RHFAutocomplete,
    md: 12,
  },
  {
    id: 6546,
    componentProps: {
      name: 'type',
      label: 'Type',
      fullWidth: true,
      options: softwareTypeOptions,
    },
    component: RHFAutocomplete,
    md: 12,
  },

  {
    id: 5674,
    componentProps: {
      name: 'category',
      label: 'Category',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },

  {
    id: 9877,
    componentProps: {
      name: 'publisher',
      label: 'Publisher',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },

  {
    id: 6566,
    componentProps: {
      name: 'createdDate',
      label: 'Created Date',
      fullWidth: true,
      placeholder: 'Select a time period',
      options: softwareDateOptions,
    },
    component: RHFAutocomplete,
    md: 12,
  },

  {
    id: 6785,
    componentProps: {
      name: 'updatedDate',
      label: 'Updated Date',
      fullWidth: true,
      placeholder: 'Select a time period',
      options: softwareDateOptions,
    },
    component: RHFAutocomplete,
    md: 12,
  },
];
