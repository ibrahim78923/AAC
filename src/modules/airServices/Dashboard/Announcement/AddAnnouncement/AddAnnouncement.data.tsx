import {
  RHFAutocompleteAsync,
  RHFCheckbox,
  RHFDatePicker,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';
import { Typography } from '@mui/material';
import * as Yup from 'yup';

export const createAddAnnouncementValidationSchema: any = Yup?.object()?.shape({
  title: Yup?.string()?.trim()?.required('Title is required'),
  description: Yup?.string()?.trim(),
  notifyMembers: Yup?.string()?.trim(),
  managedById: Yup?.mixed()?.required('Managed by is required'),
  vibilityId: Yup?.mixed()?.required('visibility is required'),
  additionalEmail: Yup?.string()?.trim(),
  addMember: Yup?.string()?.trim(),
  startDate: Yup?.mixed()?.nullable()?.required('Start date is required'),
  endDate: Yup?.mixed()?.nullable()?.required('End date is required'),
});

export const createAddAnnouncementDefaultValues: any = {
  title: '',
  description: '',
  startDate: null,
  endDate: null,
  notifyMembers: '',
  additionalEmail: '',
  addMember: '',
};

export const createAddAnnouncementDataArray = (
  departmentDropdown: any,
  userDropdown: any,
  startDateWatch: any,
) => [
  {
    id: 1,
    componentProps: {
      name: 'title',
      label: 'Title',
      fullWidth: true,
      required: true,
      placeholder: 'Enter Title',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 2,
    componentProps: {
      name: 'description',
      label: 'Description',
      fullWidth: true,
      required: false,
      style: { height: '200px' },
    },
    component: RHFEditor,
    md: 12,
  },
  {
    id: 3,
    componentProps: {},
    heading: 'Schedule an announcement',
    component: Typography,
    md: 12,
  },
  {
    id: 4,
    componentProps: {
      name: 'startDate',
      label: 'Start Date',
      fullWidth: true,
      required: true,
      disablePast: true,
    },
    component: RHFDatePicker,
    md: 6,
  },
  {
    id: 5,
    componentProps: {
      name: 'endDate',
      label: 'End Date',
      fullWidth: true,
      minDate: startDateWatch,
      required: true,
    },
    component: RHFDatePicker,
    md: 6,
  },
  {
    id: 6,
    componentProps: {
      name: 'managedById',
      label: 'Managed By',
      placeholder: 'Select',
      fullWidth: true,
      apiQuery: userDropdown,
      required: true,
      externalParams: { requester: false, admin: true },
      getOptionLabel: (option: any) =>
        `${option?.firstName} ${option?.lastName}`,
    },
    component: RHFAutocompleteAsync,
    md: 12,
  },
  {
    id: 7,
    componentProps: {
      name: 'vibilityId',
      label: 'Visibility',
      placeholder: 'Select',
      fullWidth: true,
      apiQuery: departmentDropdown,
      required: true,
    },
    component: RHFAutocompleteAsync,
    md: 12,
  },
  {
    id: 8,
    componentProps: {
      name: 'notifyMembers',
      label: 'Notify members via email',
    },
    component: RHFCheckbox,
    md: 12,
  },
  {
    id: 9,
    componentProps: {
      name: 'additionalEmail',
      label: 'Additional Email recipients',
      fullWidth: true,
      placeholder: 'Enter Value',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 10,
    componentProps: {
      name: 'addMember',
      label: 'Add Member',
      fullWidth: true,
      placeholder: 'Search agents and requesters',
    },
    component: RHFTextField,
    md: 12,
  },
];
export const DATE_DIFFERENCE = {
  ZERO: 0,
};
