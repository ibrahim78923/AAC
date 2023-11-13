import * as yup from 'yup';
import {
  RHFDatePicker,
  RHFEditor,
  RHFSelect,
  RHFTextField,
  RHFTimePicker,
} from '@/components/ReactHookForm';
import { Typography } from '@mui/material';

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

export const assetTypeOptions = [
  {
    value: 'Services',
    label: 'Services',
  },
  {
    value: 'Business Services',
    label: 'Business Services',
  },
  {
    value: 'Hardware',
    label: 'Hardware',
  },
  {
    value: 'Utilizable',
    label: 'Utilizable',
  },
  {
    value: 'IT Servies',
    label: 'IT Servies',
  },
  {
    value: 'Sales Services',
    label: 'Sales Services',
  },
  {
    value: 'Email Services',
    label: 'Email Services',
  },
  {
    value: 'Hosting Services',
    label: 'Hosting Services',
  },
  {
    value: 'Backup Services',
    label: 'Backup Services',
  },
];

export const validationSchema: any = yup?.object()?.shape({
  // displayName: yup?.string()?.required('Required field!'),
  // assetType: yup?.string()?.required('Required field!'),
  // impact: yup?.string()?.required('Required field!'),
});

export const defaultValues = {
  displayName: 'Name',
  assetType: 'services',
  impact: 'low',
  description: '',
  assetLifeExpireOn: null,
  locationId: '651bdf53beeb02bc627d6804',
  departmentId: '6543a48a41732bce39b26f23',
  assignedOnDate: null,
  assignedOnTime: null,
  usedBy: '651bdf53beeb02bc627d6805',
  attachFile: ['652ee528da86b788fd6ca7ea'],
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
      select: true,
      options: dropdownDummy,
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
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: '1.875rem',
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
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: '1.875rem',
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
      select: true,
      options: dropdownDummy,
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
      sx: { mt: 2.3 },
      select: true,
      options: dropdownDummy,
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
