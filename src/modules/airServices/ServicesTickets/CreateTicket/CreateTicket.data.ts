import {
  RHFAutocomplete,
  RHFDatePicker,
  RHFDropZone,
  RHFEditor,
  RHFMultiSearchableSelect,
  RHFSearchableSelect,
  RHFSelect,
  RHFTextField,
  RHFTimePicker,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const createTicketValidationSchema = Yup?.object()?.shape({
  requester: Yup?.string()?.required('Field is Required'),
  subject: Yup?.string()?.trim()?.required('Field is Required'),
  description: Yup?.string(),
  category: Yup?.string(),
  status: Yup?.string()?.required('Field is Required'),
  priority: Yup?.string()?.required('Field is Required'),
  department: Yup?.string(),
  source: Yup?.string(),
  impact: Yup?.string(),
  agent: Yup?.string(),
  plannedStartDate: Yup?.date(),
  plannedStartTime: Yup?.date(),
  plannedEndDate: Yup?.date(),
  plannedEndTime: Yup?.date(),
  plannedEffort: Yup?.mixed(),
  attachFile: Yup?.mixed()?.nullable(),
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
  plannedEffort: [],
  associatesAsset: [],
  attachFile: null,
};

export const createTicketDataArray = [
  {
    componentProps: {
      name: 'requester',
      label: 'Requester',
      fullWidth: true,
      options: [
        { value: 'JohnDoe', label: 'John Doe' },
        { value: 'Andrew', label: 'Andrew' },
        { value: 'RichardRobertson', label: 'Richard robertson' },
        { value: 'Franksten', label: 'Franksten' },
      ],
    },
    component: RHFSearchableSelect,
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
      options: [
        { value: 'JohnDoe', label: 'John Doe' },
        { value: 'Andrew', label: 'Andrew' },
        { value: 'RichardRobertson', label: 'Richard robertson' },
        { value: 'Franksten', label: 'Franksten' },
      ],
    },
    component: RHFSearchableSelect,
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
      options: [
        { value: 'JohnDoe', label: 'John Doe' },
        { value: 'Andrew', label: 'Andrew' },
        { value: 'RichardRobertson', label: 'Richard robertson' },
        { value: 'Franksten', label: 'Franksten' },
      ],
    },
    component: RHFSearchableSelect,
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
      options: [
        { value: 'JohnDoe', label: 'John Doe' },
        { value: 'Andrew', label: 'Andrew' },
        { value: 'RichardRobertson', label: 'Richard robertson' },
        { value: 'Franksten', label: 'Franksten' },
      ],
    },
    component: RHFSearchableSelect,
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
      name: 'associatesAsset',
      label: 'Associate Asset',
      fullWidth: true,
      options: [
        { value: 'JohnDoe', label: 'John Doe' },
        { value: 'Andrew', label: 'Andrew' },
        { value: 'RichardRobertson', label: 'Richard robertson' },
        { value: 'Franksten', label: 'Franksten' },
      ],
    },
    component: RHFMultiSearchableSelect,
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
