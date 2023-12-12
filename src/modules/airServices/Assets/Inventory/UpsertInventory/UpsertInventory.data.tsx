import * as yup from 'yup';
import {
  RHFAutocomplete,
  RHFDatePicker,
  RHFEditor,
  RHFSelect,
  RHFTextField,
  RHFTimePicker,
} from '@/components/ReactHookForm';
import { Typography } from '@mui/material';
import { assetTypeOptions } from '../Inventory.data';

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

export const validationSchema: any = yup?.object()?.shape({
  displayName: yup?.string()?.required('Required'),
  assetType: yup?.string()?.required('Required'),
});

export const defaultValues = {
  displayName: '',
  assetId: '',
  assetType: '',
  impact: '',
  description: '',
  assetLifeExpireOn: null,
  location: '',
  department: '',
  assignedOnDate: null,
  assignedOnTime: null,
  usedBy: '',
  attachFile: null,
};

export const addInventoryFields = [
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
      label: 'Asset tag',
    },
    md: 6,
  },
  {
    id: 3,
    component: RHFSelect,
    gridLength: 6,
    componentProps: {
      fullWidth: true,
      name: 'assetType',
      label: 'Asset type',
      select: true,
      options: assetTypeOptions,
      required: true,
    },
    md: 6,
  },
  {
    id: 4,
    component: RHFSelect,
    gridLength: 6,
    componentProps: {
      fullWidth: true,
      name: 'impact',
      label: 'Impact',
      select: true,
      options: dropdownDummy,
    },
    md: 6,
  },
  {
    id: 5,
    componentProps: {
      fullWidth: true,
      name: 'departmentId',
      label: 'Department',
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
      options: dropdownDummy,
    },
    md: 6,
  },
  {
    id: 7,
    componentProps: {
      variant: 'h4',
    },
    heading: 'Services Properties',
    gridLength: 12,
    component: Typography,
  },
  {
    id: 7,
    componentProps: {
      fullWidth: true,
      name: 'services',
      label: 'Services',
      select: true,
      options: dropdownDummy,
    },
    gridLength: 6,
    md: 6,
    component: RHFSelect,
  },
  {
    id: 17,
    componentProps: {
      variant: 'h4',
    },
    heading: 'Assignment',
    gridLength: 12,
    component: Typography,
  },
  {
    id: 7,
    componentProps: {
      fullWidth: true,
      name: 'locationId',
      label: 'Location',
      select: true,
      options: dropdownDummy,
    },
    gridLength: 6,
    md: 6,
    component: RHFSelect,
  },
  {
    id: 7,
    componentProps: {
      fullWidth: true,
      name: 'department',
      label: 'Department',
      select: true,
      options: dropdownDummy,
    },
    gridLength: 6,
    md: 6,
    component: RHFSelect,
  },
  {
    id: 6,
    component: RHFDatePicker,
    gridLength: 3,
    componentProps: {
      fullWidth: true,
      name: 'assignedOnDate',
      label: 'Assigned on',
    },
    md: 3,
  },
  {
    id: 6,
    component: RHFTimePicker,
    gridLength: 3,
    componentProps: {
      fullWidth: true,
      name: 'assignedOnTime',
      label: '\u00a0\u00a0',
    },
    md: 3,
  },
  {
    id: 7,
    componentProps: {
      fullWidth: true,
      name: 'usedBy',
      label: 'Used by',
      select: true,
      options: dropdownDummy,
      placeholder: 'Search for User',
    },
    gridLength: 6,
    md: 6,
    component: RHFAutocomplete,
  },
];
