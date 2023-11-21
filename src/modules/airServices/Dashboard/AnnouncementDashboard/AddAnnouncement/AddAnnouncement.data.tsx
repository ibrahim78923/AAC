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

const managedBy = [{ value: 'James Harry', label: 'James Harry' }];

const visiBility = [
  { value: 'Select', label: 'Select' },
  { value: 'All agent', label: 'All agent' },
  { value: 'Everyone', label: 'Everyone' },
];
export const createAnnouncementDashboardDataArray = [
  {
    id: 1,
    componentProps: {
      name: 'title',
      label: 'Title',
      fullWidth: true,
      required: true,
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
      required: true,
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
      required: true,
    },
    component: RHFDatePicker,
    md: 6,
  },
  {
    id: 6,
    componentProps: {
      name: 'managedBy',
      label: 'Managed By',
      fullWidth: true,
      select: true,
      required: true,
    },
    options: managedBy,
    component: RHFSelect,
    md: 12,
  },
  {
    id: 7,
    componentProps: {
      name: 'visibility',
      label: 'Visibility',
      fullWidth: true,
      select: true,
      required: true,
    },
    options: visiBility,
    component: RHFSelect,
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
      name: 'emailRecipients',
      label: 'Additional Email recipients',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 10,
    componentProps: {
      name: 'addMember',
      label: 'Add Members',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
];
