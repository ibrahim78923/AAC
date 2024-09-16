import {
  RHFAutocomplete,
  RHFDesktopDateTimePicker,
  RHFDropZone,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
import {
  ticketImpactOptions,
  ticketPriorityOptions,
  ticketSourceOptions,
  ticketStatusOptions,
} from '../../../ServicesTickets.data';
import { AutocompleteOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { pxToRem } from '@/utils/getFontValue';
import { RequesterFieldDropdown } from '../../../ServiceTicketFormFields/RequesterFieldDropdown';
import { CategoryFieldDropdown } from '../../../ServiceTicketFormFields/CategoryFieldDropdown';
import { DepartmentFieldDropdown } from '../../../ServiceTicketFormFields/DepartmentFieldDropdown';
import { AgentFieldDropdown } from '../../../ServiceTicketFormFields/AgentFieldDropdown';
import { AssetFieldDropdown } from '../../../ServiceTicketFormFields/AssetFieldDropdown';

export const upsertTicketValidationSchema = Yup?.object()?.shape({
  requester: Yup?.mixed()?.nullable()?.required('Requester is Required'),
  subject: Yup?.string()?.trim()?.required('Subject is Required'),
  description: Yup?.string()
    ?.trim()
    ?.required('Description is Required')
    ?.test('is-not-empty', 'Description is Required', (value: string) => {
      const strippedContent = value?.replace(/<[^>]*>/g, '')?.trim();
      return strippedContent !== '';
    }),
  category: Yup?.mixed()?.nullable(),
  status: Yup?.mixed()?.nullable()?.required('Status is Required'),
  priority: Yup?.mixed()?.nullable()?.required('Priority is Required'),
  department: Yup?.mixed()?.nullable(),
  source: Yup?.mixed()?.nullable(),
  impact: Yup?.mixed()?.nullable(),
  agent: Yup?.mixed()?.nullable(),
  plannedStartDate: Yup?.date()?.nullable(),
  plannedEndDate: Yup?.date()?.nullable(),
  plannedEffort: Yup?.string()?.trim(),
  associatesAssets: Yup?.mixed()?.nullable(),
  attachFile: Yup?.mixed()?.nullable(),
});

export const upsertTicketDefaultValuesFunction = (data?: any) => {
  return {
    requester: data?.requesterDetails ?? null,
    subject: data?.subject ?? '',
    description: data?.description ?? '',
    category: data?.categoryDetails ?? null,
    status: data?.status ? { _id: data?.status, label: data?.status } : null,
    priority: data?.pirority
      ? { _id: data?.pirority, label: data?.pirority }
      : null,
    department: data?.departmentDetails ?? null,
    source: data?.source ? { _id: data?.source, label: data?.source } : null,
    impact: data?.impact ? { _id: data?.impact, label: data?.impact } : null,
    agent: data?.agentDetails ?? null,
    plannedStartDate: !!data?.plannedStartDate
      ? new Date(data?.plannedStartDate)
      : new Date(),
    plannedEndDate: !!data?.plannedEndDate
      ? new Date(data?.plannedEndDate)
      : null,
    plannedEffort: data?.plannedEffort ?? '',
    associatesAssets: !!data?.associateAssets?.length
      ? data?.associateAssetsDetails
      : [],
    attachFile: null,
  };
};

export const upsertTicketFormFieldsDynamic = () => [
  {
    id: 1,
    component: RequesterFieldDropdown,
  },
  {
    id: 2,
    componentProps: {
      name: 'subject',
      label: 'Subject',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 3,
    componentProps: {
      name: 'description',
      label: 'Description',
      fullWidth: true,
      required: true,
      style: { height: pxToRem(250) },
    },
    component: RHFEditor,
  },
  {
    id: 4,
    component: CategoryFieldDropdown,
  },
  {
    id: 5,
    componentProps: {
      name: 'status',
      label: 'Status',
      fullWidth: true,
      required: true,
      placeholder: 'Choose Status',
      options: ticketStatusOptions,
      getOptionLabel: (option: AutocompleteOptionsI) => option?.label,
    },
    component: RHFAutocomplete,
  },
  {
    id: 6,
    componentProps: {
      name: 'priority',
      label: 'Priority',
      fullWidth: true,
      required: true,
      placeholder: 'Choose Priority',
      options: ticketPriorityOptions,
      getOptionLabel: (option: AutocompleteOptionsI) => option?.label,
    },
    component: RHFAutocomplete,
  },
  {
    id: 7,
    component: DepartmentFieldDropdown,
  },
  {
    id: 8,
    componentProps: {
      name: 'source',
      label: 'Source',
      fullWidth: true,
      placeholder: 'Choose Source',
      options: ticketSourceOptions,
      getOptionLabel: (option: AutocompleteOptionsI) => option?.label,
    },
    component: RHFAutocomplete,
  },
  {
    id: 9,
    componentProps: {
      name: 'impact',
      label: 'Impact',
      fullWidth: true,
      placeholder: 'Choose Impact',
      options: ticketImpactOptions,
      getOptionLabel: (option: AutocompleteOptionsI) => option?.label,
    },
    component: RHFAutocomplete,
  },
  {
    id: 10,
    component: AgentFieldDropdown,
  },
  {
    id: 11,
    componentProps: {
      name: 'plannedStartDate',
      label: 'Planned Start Date',
      fullWidth: true,
      disabled: true,
      ampm: false,
    },
    component: RHFDesktopDateTimePicker,
    md: 12,
  },
  {
    id: 13,
    componentProps: {
      name: 'plannedEndDate',
      label: 'Planned End Date',
      fullWidth: true,
      disablePast: true,
      ampm: false,
      textFieldProps: { readOnly: true },
    },
    component: RHFDesktopDateTimePicker,
    md: 12,
  },
  {
    id: 15,
    componentProps: {
      name: 'plannedEffort',
      label: 'Planned Effort',
      fullWidth: true,
      multiple: true,
      placeholder: 'Eg: 1h10m',
    },
    component: RHFTextField,
  },
  {
    id: 16,
    component: AssetFieldDropdown,
  },
  {
    id: 17,
    componentProps: {
      name: 'attachFile',
      fullWidth: true,
    },
    component: RHFDropZone,
  },
];
