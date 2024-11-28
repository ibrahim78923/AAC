import { RHFAutocomplete } from '@/components/ReactHookForm';
import {
  assetLifeExpiryOptions,
  assetsImpactOptions,
  dateOptions,
  updatedDateOptions,
} from '../Inventory.data';
import GetInventoryAllUsersAdminDropdown from '../InventoryFormFieldsDropdowns/GetInventoryAllUsersAdminDropdown';
import GetInventoryLocationDropdown from '../InventoryFormFieldsDropdowns/GetInventoryLocationDropdown';
import GetInventoryDepartmentDropdown from '../InventoryFormFieldsDropdowns/GetInventoryDepartmentDropdown';
import GetInventoryAllUsersDropdown from '../InventoryFormFieldsDropdowns/GetInventoryAllUsersDropdown';
import GetInventoryAssetsDropdown from '../InventoryFormFieldsDropdowns/GetInventoryAssetsDropdown';

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

export const inventoryFilterFormFieldsDataFunction = () => [
  {
    id: 1,
    component: GetInventoryAssetsDropdown,
  },
  {
    id: 2,
    component: GetInventoryAllUsersDropdown,
  },
  {
    id: 3,
    component: GetInventoryDepartmentDropdown,
    componentProps: { name: 'departmentId' },
  },
  {
    id: 4,
    component: GetInventoryLocationDropdown,
    componentProps: { name: 'locationId' },
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
      options: updatedDateOptions,
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
      options: assetsImpactOptions,
      placeholder: 'Select impact',
      getOptionLabel: (option: any) => option?.label,
    },
  },
  {
    id: 8,
    component: GetInventoryAllUsersAdminDropdown,
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
      options: assetLifeExpiryOptions,
      getOptionLabel: (option: any) => option?.label?.replaceAll?.('_', ' '),
    },
  },
];
