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
    id: 2435,
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
    id: 6546,
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
    id: 5674,
    componentProps: {
      name: 'category',
      label: 'Category',
      fullWidth: true,
    },
    component: RHFTextField,
  },

  {
    id: 9877,
    componentProps: {
      name: 'publisher',
      label: 'Publisher',
      fullWidth: true,
    },
    component: RHFTextField,
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
  },
];
