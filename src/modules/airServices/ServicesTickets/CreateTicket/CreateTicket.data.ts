import {
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
import {
  ticketImpactOptions,
  ticketPriorityOptions,
  ticketStatusOptions,
} from '../TicketsLists/TicketsLists.data';
import dayjs from 'dayjs';

const todayDate = dayjs()?.format('MM/DD/YYYY');

export const ticketSourceOptions = [
  { value: 'Phone No.', label: 'Phone No.' },
  { value: 'Email', label: 'Email' },
  { value: 'Portal', label: 'Portal' },
  { value: 'Chat', label: 'Chat' },
  { value: 'Walk Up', label: 'Walk Up' },
  { value: 'Slack', label: 'Slack' },
  { value: 'MS Team', label: 'MS Team' },
];

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
export const createTicketValidationSchema = Yup?.object()?.shape({
  requester: Yup?.string()?.required('Field is Required'),
  subject: Yup?.string()?.trim()?.required('Field is Required'),
  description: Yup?.string(),
  category: Yup?.string(),
  status: Yup?.string()?.required('Field is Required'),
  pirority: Yup?.string()?.required('Field is Required'),
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

export const createTicketDefaultValuesFunction = (data?: any) => {
  return {
    requester: data?.requester ?? '',
    subject: data?.subject ?? '',
    description: data?.description ?? '',
    category: data?.category ?? '',
    status: data?.status ?? '',
    pirority: data?.pirority ?? '',
    department: data?.department ?? '',
    source: data?.source ?? '',
    impact: data?.impact ?? '',
    agent: data?.agent ?? '',
    plannedStartDate: new Date(data?.plannedStartDate ?? todayDate),
    plannedStartTime: new Date(),
    plannedEndDate: new Date(data?.plannedEndDate ?? todayDate),
    plannedEndTime: new Date(),
    plannedEffort: !!data?.plannedEffort?.length ? data?.plannedEffort : [],
    associatesAsset: !!data?.associatesAsset?.length
      ? data?.associatesAsset
      : [],
    attachFile: null,
  };
};
export const createTicketDataArray = [
  {
    componentProps: {
      name: 'requester',
      label: 'Requester',
      fullWidth: true,
      options: dropdownDummy,
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
      options: dropdownDummy,
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
    options: ticketStatusOptions,
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'pirority',
      label: 'Priority',
      fullWidth: true,
      select: true,
    },
    options: ticketPriorityOptions,
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'department',
      label: 'Department',
      fullWidth: true,
      options: dropdownDummy,
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
    options: ticketSourceOptions,
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
    options: ticketImpactOptions,
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'agent',
      label: 'Agent',
      fullWidth: true,
      options: dropdownDummy,
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
      multiple: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'associatesAsset',
      label: 'Associate Asset',
      fullWidth: true,
      options: dropdownDummy,
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
