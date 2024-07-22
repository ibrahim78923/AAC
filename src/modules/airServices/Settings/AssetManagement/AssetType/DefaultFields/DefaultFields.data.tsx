import {
  RHFAutocomplete,
  RHFDatePicker,
  RHFDesktopDateTimePicker,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';
import { pxToRem } from '@/utils/getFontValue';
import { Typography } from '@mui/material';

export const predefinedAssetTypeDataArray = [
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
    },
    component: RHFAutocomplete,
    md: 6,
  },
  {
    id: 3,
    componentProps: {
      name: 'impact',
      label: 'Impact',
      placeholder: 'Choose Impact',
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
    md: 12,
  },
  {
    id: 5,
    componentProps: {
      name: 'assetLifeExpiry',
      label: 'Expiry date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 6,
  },
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
    },
    component: RHFAutocomplete,
    md: 6,
  },
  {
    id: 8,
    componentProps: {
      name: 'department',
      label: 'Department',
    },
    component: RHFAutocomplete,
    md: 6,
  },
  {
    id: 9,
    componentProps: {
      name: 'assignedOn',
      label: 'Assigned on',
      fullWidth: true,
    },
    component: RHFDesktopDateTimePicker,
    md: 6,
  },
  {
    id: 10,
    componentProps: {
      name: 'usedBy',
      label: 'Used By',
      placeholder: 'Name',
    },
    component: RHFAutocomplete,
    md: 6,
  },
];
