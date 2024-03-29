import * as Yup from 'yup';
import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDatePicker,
  RHFEditor,
  RHFTextField,
  RHFTimePicker,
} from '@/components/ReactHookForm';
import { Typography } from '@mui/material';
import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';
import { ASSET_IMPACT } from '@/constants/strings';

export const assetsImpactOptions = [
  ASSET_IMPACT?.LOW,
  ASSET_IMPACT?.MEDIUM,
  ASSET_IMPACT?.HIGH,
];
const todayDate = dayjs()?.format(DATE_FORMAT?.UI);
export const UpsertInventoryValidationSchema: any = Yup?.object()?.shape({
  displayName: Yup?.string()?.trim()?.required('Display name is required'),
  assetType: Yup?.mixed()?.nullable()?.required('Asset type is required'),
  description: Yup?.string(),
  impact: Yup?.mixed()?.nullable(),
  department: Yup?.mixed()?.nullable(),
  assetLifeExpiry: Yup?.date()?.nullable(),
  usedBy: Yup?.mixed()?.nullable(),
  assignedOnTime: Yup?.date()?.nullable(),
  assignedOnDate: Yup?.date()?.nullable(),
  fileUrl: Yup?.mixed()?.nullable(),
});

export const upsertInventoryFieldsDefaultValuesFunction = (data?: any) => {
  return {
    displayName: data?.displayName ?? '',
    assetType: data?.assetTypeDetails ?? null,
    impact: data?.impact ?? ASSET_IMPACT?.LOW,
    assetLifeExpiry:
      typeof data?.assetLifeExpiry === 'string'
        ? new Date(data?.assetLifeExpiry ?? todayDate)
        : new Date(),
    description: data?.description ?? '',
    location: data?.locationDetails ?? null,
    department: data?.departmentDetails ?? null,
    assignedOnDate: new Date(data?.assignedOn ?? todayDate),
    assignedOnTime: new Date(data?.assignedOn ?? todayDate),
    usedBy: data?.usedByDetails ?? null,
    fileUrl: null,
  };
};
export const editInventoryDefaultValues = {
  displayName: '',
  assetType: '',
  impact: '',
  assetLifeExpiry: '',
  description: '',
  location: '',
  assignedOnDate: '',
  assignedOnTime: '',
  usedBy: '',
};
export const upsertInventoryFormFieldsDynamic = (
  apiQueryAssetType: any,
  apiQueryDepartmentType: any,
  apiQueryLocationType: any,
  apiQueryUsedByType: any,
) => [
  {
    id: 1,
    component: RHFTextField,
    gridLength: 6,
    componentProps: {
      fullWidth: true,
      name: 'displayName',
      label: 'Display name',
      required: true,
    },
    md: 6,
  },

  {
    id: 3,
    componentProps: {
      name: 'assetType',
      label: 'Asset Type',
      placeholder: 'All Assets',
      fullWidth: true,
      required: true,
      apiQuery: apiQueryAssetType,
      externalParams: { meta: false, limit: 50 },
    },
    component: RHFAutocompleteAsync,
    md: 6,
  },
  {
    id: 4,
    componentProps: {
      name: 'impact',
      label: 'Impact',
      fullWidth: true,
      placeholder: 'Choose Impact',
      options: assetsImpactOptions,
    },
    component: RHFAutocomplete,
    md: 6,
  },
  {
    id: 5,
    componentProps: {
      fullWidth: true,
      name: 'description',
      label: 'Description',

      style: { height: '200px' },
    },
    gridLength: 12,
    component: RHFEditor,
  },
  {
    id: 6,
    component: RHFDatePicker,
    componentProps: {
      fullWidth: true,
      name: 'assetLifeExpiry',
      label: 'Expiry date',
      select: true,
    },
    md: 6,
  },
  {
    id: 7,
    componentProps: {
      variant: 'h4',
    },
    heading: 'Assignment',
    gridLength: 12,
    component: Typography,
  },
  {
    id: 8,
    componentProps: {
      name: 'location',
      label: 'Location',
      fullWidth: true,
      apiQuery: apiQueryLocationType,

      getOptionLabel: (option: any) => option?.locationName,
    },
    component: RHFAutocompleteAsync,
    md: 6,
  },
  {
    id: 19,
    componentProps: {
      name: 'department',
      label: 'Department',
      fullWidth: true,
      apiQuery: apiQueryDepartmentType,
    },
    component: RHFAutocompleteAsync,
    md: 6,
  },
  {
    id: 10,
    component: RHFDatePicker,
    componentProps: {
      fullWidth: true,
      name: 'assignedOnDate',
      label: 'Assigned on',
    },
    md: 3,
  },

  {
    id: 12,
    componentProps: {
      name: 'assignedOnTime',
      label: '\u00a0\u00a0',
      fullWidth: true,
    },
    component: RHFTimePicker,
    md: 3,
  },
  {
    id: 9,
    componentProps: {
      fullWidth: true,
      name: 'usedBy',
      label: 'Used By',
      placeholder: 'Name or Email',
      apiQuery: apiQueryUsedByType,
      getOptionLabel: (option: any) =>
        `${option?.firstName} ${option.lastName}`,
    },
    component: RHFAutocompleteAsync,
    md: 6,
  },
];
