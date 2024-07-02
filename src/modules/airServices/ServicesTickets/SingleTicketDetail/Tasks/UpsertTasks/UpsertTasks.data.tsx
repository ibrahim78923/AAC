import * as Yup from 'yup';
import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDesktopDateTimePicker,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';
import { PAGINATION } from '@/config';
import { ARRAY_INDEX, GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';
import { TASK_STATUS } from '@/constants/strings';

const { DONE, IN_PROGRESS, TO_DO } = TASK_STATUS;
const statusOptions = [TO_DO, IN_PROGRESS, DONE];

export const TITLE_FORM_USER: any = {
  [GENERIC_UPSERT_FORM_CONSTANT?.ADD]: 'Add New Task',
  [GENERIC_UPSERT_FORM_CONSTANT?.EDIT]: 'Edit Tasks',
};

export const BUTTON_TITLE_FORM_USER: any = {
  [GENERIC_UPSERT_FORM_CONSTANT?.ADD]: 'Add Task',
  [GENERIC_UPSERT_FORM_CONSTANT?.EDIT]: 'Update',
};

const notifyBeforeOption = [
  { _id: 5, label: '5 Minutes' },
  { _id: 10, label: '10 Minutes' },
  { _id: 15, label: '15 Minutes' },
  { _id: 30, label: '30 Minutes' },
];

export const upsertTicketTaskFormValidationSchema: any = Yup?.object()?.shape({
  title: Yup?.string()?.trim()?.required('Title is Required'),
  description: Yup?.string()?.trim()?.required('Description is Required'),
  departmentId: Yup?.mixed()?.required('Department is Required'),
  assignTo: Yup?.mixed()?.nullable(),
  notifyBefore: Yup?.mixed()?.nullable(),
  status: Yup?.mixed()?.required('Status is Required'),
  startDate: Yup?.date(),
  endDate: Yup?.date()?.nullable()?.required('End Date is Required'),
  plannedEffort: Yup?.string()?.trim(),
});

export const upsertTicketTaskFormDefaultValues = (data?: any) => {
  const taskData = data?.[ARRAY_INDEX?.ZERO];
  return {
    title: taskData?.title ?? '',
    description: taskData?.description ?? '',
    departmentId: taskData?.departmentData ?? null,
    assignTo: taskData?.assignedUser ?? null,
    status: taskData?.status ?? null,
    notifyBefore: !!taskData?.notifyBefore
      ? notifyBeforeOption?.find(
          (item: any) => item?._id === +taskData?.notifyBefore,
        )
      : null,
    startDate: taskData?.startDate ? new Date(taskData?.startDate) : new Date(),
    endDate: taskData?.endDate ? new Date(taskData?.endDate) : null,
    plannedEffort: taskData?.plannedEffort ?? '',
  };
};

export const upsertTicketTaskFormFormFieldsDynamic = (
  apiQueryDepartment: any,
  apiQueryUser: any,
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
      required: true,
      style: {
        height: 200,
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
      externalParams: { limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT },
      apiQuery: apiQueryDepartment,
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
      apiQuery: apiQueryUser,
      getOptionLabel: (option: any) =>
        `${option?.firstName} ${option?.lastName}`,
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
      required: true,
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
      getOptionLabel: (option: any) => option?.label,
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
      disabled: true,
      textFieldProps: { readOnly: true },
      ampm: false,
    },
    component: RHFDesktopDateTimePicker,
    md: 12,
  },
  {
    id: 9,
    componentProps: {
      name: 'endDate',
      label: 'Planned End Date',
      fullWidth: true,
      disablePast: true,
      required: true,
      textFieldProps: { readOnly: true },
      ampm: false,
    },
    component: RHFDesktopDateTimePicker,
    md: 12,
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
