import {
  RHFAutocomplete,
  RHFCheckbox,
  RHFDatePicker,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';
import { Typography } from '@mui/material';
import * as Yup from 'yup';

export const createAddAnnouncementValidationSchema: any =
  Yup?.object()?.shape({
    title: Yup?.string()?.required('Field is Required'),
    description: Yup?.string()?.trim(),
    notifyMembers: Yup?.string(),
    managedById: Yup?.string()?.required('Field is Required'),
    vibilityId: Yup?.string()?.required('Field is Required'),
    additionalEmail: Yup?.string(),
    addMembers: Yup?.string(),
  });

export const createAddAnnouncementDefaultValues: any = {
  title: '',
  description: '',
  startDate: new Date(),
  endDate: new Date(),
  managedBy: '',
  visibility: '',
  notifyMember: '',
  additionalEmail: '',
  addMembers: '',
};

const managedBy = ['James Harry'];

const visiBility = ['Select', 'All agent', 'Everyone'];

export const createAddAnnouncementDataArray = [
  {
    id: 1,
    componentProps: {
      name: 'title',
      label: 'Title',
      fullWidth: true,
      required: true,
      placeholder: 'Enter a project name',
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
    componentProps: {
      value: 'Schedule an announcement',
    },
    component: Typography,
    md: 12,
  },
  {
    id: 4,
    componentProps: {
      name: 'startDate',
      label: 'Start Date',
      fullWidth: true,
      disabled: true,
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
      disabled: true,
    },
    component: RHFDatePicker,
    md: 6,
  },
  {
    id: 6,
    componentProps: {
      name: 'managedBy',
      label: 'Managed By',
      placeholder: 'Select',
      fullWidth: true,
      options: managedBy,
    },
    component: RHFAutocomplete,
    md: 12,
  },
  {
    id: 7,
    componentProps: {
      name: 'visibility',
      label: 'Visibility',
      placeholder: 'Select',
      fullWidth: true,
      options: visiBility,
    },
    component: RHFAutocomplete,
    md: 12,
  },

  {
    id: 8,
    componentProps: {
      name: 'notifyMember',
      label: 'Notify members via email',
      fullWidth: true,
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
      name: 'addMembers',
      label: 'Add Members',
      fullWidth: true,
      placeholder: 'Search agents and requesters',
    },
    component: RHFTextField,
    md: 12,
  },
];
