import {
  RHFDatePicker,
  RHFSelect,
  RHFTextField,
  RHFTimePicker,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
export const validationSchema = Yup?.object()?.shape({
  status: Yup?.string()?.required('Field is Required'),
  priority: Yup?.string()?.required('Field is Required'),
  urgency: Yup?.string(),
  source: Yup?.string(),
  type: Yup?.string(),
  impact: Yup?.string(),
  agent: Yup?.string(),
  category: Yup?.string(),
  tags: Yup?.string(),
  plannedStartDate: Yup?.date(),
  plannedStartTime: Yup?.date(),
  plannedEndDate: Yup?.date(),
  plannedEndTime: Yup?.date(),
  plannedEffort: Yup?.string(),
});

export const defaultValues = {
  status: '', //1
  priority: '', //2
  urgency: '', //3
  source: '', //4
  type: '', //5
  impact: '', //6
  agent: '', //7
  category: '', //8
  tags: '', //9
  plannedStartDate: new Date(), //10
  plannedStartTime: new Date(), //11
  plannedEndDate: new Date(), //12
  plannedEndTime: new Date(), //13
  plannedEffort: '', //14
};
export const dataArray = [
  {
    componentProps: {
      name: 'status',
      label: 'Status',
      fullWidth: true,
      select: true,
      required: true,
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
      name: 'priority',
      label: 'Priority',
      fullWidth: true,
      select: true,
      required: true,
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
      name: 'urgency',
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
      name: 'source',
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
      name: 'agent',
      label: 'Agent',
      fullWidth: true,
      select: true,
    },
    options: [
      {
        value: 'AndrewSchulz',
        label: 'Andrew Schulz',
      },
      {
        value: 'Ryan Miller',
        label: 'Ryan Miller',
      },
    ],
    component: RHFSelect,
    md: 4,
  },
  {
    componentProps: {
      name: 'category',
      label: 'Category',
      fullWidth: true,
      select: true,
    },
    options: [
      {
        value: 'Hardware',
        label: 'Hardware',
      },
      {
        value: 'Software',
        label: 'Software',
      },
      {
        value: 'Network',
        label: 'Network',
      },
      {
        value: 'Office Application',
        label: 'Office Application',
      },
      {
        value: 'Office Furniture',
        label: 'Office Furniture',
      },
    ],
    component: RHFSelect,
    md: 4,
  },

  {
    componentProps: {
      name: 'tags',
      label: 'Tags',
      fullWidth: true,
      select: true,
    },
    options: [
      {
        value: 'Not Working',
        label: 'Not Working',
      },
      {
        value: 'Email',
        label: 'Email',
      },
    ],
    component: RHFSelect,
    md: 4,
  },
  {
    componentProps: {
      name: 'plannedStartDate',
      label: 'Planned Start Date',
      fullWidth: true,
      select: true,
    },

    component: RHFDatePicker,
    md: 4,
  },
  {
    componentProps: {
      name: 'plannedStartTime',
      label: '\u00a0\u00a0',
      fullWidth: true,
    },
    component: RHFTimePicker,
    md: 2,
  },

  {
    componentProps: {
      name: 'plannedEndDate',
      label: 'Planned End Date',
      fullWidth: true,
      select: true,
    },

    component: RHFDatePicker,
    md: 4,
  },
  {
    componentProps: {
      name: 'plannedEndTime',
      label: '\u00a0\u00a0',
      fullWidth: true,
    },
    component: RHFTimePicker,
    md: 2,
  },
  {
    componentProps: {
      name: 'plannedEffort',
      label: 'Planned Effort',
      fullWidth: true,
      placeholder: 'Eg: 1h 10m',
    },
    component: RHFTextField,
    md: 4,
  },
];
