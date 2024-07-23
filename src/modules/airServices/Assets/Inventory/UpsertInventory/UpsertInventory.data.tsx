import * as Yup from 'yup';
import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDatePicker,
  RHFDesktopDateTimePicker,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';
import { Typography } from '@mui/material';
import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';
import { ASSET_IMPACT } from '@/constants/strings';
import { pxToRem } from '@/utils/getFontValue';
import {
  dynamicFormInitialValue,
  dynamicFormValidationSchema,
} from '@/utils/dynamic-forms';

export const assetsImpactOptions = [
  ASSET_IMPACT?.LOW,
  ASSET_IMPACT?.MEDIUM,
  ASSET_IMPACT?.HIGH,
];

const todayDate = dayjs()?.format(DATE_FORMAT?.UI);

export const UpsertInventoryValidationSchema: any = (form?: any) => {
  const formSchema: any = dynamicFormValidationSchema(form);

  return Yup?.object()?.shape({
    displayName: Yup?.string()?.trim()?.required('Display name is required'),
    assetType: Yup?.mixed()?.nullable()?.required('Asset type is required'),
    description: Yup?.string(),
    impact: Yup?.mixed()?.nullable(),
    department: Yup?.mixed()?.nullable(),
    assetLifeExpiry: Yup?.date()?.nullable(),
    usedBy: Yup?.mixed()?.nullable(),
    assignedOn: Yup?.date()?.nullable(),
    fileUrl: Yup?.mixed()?.nullable(),
    ...formSchema,
  });
};

export const upsertInventoryFieldsDefaultValuesFunction = (
  data?: any,
  form?: any,
) => {
  const initialValues: any = dynamicFormInitialValue(data, form);

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
    assignedOn:
      typeof data?.assignedOn === 'string' ? new Date(data?.assignedOn) : null,
    usedBy: data?.usedByDetails ?? null,
    fileUrl: null,
    ...initialValues,
  };
};

export const editInventoryDefaultValues = {
  displayName: '',
  assetType: '',
  impact: '',
  assetLifeExpiry: '',
  description: '',
  location: '',
  assignedOn: '',
  assignedOnTime: '',
  usedBy: '',
};

export const upsertInventoryFormFieldsFirst = (apiQueryAssetType: any) => [
  {
    id: 1,
    componentProps: {
      name: 'displayName',
      label: 'Display name',
      required: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    id: 2,
    componentProps: {
      name: 'assetType',
      label: 'Asset Type',
      placeholder: 'All Assets',
      required: true,
      apiQuery: apiQueryAssetType,
      externalParams: { meta: false, limit: 50 },
    },
    component: RHFAutocompleteAsync,
    md: 6,
  },
  {
    id: 3,
    componentProps: {
      name: 'impact',
      label: 'Impact',
      placeholder: 'Choose Impact',
      options: assetsImpactOptions,
    },
    component: RHFAutocomplete,
    md: 6,
  },
  {
    id: 4,
    componentProps: {
      name: 'description',
      label: 'Description',
      style: { height: pxToRem(200) },
    },
    component: RHFEditor,
  },
  {
    id: 5,
    componentProps: {
      name: 'assetLifeExpiry',
      label: 'Expiry date',
      fullWidth: true,
      disablePast: true,
      textFieldProps: { readOnly: true },
    },
    component: RHFDatePicker,
    md: 6,
  },
];

export const upsertInventoryFormFieldsSecond = (
  apiQueryDepartmentType: any,
  apiQueryLocationType: any,
  apiQueryUsedByType: any,
  productId: any,
) => [
  {
    id: 6,
    componentProps: {
      variant: 'h4',
    },
    heading: 'Assignment',
    component: Typography,
  },
  {
    id: 7,
    componentProps: {
      name: 'location',
      label: 'Location',
      apiQuery: apiQueryLocationType,
      getOptionLabel: (option: any) => option?.locationName,
    },
    component: RHFAutocompleteAsync,
    md: 6,
  },
  {
    id: 8,
    componentProps: {
      name: 'department',
      label: 'Department',
      apiQuery: apiQueryDepartmentType,
    },
    component: RHFAutocompleteAsync,
    md: 6,
  },
  {
    id: 9,
    component: RHFDesktopDateTimePicker,
    componentProps: {
      name: 'assignedOn',
      label: 'Assigned on',
      fullWidth: true,
      disablePast: true,
      ampm: false,
      textFieldProps: { readOnly: true },
    },
    md: 6,
  },
  {
    id: 10,
    componentProps: {
      name: 'usedBy',
      label: 'Used By',
      placeholder: 'Name',
      apiQuery: apiQueryUsedByType,
      getOptionLabel: (option: any) =>
        `${option?.firstName} ${option.lastName}`,
      externalParams: { productId },
    },
    component: RHFAutocompleteAsync,
    md: 6,
  },
];
