import {
  RHFDatePicker,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
export const dataArray = [
  {
    componentProps: {
      name: 'status',
      label: 'Status',
      fullWidth: true,
      select: true,
    },
    options: [
      {
        value: 'Open',
        label: 'Open',
      },
      {
        value: 'Pending',
        label: 'Pending',
      },
      {
        value: 'Resolved',
        label: 'Resolved',
      },
      {
        value: 'Closed',
        label: 'Closed',
      },
    ],
    component: RHFSelect,
    md: 4,
  },
  {
    componentProps: {
      name: 'Priority *',
      label: 'Priority *',
      fullWidth: true,
      select: true,
    },
    options: [
      {
        value: 'Low',
        label: 'Low',
      },
      {
        value: 'Medium',
        label: 'Medium',
      },
      {
        value: 'High',
        label: 'High',
      },
    ],
    component: RHFSelect,
    md: 4,
  },
  {
    componentProps: {
      name: 'Urgency',
      label: 'Urgency',
      fullWidth: true,
      select: true,
    },
    options: [
      {
        value: 'Low',
        label: 'Low',
      },
      {
        value: 'Medium',
        label: 'Medium',
      },
      {
        value: 'High',
        label: 'High',
      },
      {
        value: 'Urgent',
        label: 'Urgent',
      },
    ],
    component: RHFSelect,
    md: 4,
  },
  {
    componentProps: {
      name: 'Source',
      label: 'Source',
      fullWidth: true,
      select: true,
    },
    options: [
      {
        value: 'Phone',
        label: 'Phone',
      },
      {
        value: 'Email',
        label: 'Email',
      },
      {
        value: 'Portal',
        label: 'Portal',
      },
      {
        value: 'Chat',
        label: 'Chat',
      },
    ],
    component: RHFSelect,
    md: 4,
  },
  {
    componentProps: {
      name: 'Type',
      label: 'Type',
      fullWidth: true,
      select: true,
    },
    options: [
      {
        value: 'Services Request',
        label: 'Services Request',
      },
      {
        value: 'Incident',
        label: 'Incident',
      },
    ],
    component: RHFSelect,
    md: 4,
  },
  {
    componentProps: {
      name: 'Impact ',
      label: 'Impact ',
      fullWidth: true,
      select: true,
    },
    options: [
      {
        value: 'Low',
        label: 'Low',
      },
      {
        value: 'Medium',
        label: 'Medium',
      },
      {
        value: 'High',
        label: 'High',
      },
    ],
    component: RHFSelect,
    md: 4,
  },
  {
    componentProps: {
      name: 'Agent',
      label: 'Agent',
      fullWidth: true,
      select: true,
    },
    options: [
      {
        value: 'A',
        label: 'A',
      },
    ],
    component: RHFSelect,
    md: 4,
  },
  {
    componentProps: {
      name: 'Type',
      label: 'Type',
      fullWidth: true,
      select: true,
    },
    options: [
      {
        value: 'A',
        label: 'A',
      },
    ],
    component: RHFSelect,
    md: 4,
  },
  {
    componentProps: {
      name: 'Impact ',
      label: 'Impact ',
      fullWidth: true,
      select: true,
    },
    options: [
      {
        value: 'A',
        label: 'A',
      },
    ],
    component: RHFSelect,
    md: 4,
  },
  {
    componentProps: {
      name: 'Planned start Date',
      label: 'Planned start Date',
      fullWidth: true,
      select: true,
    },
    options: [
      {
        value: '05/03/2023',
        label: '05/03/2023',
      },
    ],
    component: RHFDatePicker,
    md: 4,
  },
  {
    componentProps: {
      name: 'Planned start Date',
      label: 'Planned start Date',
      fullWidth: true,
      value: '02:56',
    },
    component: RHFTextField,
    md: 2,
  },

  {
    componentProps: {
      name: 'Planned End Date',
      label: 'Planned End Date',
      fullWidth: true,
      select: true,
    },
    options: [
      {
        value: '05/03/2023',
        label: '05/03/2023',
      },
    ],
    component: RHFDatePicker,
    md: 4,
  },
  {
    componentProps: {
      name: 'Planned start Date',
      label: 'Planned start Date',
      fullWidth: true,
      value: '02:56',
    },
    component: RHFTextField,
    md: 2,
  },
  {
    componentProps: {
      name: 'Planned Effort',
      label: 'Planned Effort',
      fullWidth: true,
      value: 'Eg: 1h 10m',
    },
    component: RHFTextField,
    md: 4,
  },
];
