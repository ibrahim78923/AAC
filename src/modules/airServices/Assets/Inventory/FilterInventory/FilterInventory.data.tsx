import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
} from '@/components/ReactHookForm';

import {
  assetLifeExpiryOptions,
  assetsImpactFilterOptions,
  dateOptions,
} from '../Inventory.data';
import { PAGINATION } from '@/config';

export const inventoryFilterFormDefaultValues = (data: any) => {
  return {
    assetType: data?.assetType ?? null,
    usedBy: data?.usedBy ?? null,
    departmentId: data?.departmentId ?? null,
    locationId: data?.locationId ?? null,
    createdAt: data?.createdAt ?? null,
    updatedAt: data?.updatedAt ?? null,
    impact: data?.impact ?? null,
    createdBy: data?.createdBy ?? null,
    assetLifeExpiry: data?.assetLifeExpiry ?? null,
  };
};

export const inventoryFilterFormFieldsDataFunction = (
  apiQueryDepartment: any,
  apiQueryLocation: any,
  apiQueryUsedBy: any,
  apiQueryAssetType: any,
  apiQueryUsersCreatedBy: any,
) => [
  {
    id: 1,
    component: RHFAutocompleteAsync,
    componentProps: {
      fullWidth: true,
      name: 'assetType',
      label: 'Asset Type',
      placeholder: 'All Assets',
      apiQuery: apiQueryAssetType,
      externalParams: {
        meta: false,
        limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT,
      },
    },
  },
  {
    id: 2,
    componentProps: {
      fullWidth: true,
      name: 'usedBy',
      label: 'Used By',
      placeholder: 'Name or Email',
      apiQuery: apiQueryUsedBy,
      getOptionLabel: (option: any) =>
        `${option?.firstName} ${option?.lastName}`,
    },
    component: RHFAutocompleteAsync,
  },
  {
    id: 3,
    componentProps: {
      fullWidth: true,
      name: 'departmentId',
      label: 'Department',
      placeholder: 'Select department',
      apiQuery: apiQueryDepartment,
    },
    component: RHFAutocompleteAsync,
  },
  {
    id: 4,
    componentProps: {
      fullWidth: true,
      name: 'locationId',
      label: 'Locations',
      placeholder: 'Select location',
      apiQuery: apiQueryLocation,
      getOptionLabel: (option: any) => option?.locationName,
    },
    component: RHFAutocompleteAsync,
  },
  {
    id: 5,
    componentProps: {
      fullWidth: true,
      name: 'createdAt',
      label: 'Created Date',
      placeholder: 'Select a time period',
      options: dateOptions,
      getOptionLabel: (option: any) => option?.label?.replaceAll?.('_', ' '),
    },
    component: RHFAutocomplete,
  },
  {
    id: 6,
    componentProps: {
      fullWidth: true,
      name: 'updatedAt',
      label: 'Updated Date',
      placeholder: 'Select a time period',
      select: true,
      options: dateOptions,
      getOptionLabel: (option: any) => option?.label?.replaceAll?.('_', ' '),
    },
    component: RHFAutocomplete,
  },
  {
    id: 7,
    component: RHFAutocomplete,
    componentProps: {
      fullWidth: true,
      name: 'impact',
      label: 'Impact',
      select: true,
      options: assetsImpactFilterOptions,
      placeholder: 'Select impact',
      getOptionLabel: (option: any) => option?.label,
    },
  },
  {
    id: 8,
    componentProps: {
      fullWidth: true,
      name: 'createdBy',
      label: 'Created By',
      apiQuery: apiQueryUsersCreatedBy,
      placeholder: 'Select user',
      getOptionLabel: (option: any) =>
        `${option?.firstName} ${option?.lastName}`,
    },
    component: RHFAutocompleteAsync,
  },
  {
    id: 9,
    component: RHFAutocomplete,
    gridLength: 12,
    componentProps: {
      fullWidth: true,
      name: 'assetLifeExpiry',
      label: 'Expire date',
      placeholder: 'Select a time period',
      select: true,
      options: assetLifeExpiryOptions,
      getOptionLabel: (option: any) => option?.label?.replaceAll?.('_', ' '),
    },
  },
];
