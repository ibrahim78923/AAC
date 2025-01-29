import {
  RHFAutocomplete,
  RHFDesktopDateTimePicker,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';
import { pxToRem } from '@/utils/getFontValue';
import * as Yup from 'yup';
import { AssignToAndAgent } from '../WorkloadFields/AssignToAndAgent';
import { formatDurationHourMinute } from '@/utils/dateTime';

const statusOptions = ['Todo', 'In-Progress', 'Done'];

export const getWorkloadValidationSchema: any = Yup?.object()?.shape({
  title: Yup?.string()?.trim()?.required('Title is Required'),
  description: Yup?.string()?.trim()?.required('Description is Required'),
  assignTo: Yup?.mixed()?.nullable(),
  status: Yup.string()?.required('Status is Required'),
  startDate: Yup?.date()
    ?.nullable()
    ?.when('endDate', {
      is: (value: any) => value !== null,
      then: () =>
        Yup?.date()?.nullable()?.required('Planned start date is required'),
      otherwise: () => Yup?.date()?.nullable(),
    }),
  endDate: Yup?.date()
    ?.nullable()
    .min(Yup?.ref('startDate'), 'Planned End date is after planned start date'),
  plannedEffort: Yup?.string()?.trim(),
});

export const getWorkloadDefaultValues = (data?: any) => ({
  title: data?.title ?? '',
  description: data?.description ?? '',
  assignTo: !!Object?.keys(data?.assignedUser ?? {})?.length
    ? data?.assignedUser
    : null,
  status: data?.status ?? '',
  startDate: data?.startDate ?? null,
  endDate: data?.endDate ?? null,
  plannedEffort: data?.plannedEffort ?? '',
});

export const getWorkloadDataArray = (
  getValues?: any,
  setValue?: any,
  watch?: any,
) => [
  {
    _id: 1,
    componentProps: {
      name: 'title',
      label: 'Title',
      placeholder: 'Title',
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
      name: 'assignTo',
      label: 'Assignee',
    },
    component: AssignToAndAgent,
  },
  {
    _id: 4,
    componentProps: {
      name: 'status',
      label: 'Status',
      placeholder: 'Select',
      required: true,
      fullWidth: true,
      options: statusOptions,
      isOptionEqualToValue: (option: any, newValue: any) => option === newValue,
    },
    component: RHFAutocomplete,
  },
  {
    _id: 5,
    componentProps: {
      name: 'startDate',
      label: 'Planned Start Date',
      fullWidth: true,
      textFieldProps: { readOnly: true },
      ampm: false,
    },
    component: RHFDesktopDateTimePicker,
  },
  {
    _id: 6,
    componentProps: {
      name: 'endDate',
      label: 'Planned End Date',
      fullWidth: true,
      textFieldProps: { readOnly: true },
      ampm: false,
      minDateTime: watch('startDate'),
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
