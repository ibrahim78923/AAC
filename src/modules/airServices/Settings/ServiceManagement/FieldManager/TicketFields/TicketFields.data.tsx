import {
  RHFAutocomplete,
  RHFDesktopDateTimePicker,
  RHFDropZone,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';

export const predefinedTicketDataArray = [
  {
    id: 1,
    componentProps: {
      name: 'requester',
      label: 'Requester',
      required: true,
      placeholder: 'Add Requester',
    },
    component: RHFAutocomplete,
  },
  {
    id: 2,
    componentProps: {
      name: 'subject',
      label: 'Subject',
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 3,
    componentProps: {
      name: 'description',
      label: 'Description',
      required: true,
      style: { height: '250px' },
    },
    component: RHFEditor,
  },
  {
    id: 4,
    componentProps: {
      name: 'category',
      label: 'Category',
      placeholder: 'Choose Category',
    },
    component: RHFAutocomplete,
  },
  {
    id: 5,
    componentProps: {
      name: 'status',
      label: 'Status',
      required: true,
      placeholder: 'Choose Status',
    },
    component: RHFAutocomplete,
  },
  {
    id: 6,
    componentProps: {
      name: 'priority',
      label: 'Priority',
      required: true,
      placeholder: 'Choose Priority',
    },
    component: RHFAutocomplete,
  },
  {
    id: 7,
    componentProps: {
      name: 'department',
      label: 'Department',
      placeholder: 'Choose Department',
    },
    component: RHFAutocomplete,
  },
  {
    id: 8,
    componentProps: {
      name: 'source',
      label: 'Source',
      placeholder: 'Choose Source',
    },
    component: RHFAutocomplete,
  },
  {
    id: 9,
    componentProps: {
      name: 'impact',
      label: 'Impact',
      placeholder: 'Choose Impact',
    },
    component: RHFAutocomplete,
  },
  {
    id: 10,
    componentProps: {
      name: 'agent',
      label: 'Agent',
      placeholder: 'Choose Agent',
    },
    component: RHFAutocomplete,
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
  },
  {
    id: 13,
    componentProps: {
      name: 'plannedEndDate',
      label: 'Planned End Date',
      fullWidth: true,
      disablePast: true,
      ampm: false,
    },
    component: RHFDesktopDateTimePicker,
  },
  {
    id: 15,
    componentProps: {
      name: 'plannedEffort',
      label: 'Planned Effort',
      fullWidth: true,
      placeholder: 'Eg: 1h10m',
    },
    component: RHFTextField,
  },
  {
    id: 16,
    componentProps: {
      name: 'associatesAssets',
      label: 'Associate Assets',
      fullWidth: true,
      placeholder: 'Choose Assets',
    },
    component: RHFAutocomplete,
  },
  {
    id: 17,
    componentProps: {
      name: 'attachFile',
    },
    component: RHFDropZone,
  },
];
