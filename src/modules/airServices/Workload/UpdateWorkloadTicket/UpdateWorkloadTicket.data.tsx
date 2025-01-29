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
import { formatDurationHourMinute } from '@/utils/dateTime';

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
  plannedStartDate: Yup?.date()
    ?.nullable()
    ?.when('plannedEndDate', {
      is: (value: any) => value !== null,
      then: () =>
        Yup?.date()?.nullable()?.required('Planned start date is required'),
      otherwise: () => Yup?.date()?.nullable(),
    }),
  plannedEndDate: Yup?.date()
    ?.nullable()
    .min(
      Yup?.ref('plannedStartDate'),
      'Planned end date is after planned start date',
    ),
  plannedEffort: Yup?.string()?.trim(),
});

export const getWorkloadTicketDefaultValues = (data?: any) => ({
  subject: data?.subject ?? '',
  description: data?.description ?? '',
  agent: !!Object?.keys(data?.agentDetails ?? {})?.length
    ? data?.agentDetails
    : null,
  status: data?.status ? { _id: data?.status, label: data?.status } : null,
  plannedStartDate: data?.plannedStartDate ?? null,
  plannedEndDate: data?.plannedEndDate ?? null,
  plannedEffort: data?.plannedEffort ?? '',
});

export const getWorkloadTicketDataArray = (
  getValues?: any,
  setValue?: any,
  watch?: any,
) => [
  {
    _id: 1,
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
    _id: 2,
    componentProps: {
      name: 'description',
      label: 'Description',
      required: true,
      style: { height: pxToRem(250) },
    },
    component: RHFEditor,
  },
  {
    _id: 3,
    componentProps: {
      name: 'agent',
      label: 'Agent',
    },
    component: AssignToAndAgent,
  },
  {
    _id: 4,
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
    _id: 5,
    componentProps: {
      name: 'plannedStartDate',
      label: 'Planned Start Date',
      fullWidth: true,
      ampm: false,
      textFieldProps: { readOnly: true },
    },
    component: RHFDesktopDateTimePicker,
  },
  {
    _id: 6,
    componentProps: {
      name: 'plannedEndDate',
      label: 'Planned End Date',
      fullWidth: true,
      textFieldProps: { readOnly: true },
      ampm: false,
      minDateTime: watch('plannedStartDate'),
    },
    component: RHFDesktopDateTimePicker,
  },
  {
    _id: 7,
    componentProps: {
      name: 'plannedEffort',
      label: 'Planned Effort',
      placeholder: 'Eg: 1h10m',
      onBlurHandler: () => {
        const value = getValues('plannedEffort');
        setValue('plannedEffort', formatDurationHourMinute(value));
      },
    },
    component: RHFTextField,
  },
];
