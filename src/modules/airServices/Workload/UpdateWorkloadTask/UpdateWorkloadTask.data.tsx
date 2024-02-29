import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDatePicker,
  RHFEditor,
  RHFTextField,
  RHFTimePicker,
} from '@/components/ReactHookForm';
import { pxToRem } from '@/utils/getFontValue';
import * as Yup from 'yup';

const statusOptions = ['Todo', 'In-Progress', 'Done'];

export const validationSchema: any = Yup?.object()?.shape({
  title: Yup?.string()?.trim()?.required('Required'), //1
  description: Yup?.string()?.trim()?.required('Required'), //2
  departmentId: Yup?.mixed()?.nullable()?.required('Required'), //3
  assignTo: Yup?.mixed()?.nullable(), //4
  status: Yup.string()?.required('Required'), //5
  startDate: Yup?.date(), //6
  startDateTime: Yup?.date(), //7
  endDate: Yup?.date(), //8
  endDateTime: Yup?.date(), //9
  plannedEffort: Yup?.string(), //10
});

export const getWorkloadDefaultValues = (data?: any) => {
  return {
    title: data?.title ?? '', //1
    description: data?.description ?? '', //2
    departmentId: !!Object?.keys(data?.departmentData ?? {})?.length
      ? data?.departmentData
      : null, //3
    assignTo: !!Object?.keys(data?.assignedUser ?? {})?.length
      ? data?.assignedUser
      : null, //4
    status: data?.status ?? '', //5
    startDate: data?.startDate ? new Date(data?.startDate) : null, //6
    startDateTime: data?.startDateTime ? new Date(data?.startDateTime) : null, //7
    endDate: data?.endDate ? new Date(data?.endDate) : null, //8
    endDateTime: data?.endDateTime ? new Date(data?.endDateTime) : null, //9
    plannedEffort: data?.plannedEffort ?? '', //10
  };
};

export const getWorkloadDataArray = ({
  apiQueryDepartment,
  apiQueryAssignTo,
}: any) => {
  return [
    {
      id: 1,
      componentProps: {
        name: 'title',
        label: 'Title',
        placeholder: 'Title',
        required: true,
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
      id: 3,
      componentProps: {
        name: 'departmentId',
        label: 'Department',
        apiQuery: apiQueryDepartment,
        placeholder: 'Choose Department',
        required: true,
      },
      component: RHFAutocompleteAsync,
    },
    {
      id: 4,
      componentProps: {
        name: 'assignTo',
        label: 'Assign To',
        fullWidth: true,
        placeholder: 'Select',
        apiQuery: apiQueryAssignTo,
        getOptionLabel: (option: any) =>
          option?.firstName + ' ' + option?.lastName,
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
        disabled: true,
      },
      component: RHFDatePicker,
      md: 8,
    },
    {
      id: 7,
      componentProps: {
        name: 'startDateTime',
        label: '\u00a0',
        fullWidth: true,
        disabled: true,
      },
      component: RHFTimePicker,
      md: 4,
    },
    {
      id: 8,
      componentProps: {
        name: 'endDate',
        label: 'Planned End Date',
        fullWidth: true,
        disablePast: true,
        textFieldProps: { readOnly: true },
      },
      component: RHFDatePicker,
      md: 8,
    },
    {
      id: 9,
      componentProps: {
        name: 'endDateTime',
        label: '\u00a0\u00a0',
        fullWidth: true,
        textFieldProps: { readOnly: true },
      },
      component: RHFTimePicker,
      md: 4,
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
