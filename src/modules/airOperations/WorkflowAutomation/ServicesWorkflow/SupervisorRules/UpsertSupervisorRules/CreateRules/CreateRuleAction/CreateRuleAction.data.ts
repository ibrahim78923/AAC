import { RHFAutocomplete } from '@/components/ReactHookForm';

const actionsOptions = [
  'Set Status as',
  'Set Priority as',
  'Set Impact as',
  'Set Urgency as',
  'Set Due Date as',
];
const statusOptions = ['Open', 'Pending', 'Resolved', 'Closed'];

export const actionsExecutedFields = [
  {
    _id: 565,
    gridLength: 3,
    componentProps: {
      name: 'deal2',
      size: 'small',
      placeholder: 'Select',
      options: actionsOptions,
    },
    component: RHFAutocomplete,
  },
  {
    _id: 456,
    gridLength: 3,
    componentProps: {
      name: 'deal3',
      size: 'small',
      placeholder: 'Select',
      options: statusOptions,
    },
    component: RHFAutocomplete,
  },
];
