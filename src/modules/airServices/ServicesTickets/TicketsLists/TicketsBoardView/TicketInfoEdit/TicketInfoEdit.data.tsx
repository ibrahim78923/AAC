import {
  RHFAutocomplete,
  RHFDatePicker,
  RHFDropZone,
  RHFEditor,
  RHFSelect,
  RHFTextField,
  RHFTimePicker,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  requester: Yup.string().required('Field is Required'),
  subject: Yup.string().trim().required('Field is Required'),
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
  plannedEffort: Yup.mixed(),
  attachFile: Yup.mixed().nullable(),
});

export const defaultValues = {
  requester: '', //1
  subject: '', //2
  description: '', //3
  category: '', //4
  status: '', //5
  priority: '', //6
  department: '', //7
  source: '', //8
  impact: '', //9
  agent: '', //10
  plannedStartDate: new Date(), //11
  plannedStartTime: new Date(), //12
  plannedEndDate: new Date(), //13
  plannedEndTime: new Date(), //14
  plannedEffort: [], //15
  attachFile: null, //16
};

export const dataArray = [
  {
    componentProps: {
      name: 'requester',
      label: 'Requester',
      fullWidth: true,
      options: ['BE', 'BE1', 'BE2'],
    },
    component: RHFAutocomplete,
    md: 12,
  },
  {
    componentProps: {
      name: 'subject',
      label: 'Subject',
      fullWidth: true,
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
      options: ['BE', 'BE1', 'BE2'],
    },
    component: RHFAutocomplete,
    md: 12,
  },
  {
    componentProps: {
      name: 'status',
      label: 'Status',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'Open', label: 'Open' },
      { value: 'Close', label: 'Close' },
      { value: 'Pending', label: 'Pending' },
      { value: 'Resolved', label: 'Resolved' },
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
    },
    options: [
      { value: 'Low', label: 'Low' },
      { value: 'Medium', label: 'Medium' },
      { value: 'High', label: 'High' },
      { value: 'Urgent', label: 'Urgent' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'department',
      label: 'Department',
      fullWidth: true,
      options: ['BE', 'BE1', 'BE2'],
    },
    component: RHFAutocomplete,
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
      { value: 'Phone No.', label: 'Phone No.' },
      { value: 'Email', label: 'Email' },
      { value: 'Portal', label: 'Portal' },
      { value: 'Chat', label: 'Chat' },
      { value: 'Walk Up', label: 'Walk Up' },
      { value: 'Slack', label: 'Slack' },
      { value: 'MS Team', label: 'MS Team' },
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
      { value: 'Low', label: 'Low' },
      { value: 'Medium', label: 'Medium' },
      { value: 'High', label: 'High' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'agent',
      label: 'Agent',
      fullWidth: true,
      options: ['BE', 'BE1', 'BE2'],
    },
    component: RHFAutocomplete,
    md: 12,
  },
  {
    componentProps: {
      name: 'plannedStartDate',
      label: 'Planned Start Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 7.5,
  },
  {
    componentProps: {
      name: 'plannedStartTime',
      label: '\u00a0\u00a0',
      fullWidth: true,
    },
    component: RHFTimePicker,
    md: 4.5,
  },
  {
    componentProps: {
      name: 'plannedEndDate',
      label: 'Planned End Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 7.5,
  },
  {
    componentProps: {
      name: 'plannedEndTime',
      label: '\u00a0\u00a0',
      fullWidth: true,
    },
    component: RHFTimePicker,
    md: 4.5,
  },
  {
    componentProps: {
      name: 'plannedEffort',
      label: 'Planned Effort',
      fullWidth: true,
      options: ['BE', 'BE1', 'BE2'],
      multiple: true,
    },
    component: RHFAutocomplete,
    md: 12,
  },
  {
    componentProps: {
      name: 'attachFile',
      fullWidth: true,
    },
    component: RHFDropZone,
    md: 12,
  },
];
