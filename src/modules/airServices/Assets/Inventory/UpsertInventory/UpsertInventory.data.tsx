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
  displayName: Yup?.string()?.trim()?.required('Required'),
  assetType: Yup?.mixed()?.nullable()?.required('Required'),
  description: Yup?.string(),
  impact: Yup?.mixed()?.nullable(),
  assetId: Yup?.mixed()?.nullable(),
  assetLifeExpiry: Yup?.date()?.nullable(),
  usedBy: Yup?.mixed()?.nullable(),
  assignedOnTime: Yup?.date()?.nullable(),
  assignedOnDate: Yup?.date()?.nullable(),
});
export const upsertInventoryFieldsDefaultValuesFunction = (data?: any) => {
  return {
    displayName: data?.displayName ?? '',
    assetType: data?.assetType ?? null,
    impact: data?.impact ?? '',
    assetLifeExpiry:
      typeof data?.assetLifeExpiry === 'string'
        ? new Date(data?.assetLifeExpiry ?? todayDate)
        : new Date(),
    description: data?.description ?? '',
    location: data?.location ?? null,
    assignedOnDate: new Date(data?.assignedOnDate ?? todayDate),
    assignedOnTime:
      typeof data?.assignedOnTime === 'string'
        ? new Date(data?.assignedOnTime)
        : null,
    usedBy: data?.usedBy ?? null,
    attachFile: data?.attachFile ?? '',
  };
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
      label: 'Asset life expire on',
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
      required: true,
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
      required: true,
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
