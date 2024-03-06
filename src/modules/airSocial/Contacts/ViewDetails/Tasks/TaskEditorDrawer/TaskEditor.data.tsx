import {
  RHFDatePicker,
  RHFEditor,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';

export const contactTaskDataArray = (asignToOptions: any) => {
  return [
    {
      id: 'title',
      md: 12,
      component: RHFTextField,
      componentProps: {
        name: 'title',
        label: 'Title',
        fullWidth: true,
        disabled: true,
      },
    },
    {
      id: 'description',
      md: 12,
      component: RHFEditor,
      componentProps: {
        name: 'description',
        label: 'Description',
        fullWidth: true,
        disabled: true,
      },
    },
    {
      id: 'status',
      md: 12,
      component: RHFSelect,
      componentProps: {
        name: 'status',
        label: 'Task Type',
        select: true,
        disabled: true,
      },
      options: [
        { value: 'Todo', label: 'To-do' },
        { value: 'Follow-up', label: 'Follow-up' },
        { value: 'Call reminder', label: 'Call reminder' },
      ],
    },
    {
      id: 'startDate',
      md: 6,
      component: RHFDatePicker,
      componentProps: {
        name: 'startDate',
        label: 'Start Date',
        fullWidth: true,
        disabled: true,
      },
    },
    {
      id: 'endDate',
      md: 6,
      component: RHFDatePicker,
      componentProps: {
        name: 'endDate',
        label: 'End Date',
        fullWidth: true,
        disabled: true,
      },
    },
    {
      id: 'assignTo',
      md: 12,
      component: RHFSelect,
      componentProps: {
        name: 'assignTo',
        label: 'Assign To',
        select: true,
        disabled: true,
      },
      options: asignToOptions,
    },
    {
      id: 'priority',
      md: 12,
      component: RHFSelect,
      componentProps: {
        name: 'priority',
        label: 'Priority',
        select: true,
        disabled: true,
      },
      options: [
        { value: 'Low', label: 'Low' },
        { value: 'Medium', label: 'Medium' },
        { value: 'High', label: 'High' },
      ],
    },

    {
      id: 'notifyBefore',
      md: 12,
      component: RHFSelect,
      componentProps: {
        name: 'notifyBefore',
        label: 'Notify Before',
        fullWidth: true,
        select: true,
        disabled: true,
      },
      options: [
        { value: '5', label: '5 minute before' },
        { value: '10', label: '10 minute before' },
        { value: '15', label: '15 minute before' },
        { value: '30', label: '30 minute before' },
      ],
    },
  ];
};
