import {
  RHFAutocompleteAsync,
  RHFDatePicker,
  RHFDropZone,
  RHFEditor,
  RHFSelect,
  RHFTextField,
  RHFTimePicker,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import {
  ticketImpactOptions,
  ticketPriorityOptions,
  ticketSourceOptions,
  ticketStatusOptions,
} from '../ServicesTickets.data';

const todayDate = dayjs()?.format('MM/DD/YYYY');

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

export const upsertTicketValidationSchema = Yup?.object()?.shape({
  requester: Yup?.mixed()?.nullable()?.required('Required'),
  subject: Yup?.string()?.trim()?.required('Field is Required'),
  description: Yup?.string(),
  category: Yup?.mixed()?.nullable()?.required('Required'),
  status: Yup?.string()?.required('Field is Required'),
  priority: Yup?.string()?.required('Field is Required'),
  department: Yup?.mixed()?.nullable()?.required('Required'),
  source: Yup?.string(),
  impact: Yup?.string(),
  agent: Yup?.mixed()?.nullable()?.required('Required'),
  plannedStartDate: Yup?.date(),
  plannedStartTime: Yup?.date(),
  plannedEndDate: Yup?.date(),
  plannedEndTime: Yup?.date(),
  plannedEffort: Yup?.mixed(),
  associatesAsset: Yup?.mixed()?.nullable()?.required('Required'),
  attachFile: Yup?.mixed()?.nullable(),
});

export const upsertTicketDefaultValuesFunction = (data?: any) => {
  return {
    requester: data?.requester ?? null,
    subject: data?.subject ?? '',
    description: data?.description ?? '',
    category: data?.category ?? null,
    status: data?.status ?? '',
    priority: data?.priority ?? '',
    department: data?.department ?? null,
    source: data?.source ?? '',
    impact: data?.impact ?? '',
    agent: data?.agent ?? null,
    plannedStartDate: new Date(data?.plannedStartDate ?? todayDate),
    plannedStartTime: new Date(),
    plannedEndDate: new Date(data?.plannedEndDate ?? todayDate),
    plannedEndTime: new Date(),
    plannedEffort: !!data?.plannedEffort?.length ? data?.plannedEffort : [],
    associatesAsset: !!data?.associatesAsset?.length
      ? data?.associatesAsset
      : [],
    attachFile: null ?? '',
  };
};
export const upsertTicketFormFieldsDynamic = (
  apiQueryRequester?: any,
  apiQueryDepartment?: any,
  apiQueryCategory?: any,
  apiQueryAgent?: any,
) => [
  {
    componentProps: {
      name: 'requester',
      label: 'Requester',
      fullWidth: true,
      apiQuery: apiQueryRequester,
    },
    component: RHFAutocompleteAsync,
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
      style: { height: '250px' },
    },
    component: RHFEditor,
    md: 12,
  },
  {
    componentProps: {
      name: 'category',
      label: 'Category',
      fullWidth: true,
      apiQuery: apiQueryCategory,
    },
    component: RHFAutocompleteAsync,
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
      name: 'priority',
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
      apiQuery: apiQueryDepartment,
    },
    component: RHFAutocompleteAsync,
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
      apiQuery: apiQueryAgent,
    },
    component: RHFAutocompleteAsync,
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
      multiple: true,
      apiQuery: apiQueryDepartment,
    },
    component: RHFAutocompleteAsync,
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
