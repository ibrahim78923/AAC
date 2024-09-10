import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDesktopDateTimePicker,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';
import { pxToRem } from '@/utils/getFontValue';
import * as Yup from 'yup';

const statusOptions = ['Todo', 'In-Progress', 'Done'];

export const getWorkloadValidationSchema: any = Yup?.object()?.shape({
  title: Yup?.string()?.trim()?.required('Title is Required'),
  description: Yup?.string()?.trim()?.required('Description is Required'),
  assignTo: Yup?.mixed()?.nullable(),
  status: Yup.string()?.required('Status is Required'),
  startDate: Yup?.date()?.nullable(),
  endDate: Yup?.date()?.nullable(),
  plannedEffort: Yup?.string(),
});

export const getWorkloadDefaultValues = (data?: any) => ({
  title: data?.title ?? '',
  description: data?.description ?? '',
  assignTo: !!Object?.keys(data?.assignedUser ?? {})?.length
    ? data?.assignedUser
    : null,
  status: data?.status ?? '',
  startDate: data?.startDate ? new Date(data?.startDate) : null,
  endDate: data?.endDate ? new Date(data?.endDate) : null,
  plannedEffort: data?.plannedEffort ?? '',
});

export const getWorkloadDataArray = ({ apiQueryAssignTo }: any) => {
  return [
    {
      id: 1,
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
        name: 'assignTo',
        label: 'Assignee',
        fullWidth: true,
        placeholder: 'Select',
        apiQuery: apiQueryAssignTo,
        getOptionLabel: (option: any) =>
          option?.firstName + ' ' + option?.lastName,
        externalParams: {
          admin: true,
        },
      },
      component: RHFAutocompleteAsync,
    },
    {
      id: 5,
      componentProps: {
        name: 'status',
        label: 'Status',
        placeholder: 'Select',
        required: true,
        fullWidth: true,
        options: statusOptions,
      },
      component: RHFAutocomplete,
    },
    {
      id: 6,
      componentProps: {
        name: 'startDate',
        label: 'Planned Start Date',
        fullWidth: true,
      },
      component: RHFDesktopDateTimePicker,
    },
    {
      id: 8,
      componentProps: {
        name: 'endDate',
        label: 'Planned End Date',
        fullWidth: true,
        disablePast: true,
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
        fullWidth: true,
      },
      component: RHFTextField,
    },
  ];
};
