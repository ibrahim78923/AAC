import * as Yup from 'yup';
import {
  RHFAutocomplete,
  RHFDatePicker,
  RHFDesktopDateTimePicker,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';
import { Typography } from '@mui/material';
import { pxToRem } from '@/utils/getFontValue';
import {
  dynamicFormInitialValue,
  dynamicFormValidationSchema,
} from '@/utils/dynamic-forms';
import { localeDateTime } from '@/lib/date-time';
import { GLOBAL_CHARACTERS_LIMIT } from '@/constants/validation';
import GetInventoryAssetsDropdown from '../InventoryFormFieldsDropdowns/GetInventoryAssetsDropdown';
import GetInventoryDepartmentDropdown from '../InventoryFormFieldsDropdowns/GetInventoryDepartmentDropdown';
import GetInventoryLocationDropdown from '../InventoryFormFieldsDropdowns/GetInventoryLocationDropdown';
import GetInventoryAllUsersDropdown from '../InventoryFormFieldsDropdowns/GetInventoryAllUsersDropdown';
import { ASSET_IMPACT } from '@/constants/services';

export const assetsImpactOptions = [
  ASSET_IMPACT?.LOW,
  ASSET_IMPACT?.MEDIUM,
  ASSET_IMPACT?.HIGH,
];

export const UpsertInventoryValidationSchema: any = (form?: any) => {
  const formSchema: any = dynamicFormValidationSchema(form);

  return Yup?.object()?.shape({
    displayName: Yup?.string()
      ?.trim()
      ?.required('Display name is required')
      ?.max(
        GLOBAL_CHARACTERS_LIMIT?.DEFAULT,
        `Maximum characters limit is ${GLOBAL_CHARACTERS_LIMIT?.DEFAULT}`,
      ),
    assetType: Yup?.mixed()?.nullable()?.required('Asset type is required'),
    description: Yup?.string()?.trim(),
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
    assetLifeExpiry: data?.assetLifeExpiry
      ? localeDateTime(data?.assetLifeExpiry)
      : new Date(),
    description: data?.description ?? '',
    location: data?.locationDetails ?? null,
    department: data?.departmentDetails ?? null,
    assignedOn: data?.assignedOn
      ? localeDateTime(data?.assignedOn)
      : new Date(),
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
  usedBy: '',
};

export const upsertInventoryFormFieldsFirst = () => [
  {
    _id: 1,
    componentProps: {
      name: 'displayName',
      label: 'Display name',
      placeholder: 'Enter Display Name',
      required: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    _id: 2,
    component: GetInventoryAssetsDropdown,
    componentProps: { required: true },
    md: 6,
  },
  {
    _id: 3,
    componentProps: {
      name: 'impact',
      label: 'Impact',
      placeholder: 'Choose Impact',
      options: assetsImpactOptions,
      isOptionEqualToValue: (option: any, newValue: any) => option === newValue,
    },
    component: RHFAutocomplete,
    md: 6,
  },
  {
    _id: 4,
    componentProps: {
      name: 'description',
      label: 'Description',
      placeholder: 'Enter Description',
      style: { height: pxToRem(200) },
    },
    component: RHFEditor,
  },
  {
    _id: 5,
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

export const upsertInventoryFormFieldsSecond = () => [
  {
    _id: 6,
    componentProps: {
      variant: 'h4',
    },
    heading: 'Assignment',
    component: Typography,
  },
  {
    _id: 7,
    component: GetInventoryLocationDropdown,
    componentProps: { name: 'location' },
    md: 6,
  },
  {
    _id: 8,
    component: GetInventoryDepartmentDropdown,
    componentProps: { name: 'department' },
    md: 6,
  },
  {
    _id: 9,
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
    _id: 10,
    component: GetInventoryAllUsersDropdown,
    md: 6,
  },
];
