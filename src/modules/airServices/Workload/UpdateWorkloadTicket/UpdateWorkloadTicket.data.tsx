import {
  RHFAutocomplete,
  RHFDesktopDateTimePicker,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';
import { pxToRem } from '@/utils/getFontValue';
import * as Yup from 'yup';
import { ticketStatusOptions } from '../../ServicesTickets/ServicesTickets.data';
import { AssignToAndAgent } from '../WorkloadFields/AssignToAndAgent';
import { REGEX } from '@/constants/validation';

export const getWorkloadTicketValidationSchema: any = Yup?.object()?.shape({
  subject: Yup?.string()?.trim()?.required('Subject is Required'),
  description: Yup?.string()
    ?.trim()
    ?.required('Description is Required')
    ?.test('is-not-empty', 'Description is Required', (value) => {
      const strippedContent = value
        ?.replace(REGEX?.GLOBAL_HTML_TAG, '')
        ?.trim();
      return strippedContent !== '';
    }),
  agent: Yup?.mixed()?.nullable(),
  status: Yup?.mixed()?.nullable()?.required('Status is required'),
  plannedStartDate: Yup?.date(),
  plannedEndDate: Yup?.date()
    ?.nullable()
    ?.required('Planned End Date is Required'),
  plannedEffort: Yup?.string()?.trim(),
});

export const getWorkloadTicketDefaultValues = (data?: any) => ({
  subject: data?.subject ?? '',
  description: data?.description ?? '',
  agent: !!Object?.keys(data?.agentDetails ?? {})?.length
    ? data?.agentDetails
    : null,
  status: data?.status ? { _id: data?.status, label: data?.status } : null,
  plannedStartDate: data?.plannedStartDate ?? new Date(),
  plannedEndDate: data?.plannedEndDate ?? null,
  plannedEffort: data?.plannedEffort ?? '',
});

export const workloadTicketDataArray = [
  {
    id: 1,
    componentProps: {
      name: 'subject',
      label: 'Subject',
      placeholder: 'Subject',
      required: true,
      disabled: true,
    },
    component: RHFTextField,
  },
  {
    id: 2,
    componentProps: {
      name: 'description',
      label: 'Description',
      required: true,
      style: { height: pxToRem(250) },
    },
    component: RHFEditor,
  },
  {
    id: 4,
    componentProps: {
      name: 'agent',
      label: 'Agent',
    },
    component: AssignToAndAgent,
  },
  {
    id: 5,
    componentProps: {
      name: 'status',
      label: 'Status',
      placeholder: 'Choose Status',
      required: true,
      options: ticketStatusOptions,
      getOptionLabel: (option: any) => option?.label,
    },
    component: RHFAutocomplete,
  },
  {
    id: 6,
    componentProps: {
      name: 'plannedStartDate',
      label: 'Planned Start Date',
      fullWidth: true,
      disabled: true,
      ampm: false,
    },
    component: RHFDesktopDateTimePicker,
  },
  {
    id: 8,
    componentProps: {
      name: 'plannedEndDate',
      label: 'Planned End Date',
      fullWidth: true,
      disablePast: true,
      required: true,
      textFieldProps: { readOnly: true },
      ampm: false,
    },
    component: RHFDesktopDateTimePicker,
  },
  {
    id: 10,
    componentProps: {
      name: 'plannedEffort',
      label: 'Planned Effort',
      placeholder: 'Eg: 1h10m',
    },
    component: RHFTextField,
  },
];
