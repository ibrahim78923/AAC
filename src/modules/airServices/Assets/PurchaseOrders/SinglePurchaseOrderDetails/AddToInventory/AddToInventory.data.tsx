import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

import { ASSET_IMPACT } from '@/constants/strings';

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

export const addToInventoryItemStatus = [
  {
    componentProps: {
      name: 'assetName',
      label: 'Asset_Name',
      fullWidth: true,
      select: false,
    },

    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'serialNumber',
      label: 'Serial Number',
      fullWidth: true,
      select: false,
    },

    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'assetTag',
      label: 'Asset Tag',
      fullWidth: true,
      select: false,
    },

    component: RHFTextField,
    md: 12,
  },
];
