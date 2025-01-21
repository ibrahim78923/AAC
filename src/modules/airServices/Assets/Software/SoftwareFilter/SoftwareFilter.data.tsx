import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';

import {
  softwareDateOptions,
  softwareStatusOptions,
  softwareTypeOptions,
} from '../Software.data';
import { SoftwareFilterValues } from './SoftwareFilter.interface';

export const softwareFilterDefaultValues = (
  filterValues: SoftwareFilterValues,
) => {
  return {
    type: filterValues?.type ?? null,
    status: filterValues?.status ?? null,
    category: filterValues?.category ?? '',
    publisher: filterValues?.publisher ?? '',
    createdDate: filterValues?.createdDate ?? null,
    updatedDate: filterValues?.updatedDate ?? null,
  };
};

export const softwareFilterDataArray = [
  {
    _id: 1,
    componentProps: {
      name: 'status',
      label: 'Status',
      fullWidth: true,
      options: softwareStatusOptions,
      placeholder: 'Select status',
    },
    component: RHFAutocomplete,
  },
  {
    _id: 2,
    componentProps: {
      name: 'type',
      label: 'Type',
      fullWidth: true,
      options: softwareTypeOptions,
      placeholder: 'Select type',
    },
    component: RHFAutocomplete,
  },

  {
    _id: 3,
    componentProps: {
      name: 'category',
      label: 'Category',
      placeholder: 'Enter Category',
      fullWidth: true,
    },
    component: RHFTextField,
  },

  {
    _id: 4,
    componentProps: {
      name: 'publisher',
      label: 'Publisher',
      placeholder: 'Enter Publisher',
      fullWidth: true,
    },
    component: RHFTextField,
  },

  {
    _id: 5,
    componentProps: {
      name: 'createdDate',
      label: 'Created Date',
      fullWidth: true,
      placeholder: 'Select a time period',
      options: softwareDateOptions,
    },
    component: RHFAutocomplete,
  },

  {
    _id: 6,
    componentProps: {
      name: 'updatedDate',
      label: 'Updated Date',
      fullWidth: true,
      placeholder: 'Select a time period',
      options: softwareDateOptions,
    },
    component: RHFAutocomplete,
  },
];
