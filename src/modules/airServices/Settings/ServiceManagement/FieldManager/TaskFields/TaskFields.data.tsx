import {
  RHFAutocomplete,
  RHFDesktopDateTimePicker,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';

export const predefinedTaskDataArray = [
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
      style: {
        height: 200,
      },
    },
    component: RHFEditor,
  },
  {
    id: 3,
    componentProps: {
      name: 'departmentId',
      label: 'Department',
      required: true,
      placeholder: 'Chose department',
    },
    component: RHFAutocomplete,
  },
  {
    id: 4,
    componentProps: {
      name: 'assignTo',
      label: 'Assign To',
      placeholder: 'Select',
    },
    component: RHFAutocomplete,
  },
  {
    id: 5,
    componentProps: {
      name: 'status',
      label: 'Status',
      placeholder: 'Select',
      required: true,
    },
    component: RHFAutocomplete,
  },
  {
    id: 6,
    componentProps: {
      name: 'notifyBefore',
      label: 'Notify Before',
      placeholder: 'Select',
    },
    component: RHFAutocomplete,
  },
  {
    id: 7,
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
    },
    component: RHFDesktopDateTimePicker,
  },
  {
    id: 9,
    componentProps: {
      name: 'plannedEffort',
      label: 'Planned Effort',
      placeholder: 'Eg: 1h10m',
    },
    component: RHFTextField,
  },
];
