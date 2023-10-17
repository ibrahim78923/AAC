import {
  RHFDatePicker,
  RHFEditor,
  RHFSelect,
  RHFTextField,
  RHFTimePicker,
  RHFDropZone,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const createTicketValidationSchema = Yup.object().shape({
  requester: Yup.string().required('Field is Required'),
  subject: Yup.string().required('Field is Required'),
  description: Yup.string(),
  category: Yup.string(),
  status: Yup.string().required('Field is Required'),
  priority: Yup.string().required('Field is Required'),
  department: Yup.string(),
  source: Yup.string(),
  impact: Yup.string(),
  agent: Yup.string(),
  plannedStartDate: Yup.date(),
  plannedStartTime: Yup.date(),
  plannedEndDate: Yup.date(),
  plannedEndTime: Yup.date(),
  plannedEffort: Yup.string(),
  addAssets: Yup.string(),
  uploadMedia: Yup.string(),
});

export const createTicketDefaultValues = {
  requester: '',
  subject: '',
  description: '',
  category: '',
  status: '',
  priority: '',
  department: '',
  source: '',
  impact: '',
  agent: '',
  plannedStartDate: new Date(),
  plannedStartTime: new Date(),
  plannedEndDate: new Date(),
  plannedEndTime: new Date(),
  plannedEffort: '',
  addAssets: '',
  uploadMedia: '',
};

export const createTicketDataArray = [
  {
    componentProps: {
      name: 'requester',
      label: 'Requester',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'subject',
      label: 'Subject',
      fullWidth: true,
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
    },
    component: RHFEditor,
    md: 12,
  },
  {
    componentProps: {
      name: 'category',
      label: 'Category',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'IT', label: 'IT' },
      { value: 'HR', label: 'HR' },
      { value: 'Finance', label: 'Finance' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'status',
      label: 'Status',
      fullWidth: true,
      select: true,
      required: true,
    },
    options: [
      { value: 'Active', label: 'Active' },
      { value: 'Inactive', label: 'Inactive' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'priority',
      label: 'Priority',
      fullWidth: true,
      select: true,
      required: true,
    },
    options: [
      { value: 'Cameron Williamson', label: 'Cameron Williamson' },
      { value: 'Cameron Williamson', label: 'Cameron Williamson' },
      { value: 'Cameron Williamson', label: 'Cameron Williamson' },
      { value: 'Cameron Williamson', label: 'Cameron Williamson' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'department',
      label: 'Department',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: '5 Minutes', label: '5 Minutes' },
      { value: '10 Minutes', label: '10 Minutes' },
      { value: '15 Minutes', label: '15 Minutes' },
      { value: '30 Minutes', label: '30 Minutes' },
      { value: 'Never', label: 'Never' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'source',
      label: 'Source',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: '5 Minutes', label: '5 Minutes' },
      { value: '10 Minutes', label: '10 Minutes' },
      { value: '15 Minutes', label: '15 Minutes' },
      { value: '30 Minutes', label: '30 Minutes' },
      { value: 'Never', label: 'Never' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'impact',
      label: 'Impact',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: '5 Minutes', label: '5 Minutes' },
      { value: '10 Minutes', label: '10 Minutes' },
      { value: '15 Minutes', label: '15 Minutes' },
      { value: '30 Minutes', label: '30 Minutes' },
      { value: 'Never', label: 'Never' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'agent',
      label: 'Agent',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: '5 Minutes', label: '5 Minutes' },
      { value: '10 Minutes', label: '10 Minutes' },
      { value: '15 Minutes', label: '15 Minutes' },
      { value: '30 Minutes', label: '30 Minutes' },
      { value: 'Never', label: 'Never' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'plannedStartDate',
      label: 'Planned Start Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 8,
  },
  {
    componentProps: {
      name: 'plannedStartTime',
      label: '\u00a0',
      fullWidth: true,
    },
    component: RHFTimePicker,
    md: 4,
  },
  {
    componentProps: {
      name: 'plannedEndDate',
      label: 'Planned End Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 8,
  },
  {
    componentProps: {
      name: 'plannedEndTime',
      label: '\u00a0',
      fullWidth: true,
    },
    component: RHFTimePicker,
    md: 4,
  },
  {
    componentProps: {
      name: 'plannedEffort',
      label: 'Planned Effort',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'addAssets',
      label: 'Add Assets',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'uploadMedia',
      label: '',
      fullWidth: true,
    },
    component: RHFDropZone,
    md: 12,
  },
];

export const existingData = [
  {
    tital: '#NIC-5 checking',
    status: 'Open',
  },
  {
    tital: '#NIC-5 checking',
    status: 'InProgress',
  },
  {
    tital: '#NIC-5 checking',
    status: 'Open',
  },
  {
    tital: '#NIC-5 checking',
    status: 'Open',
  },
  {
    tital: '#NIC-5 checking',
    status: 'Open',
  },
  {
    tital: '#NIC-5 checking',
    status: 'Open',
  },
];
