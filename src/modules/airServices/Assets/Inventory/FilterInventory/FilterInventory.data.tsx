import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
} from '@/components/ReactHookForm';

import {
  assetLifeExpiryOptions,
  assetsImpactOptions,
  dateOptions,
} from '../Inventory.data';

export const inventoryFilterFormDefaultValues = (data: any) => {
  return {
    assetType: data?.assetType ?? null,
    usedBy: data?.usedBy ?? null,
    department: data?.department ?? null,
    locations: data?.locations ?? null,
    createdDate: data?.createdDate ?? null,
    updatedDate: data?.updatedDate ?? null,
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
      externalParams: { meta: false, limit: 50 },
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
    },
    component: RHFAutocompleteAsync,
  },
  {
    id: 3,
    componentProps: {
      fullWidth: true,
      name: 'department',
      label: 'Department',
      apiQuery: apiQueryDepartment,
    },
    component: RHFAutocompleteAsync,
  },
  {
    id: 4,
    componentProps: {
      fullWidth: true,
      name: 'locations',
      label: 'Locations',
      apiQuery: apiQueryLocation,
      getOptionLabel: (option: any) => option?.locationName,
    },
    component: RHFAutocompleteAsync,
  },
  {
    id: 5,
    componentProps: {
      fullWidth: true,
      name: 'createdDate',
      label: 'Created Date',
      placeholder: 'Select a time period',
      select: true,
      options: dateOptions,
      getOptionLabel: (option: any) => option?.label?.replaceAll?.('_', ' '),
    },
    component: RHFAutocomplete,
  },
  {
    id: 6,
    componentProps: {
      fullWidth: true,
      name: 'updatedDate',
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
      options: assetsImpactOptions,
      getOptionLabel: (option: any) => option?.label?.replaceAll?.('_', ' '),
    },
  },
  {
    id: 8,
    componentProps: {
      fullWidth: true,
      name: 'createdBy',
      label: 'Created By',
      apiQuery: apiQueryUsersCreatedBy,
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
      label: 'Asset Life Expire On',
      placeholder: 'Select a time period',
      select: true,
      options: assetLifeExpiryOptions,
      getOptionLabel: (option: any) => option?.label?.replaceAll?.('_', ' '),
    },
  },
];
