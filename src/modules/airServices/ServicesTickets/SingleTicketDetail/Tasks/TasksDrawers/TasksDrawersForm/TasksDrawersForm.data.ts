import * as Yup from 'yup';
import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDatePicker,
  RHFEditor,
  RHFTextField,
  RHFTimePicker,
} from '@/components/ReactHookForm';

const notifyBeforeOption = [
  { value: 5, title: '5 Minutes' },
  { value: 10, title: '10 Minutes' },
  { value: 15, title: '15 Minutes' },
  { value: 30, title: '30 Minutes' },
];
const statusOptions = ['Todo', 'In-Progress', 'Done'];
export const taskTicketFormValidationSchema: any = Yup?.object()?.shape({
  title: Yup?.string()?.required('Required'),
  description: Yup?.string(),
  departmentId: Yup?.mixed()?.required('Required'),
  assignTo: Yup?.mixed(),
  status: Yup?.string(),
  notifyBefore: Yup?.mixed(),
  startDate: Yup?.date(),
  startDateTime: Yup?.date(),
  endDate: Yup?.date(),
  endDateTime: Yup?.date(),
  plannedEffort: Yup?.string(),
});

export const taskTicketFormDefaultValues = (data: any) => {
  const taskData = data?.[0];
  return {
    title: taskData?.title ?? '',
    description: taskData?.description ?? '',
    departmentId: taskData?.departmentData ?? null,
    assignTo: !!Object?.keys(taskData?.assignedUser ?? {})?.length
      ? taskData?.assignedUser
      : '',
    status: taskData?.status ?? '',
    notifyBefore: taskData?.notifyBefore ?? '',
    startDate: taskData?.startDate ? new Date(taskData?.startDate) : new Date(),
    startDateTime: taskData?.startDateTime
      ? new Date(taskData?.startDateTime)
      : new Date(),
    endDate: taskData?.endDate ? new Date(taskData?.endDate) : new Date(),
    endDateTime: taskData?.endDateTime
      ? new Date(taskData?.endDateTime)
      : new Date(),
    plannedEffort: taskData?.plannedEffort ?? '',
  };
};
export const taskTicketFormFields = (
  departmentDropdown: any,
  userDropdown: any,
) => [
  {
    id: 1,
    componentProps: {
      name: 'title',
      label: 'Title',
      placeholder: 'Title',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 2,
    componentProps: {
      name: 'description',
      label: 'Description',
      fullWidth: true,
      style: {
        minHeight: 200,
      },
    },
    component: RHFEditor,
    md: 12,
  },
  {
    id: 3,
    componentProps: {
      name: 'departmentId',
      label: 'Department',
      fullWidth: true,
      required: true,
      placeholder: 'Chose department',
      apiQuery: departmentDropdown,
    },
    component: RHFAutocompleteAsync,
    md: 12,
  },
  {
    id: 4,
    componentProps: {
      name: 'assignTo',
      label: 'Assign To',
      fullWidth: true,
      placeholder: 'Select',
      apiQuery: userDropdown,
      getOptionLabel: (option: any) =>
        option?.firstName + ' ' + option?.lastName,
    },
    component: RHFAutocompleteAsync,
    md: 12,
  },
  {
    id: 5,
    componentProps: {
      name: 'status',
      label: 'Status',
      placeholder: 'Select',
      fullWidth: true,
      options: statusOptions,
    },
    component: RHFAutocomplete,
    md: 12,
  },
  {
    id: 6,
    componentProps: {
      name: 'notifyBefore',
      label: 'Notify Before',
      placeholder: 'Select',
      fullWidth: true,
      options: notifyBeforeOption,
      getOptionLabel: (option: any) => option?.title,
    },
    component: RHFAutocomplete,
    md: 12,
  },
  {
    id: 7,
    componentProps: {
      name: 'startDate',
      label: 'Planned Start Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 8,
  },
  {
    id: 8,
    componentProps: {
      name: 'startDateTime',
      label: '\u00a0',
      fullWidth: true,
    },
    component: RHFTimePicker,
    md: 4,
  },
  {
    id: 9,
    componentProps: {
      name: 'endDate',
      label: 'Planned End Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 8,
  },
  {
    id: 10,
    componentProps: {
      name: 'endDateTime',
      label: '\u00a0',
      fullWidth: true,
    },
    component: RHFTimePicker,
    md: 4,
  },
  {
    id: 11,
    componentProps: {
      name: 'plannedEffort',
      label: 'Planned Effort',
      placeholder: 'Eg: 1h10m',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
];
