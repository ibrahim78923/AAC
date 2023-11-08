import {
  RHFCheckbox,
  RHFDatePicker,
  RHFEditor,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
import { Typography } from '@mui/material';
import * as Yup from 'yup';

export const createAnnouncementDashboardValidationSchema: any =
  Yup?.object()?.shape({
    title: Yup?.string()?.required('Field is Required'),
    description: Yup?.string()?.trim(),
    scheduleMeeting: Yup?.string(),
    startDate: Yup?.date(),
    endDate: Yup?.date(),
    managedBy: Yup?.string()?.required('Field is Required'),
    visibility: Yup?.string(),
    notifyMember: Yup?.string(),
    emailRecipients: Yup?.string(),
    addMember: Yup?.string(),
  });

export const createAnnouncementDashboardDefaultValues: any = {
  title: 'Enter a  Project name', //01
  description: '', //2
  scheduleMeeting: '', //3
  startDate: new Date(), //4
  endDate: new Date(), //5
  managedBy: '', //6
  visibility: '', //7
  notifyMember: '', //8
  emailRecipients: 'Enter Value', //9
  addMember: 'Search agents and requesters', //10
};

export const createAnnouncementDashboardDataArray = [
  {
    componentProps: {
      name: 'title',
      label: 'Title',
      fullWidth: true,
      select: false,
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'description',
      label: 'Description',
      fullWidth: true,
      required: false,
    },
    component: RHFEditor,
    md: 12,
  },
  {
    componentProps: {
      value: 'Schedule an announcement',
    },
    component: Typography,
    md: 12,
  },
  {
    componentProps: {
      name: 'startDate',
      label: 'Start Date',
      fullWidth: true,
      required: true,
    },
    component: RHFDatePicker,
    md: 6,
  },
  {
    componentProps: {
      name: 'endDate',
      label: 'End Date',
      fullWidth: true,
      required: true,
    },
    component: RHFDatePicker,
    md: 6,
  },
  {
    componentProps: {
      name: 'managedBy',
      label: 'Managed By',
      fullWidth: true,
      select: true,
      required: true,
    },
    options: [{ value: 'jamesHarry', label: 'James Harry' }],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'visibility',
      label: 'Visibility',
      fullWidth: true,
      select: true,
      required: true,
    },
    options: [
      { value: 'select', label: 'Select' },
      { value: 'allAgent', label: 'All agent' },
      { value: 'everyone', label: 'Everyone' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'notifyMember',
      label: 'Notify members via email',
      fullWidth: true,
    },
    component: RHFCheckbox,
    md: 12,
  },
  {
    componentProps: {
      name: 'emailRecipients',
      label: 'Additional Email recipients',
      fullWidth: true,
      select: false,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'addMember',
      label: 'Add Members',
      fullWidth: true,
      select: false,
    },
    component: RHFTextField,
    md: 12,
  },
];
