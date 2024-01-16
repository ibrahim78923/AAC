import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

import { ASSET_IMPACT } from '@/constants/strings';
import { TextField } from '@mui/material';

export const assetsImpactOptions = [
  ASSET_IMPACT?.LOW,
  ASSET_IMPACT?.MEDIUM,
  ASSET_IMPACT?.HIGH,
];
export const addInventoryValidationSchemaOne = Yup?.object()?.shape({
  // description: Yup?.string()?.required('Field is Required'),
  displayName: Yup?.string()?.required('Field is Required'),
  impact: Yup?.string(),
});
export const addInventoryValidationSchemaUpdate = Yup?.object()?.shape({
  allAssets: Yup?.mixed()?.nullable(),
});
export const addToInventoryItemStatusValidationSchema = Yup?.object()?.shape({
  assetName: Yup?.string()?.required('Field is Required'),
  serialNumber: Yup?.string(),
  assetTag: Yup?.string(),
});
export const addInventoryDefaultValuesFunction = (data?: any) => {
  return {
    displayName: data?.displayName ?? '',
    impact: data?.impact ?? '',
    location: data?.location?._id ?? null,
    department: data?.department?._id ?? null,
  };
};

export const addInventoryDefaultValuesOneUpdate = {
  // allAssets: null,
};
export const addToInventoryItemStatusDefaultValuesFunction = () => {
  return {
    assetName: '',
    serialNumber: '',
    assetTag: '',
  };
};

export const addToInventoryItemAddedFormFieldsDataFunction = (
  apiQueryDepartment: any,
  apiQueryLocations: any,
  // apiQueryAssociateAsset: any,
) => [
  {
    id: 1,
    componentProps: {
      name: 'displayName',
      label: 'Asset Name Prefix',
      fullWidth: true,
    },
    toShow: 'Yes',
    component: RHFTextField,
    md: 12,
  },
  {
    id: 2,
    componentProps: {
      name: 'impact',
      label: 'Impact',
      fullWidth: true,
      placeholder: 'Choose Impact',
      options: assetsImpactOptions,
    },
    toShow: 'Yes',
    component: RHFAutocomplete,
    md: 12,
  },
  {
    id: 3,
    componentProps: {
      fullWidth: true,
      name: 'department',
      label: 'Department',
      placeholder: 'Select department',
      apiQuery: apiQueryDepartment,
    },
    toShow: 'Yes',
    component: RHFAutocompleteAsync,
  },
  {
    id: 4,
    componentProps: {
      fullWidth: true,
      name: 'location',
      label: 'Locations',
      placeholder: 'Select location',
      apiQuery: apiQueryLocations,
      getOptionLabel: (option: any) => option?.locationName,
    },
    toShow: 'Yes',
    component: RHFAutocompleteAsync,
  },
];

export const purchasedOrderColumns: any = () => [
  {
    accessorFn: (row: any) => row?.displayName,
    id: 'displayName',
    header: 'Item Name',
    cell: (info: any) => (
      <TextField
        value={info?.getValue()}
        // onChange={(e) => setReceivedAmount(e.target.value)}
        size="medium"
      />
    ),
  },
  {
    accessorFn: (row: any) => row?.impact,
    id: 'impact',
    header: 'Impact',
    cell: (info: any) => (
      <TextField
        value={info?.getValue()}
        // onChange={(e) => setReceivedAmount(e.target.value)}
        size="medium"
      />
    ),
  },

  {
    accessorFn: (row: any) => row?.department?.name,
    id: 'department',
    header: 'Department',
    cell: (info: any) => (
      <TextField
        value={info?.getValue()}
        // onChange={(e) => setReceivedAmount(e.target.value)}
        size="medium"
      />
    ),
  },
  {
    accessorFn: (row: any) => row?.location?.locationName,
    id: 'location',
    header: 'Location',
    cell: (info: any) => (
      <TextField
        value={info?.getValue()}
        // onChange={(e) => setReceivedAmount(e.target.value)}
        size="medium"
      />
    ),
  },
];
