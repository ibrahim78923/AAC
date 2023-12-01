import * as yup from 'yup';
import {
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
  displayName: yup?.string()?.required('Required field!'),
  assetType: yup?.string()?.required('Required field!'),
  impact: yup?.string()?.required('Required field!'),
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
      label: 'display Name',
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
      label: 'asset Tag',
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
      label: 'asset Type',
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
      label: 'impact',
      select: true,
      options: dropdownDummy,
      required: true,
    },
    md: 6,
  },
  {
    id: 5,
    componentProps: {
      fullWidth: true,
      name: 'departmentId',
      label: 'department',
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
      label: 'asset Life Expire On',
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
      label: 'services',
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
      label: 'location',
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
      label: 'department',
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
      label: 'assigned On',
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
      label: 'used By',
      select: true,
      options: dropdownDummy,
    },
    gridLength: 6,
    md: 6,
    component: RHFSelect,
  },
];
