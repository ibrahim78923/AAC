import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFTextField,
} from '@/components/ReactHookForm';

import {
  assetLifeExpiryOptions,
  assetTypeOptions,
  assetsImpactOptions,
  dateOptions,
} from '../Inventory.data';

export const dropdownDummy = [
  {
    value: 'option1',
    label: 'Option 1',
  },
  {
    value: 'option2',
    label: 'Option 2',
  },
];

export const inventoryFilterFormDefaultValues = (data: any) => {
  return {
    assetType: data?.assetType ?? null,
    usedBy: data?.usedBy ?? null,
    department: data?.department ?? null,
    locations: data?.locations ?? null,
    createdDate: data?.createdDate ?? null,
    updatedDate: data?.updatedDate ?? null,
    impact: data?.impact ?? null,
    createdBy: data?.createdBy ?? '',
    assetLifeExpiry: data?.assetLifeExpiry ?? null,
  };
};
export const inventoryFilterFormFieldsDataFunction = (
  apiQueryDepartment: any,
  apiQueryLocation: any,
  apiQueryUsedBy: any,
) => [
  {
    id: 1,
    component: RHFAutocomplete,
    componentProps: {
      fullWidth: true,
      name: 'assetType',
      label: 'Asset Type',
      select: true,
      options: assetTypeOptions,
    },
  },
  {
    id: 2,
    componentProps: {
      fullWidth: true,
      name: 'usedBy',
      label: 'Used By',
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
    },
    component: RHFAutocompleteAsync,
  },
  {
    id: 5,
    componentProps: {
      fullWidth: true,
      name: 'createdDate',
      label: 'Created Date',
      select: true,
      options: dateOptions,
    },
    component: RHFAutocomplete,
  },
  {
    id: 6,
    componentProps: {
      fullWidth: true,
      name: 'updatedDate',
      label: 'Updated Date',
      select: true,
      options: dateOptions,
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
    },
  },
  {
    id: 8,
    componentProps: {
      fullWidth: true,
      name: 'createdBy',
      label: 'Created By',
    },
    gridLength: 12,
    component: RHFTextField,
  },
  {
    id: 9,
    component: RHFAutocomplete,
    gridLength: 12,
    componentProps: {
      fullWidth: true,
      name: 'assetLifeExpiry',
      label: 'Asset Life Expire On',
      select: true,
      options: assetLifeExpiryOptions,
    },
  },
];
