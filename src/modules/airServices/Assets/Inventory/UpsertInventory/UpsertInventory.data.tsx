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
  status: Yup?.mixed()?.nullable()?.required('Required'),
  assetId: Yup?.mixed()?.nullable(),
});
export const upsertInventoryFieldsDefaultValuesFunction = (data?: any) => {
  return {
    displayName: data?.displayName ?? '',
    assetId: data?.assetId ?? '',
    assetType: data?.assetType ?? null,
    impact: data?.impact ?? '',
    status: data?.status ?? null,
    assetLifeExpireOn: data?.assetLifeExpireOn ?? null,
    description: data?.description ?? '',
    location: data?.location ?? '',
    assignedOnDate: new Date(data?.assignedOnDate ?? todayDate),
    assignedOnTime: data?.assignedOnTime ?? '',
    usedBy: data?.usedBy ?? '',
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
    id: 2,
    component: RHFTextField,
    gridLength: 6,
    componentProps: {
      fullWidth: true,
      name: 'assetTag',
      label: 'Asset Id',
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
    gridLength: 6,
    componentProps: {
      fullWidth: true,
      name: 'assetLifeExpireOn',
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
      externalParams: { meta: false, limit: 50 },
    },
    component: RHFAutocompleteAsync,
    md: 6,
  },
  {
    id: 9,
    componentProps: {
      name: 'department',
      label: 'Department',
      fullWidth: true,
      required: true,
      apiQuery: apiQueryDepartmentType,
      externalParams: { meta: false, limit: 50 },
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
    id: 11,
    component: RHFTimePicker,
    componentProps: {
      fullWidth: true,
      name: 'assignedOnTime',
      label: '\u00a0\u00a0',
    },
    md: 3,
  },

  {
    id: 9,
    componentProps: {
      name: 'Used By',
      label: 'usedBy',
      fullWidth: true,
      required: true,
      apiQuery: apiQueryUsedByType,
      externalParams: { meta: false, limit: 50 },
    },
    component: RHFAutocompleteAsync,
    md: 6,
  },
];
