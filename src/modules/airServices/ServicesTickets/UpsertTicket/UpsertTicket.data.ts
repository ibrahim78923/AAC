import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDatePicker,
  RHFDropZone,
  RHFEditor,
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
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { AIR_SERVICES } from '@/constants';

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
  subject: Yup?.string()?.trim()?.required('Required'),
  description: Yup?.string(),
  category: Yup?.mixed()?.nullable(),
  status: Yup?.mixed()?.nullable()?.required('Required'),
  priority: Yup?.mixed()?.nullable()?.required('Required'),
  department: Yup?.mixed()?.nullable(),
  source: Yup?.mixed()?.nullable(),
  impact: Yup?.mixed()?.nullable(),
  agent: Yup?.mixed()?.nullable(),
  plannedStartDate: Yup?.date(),
  plannedStartTime: Yup?.date(),
  plannedEndDate: Yup?.date(),
  plannedEndTime: Yup?.date(),
  plannedEffort: Yup?.string()?.trim(),
  associatesAssets: Yup?.mixed()?.nullable(),
  attachFile: Yup?.mixed()?.nullable(),
});

export const upsertTicketDefaultValuesFunction = (data?: any) => {
  return {
    requester: data?.requester ?? null,
    subject: data?.subject ?? '',
    description: data?.description ?? '',
    category: data?.category ?? null,
    status: data?.status ?? null,
    priority: data?.priority ?? null,
    department: data?.department ?? null,
    source: data?.source ?? null,
    impact: data?.impact ?? null,
    agent: data?.agent ?? null,
    plannedStartDate: new Date(data?.plannedStartDate ?? todayDate),
    plannedStartTime: new Date(),
    plannedEndDate: new Date(data?.plannedEndDate ?? todayDate),
    plannedEndTime: new Date(),
    plannedEffort: !!data?.plannedEffort?.length ? data?.plannedEffort : '',
    associatesAssets: !!data?.associatesAsset?.length
      ? data?.associatesAsset
      : [],
    attachFile: null,
  };
};
export const upsertTicketFormFieldsDynamic = (
  apiQueryRequester?: any,
  apiQueryDepartment?: any,
  apiQueryCategory?: any,
  apiQueryAgent?: any,
  router?: any,
) => [
  {
    componentProps: {
      name: 'requester',
      label: 'Requester',
      fullWidth: true,
      required: true,
      apiQuery: apiQueryRequester,
      EndIcon: AddCircleIcon,
      endIconClick: () => {
        router?.push(AIR_SERVICES?.REQUESTERS_SETTINGS);
      },
      placeholder: 'Add Requester',
    },
    component: RHFAutocompleteAsync,
  },
  {
    componentProps: {
      name: 'subject',
      label: 'Subject',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
  },
  {
    componentProps: {
      name: 'description',
      label: 'Description',
      fullWidth: true,
      style: { height: '250px' },
    },
    component: RHFEditor,
  },
  {
    componentProps: {
      name: 'category',
      label: 'Category',
      fullWidth: true,
      apiQuery: apiQueryCategory,
      placeholder: 'Choose Category',
    },
    component: RHFAutocompleteAsync,
  },
  {
    componentProps: {
      name: 'status',
      label: 'Status',
      fullWidth: true,
      required: true,
      placeholder: 'Choose Status',
      options: ticketStatusOptions,
    },
    component: RHFAutocomplete,
  },
  {
    componentProps: {
      name: 'priority',
      label: 'Priority',
      fullWidth: true,
      required: true,
      placeholder: 'Choose Priority',
      options: ticketPriorityOptions,
    },
    component: RHFAutocomplete,
  },
  {
    componentProps: {
      name: 'department',
      label: 'Department',
      fullWidth: true,
      apiQuery: apiQueryDepartment,
      placeholder: 'Choose Department',
    },
    component: RHFAutocompleteAsync,
  },
  {
    componentProps: {
      name: 'source',
      label: 'Source',
      fullWidth: true,
      placeholder: 'Choose Source',
      options: ticketSourceOptions,
    },
    component: RHFAutocomplete,
  },
  {
    componentProps: {
      name: 'impact',
      label: 'Impact',
      fullWidth: true,
      placeholder: 'Choose Impact',
      options: ticketImpactOptions,
    },
    component: RHFAutocomplete,
  },
  {
    componentProps: {
      name: 'agent',
      label: 'Agent',
      fullWidth: true,
      apiQuery: apiQueryAgent,
      placeholder: 'Choose Agent',
    },
    component: RHFAutocompleteAsync,
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
      placeholder: 'Eg: 1h 10m',
    },
    component: RHFTextField,
  },
  {
    componentProps: {
      name: 'associatesAssets',
      label: 'Associate Assets',
      fullWidth: true,
      multiple: true,
      apiQuery: apiQueryDepartment,
      placeholder: 'Choose Assets',
    },
    component: RHFAutocompleteAsync,
  },
  {
    componentProps: {
      name: 'attachFile',
      fullWidth: true,
    },
    component: RHFDropZone,
  },
];
