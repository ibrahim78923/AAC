import {
  RHFDatePicker,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
export const detailsValidationSchema = Yup.object().shape({
  candidates: Yup.string().trim().required('Field is Required'),
  applyDate: Yup.string().trim().required('Field is Required'),
  status: Yup.string().trim().required('Field is Required'),
});

export const detailsDefaultValues = {
  candidates: '',
  applyDate: '',
  status: '',
};

export const detailsDataArray = [
  {
    componentProps: {
      name: 'deal-name',
      label: 'Deal Name',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 4,
  },
  {
    componentProps: {
      name: 'amount',
      label: 'Amount',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 4,
  },
  {
    componentProps: {
      name: 'deal-owner',
      label: 'Deal Owner',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 4,
  },
  {
    componentProps: {
      name: 'deal-type',
      label: 'Deal Type',
      select: true,
    },
    options: [
      { value: 'New Business', label: 'New Business' },
      { value: 'Existing Business', label: 'Existing Business' },
    ],
    component: RHFSelect,
    md: 4,
  },
  {
    componentProps: {
      name: 'priority',
      label: 'Priority',
      select: true,
    },
    options: [
      { value: '-', label: '-' },
      { value: 'Low', label: 'Low' },
      { value: 'Medium', label: 'Medium' },
    ],
    component: RHFSelect,
    md: 4,
  },
  {
    componentProps: {
      name: 'new',
      label: 'Stage',
      select: true,
    },
    options: [
      { value: 'New', label: 'New' },
      { value: 'Follow Up', label: 'Follow Up' },
      { value: 'Under Review', label: 'Under Review' },
    ],
    component: RHFSelect,
    md: 4,
  },
  {
    componentProps: {
      name: 'pipeline',
      label: 'Pipeline',
      select: true,
    },
    options: [
      { value: 'Sale Pipeline', label: 'Sale Pipeline' },
      { value: 'Recruitment Pipeline', label: 'Recruitment Pipeline' },
      { value: 'Test Pipeline', label: 'Test Pipeline' },
    ],
    component: RHFSelect,
    md: 4,
  },
  {
    componentProps: {
      name: 'last-contacted-person',
      label: 'Last Contacted Person',
      select: true,
    },
    options: [
      { value: 'Jack', label: 'Jack' },
      { value: 'John Doe', label: 'John Doe' },
      { value: 'Rachel Stalk', label: 'Rachel Stalk' },
    ],
    component: RHFSelect,
    md: 4,
  },
  {
    componentProps: {
      name: 'contacted-mode',
      label: 'Contacted Mode',
      select: true,
    },
    options: [
      { value: 'Email', label: 'Email' },
      { value: 'Call', label: 'Call' },
      { value: 'Meeting', label: 'Meeting' },
    ],
    component: RHFSelect,
    md: 4,
  },
  {
    componentProps: {
      name: 'last-activity',
      label: 'Last Activity',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 4,
  },
  {
    componentProps: {
      name: 'created-date',
      label: 'Created Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 4,
  },
  {
    componentProps: {
      name: 'create-time',
      label: '',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 4,
  },
  {
    componentProps: {
      name: 'closed-date',
      label: 'Closed Date',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 4,
  },
  {
    componentProps: {
      name: 'close-time',
      label: '',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 4,
  },
  {
    componentProps: {
      name: 'last-activity-date',
      label: 'Last Activity Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 4,
  },
];
