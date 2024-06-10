import { RHFAutocomplete } from '@/components/ReactHookForm';
import { statuses } from '../PowerDialerList.data';

export const allcallsFilterFormDefaultValues = () => {
  return {
    status: null,
    assignedTo: null,
  };
};
const assignedToOptions = [
  {
    _id: '1',
    label: 'Olivia Rhye',
  },
  {
    _id: '1',
    label: 'Olivia Rhye',
  },
];

export const allcallsFilterFormFieldsDynamic = () => [
  {
    id: 1,
    componentProps: {
      name: 'status',
      label: 'Status',
      fullWidth: true,
      placeholder: 'select',
      options: statuses?.map((item: any) => ({ _id: item, label: item })),
      getOptionLabel: (option: any) => option?.label,
    },
    component: RHFAutocomplete,
  },
  {
    id: 2,
    componentProps: {
      name: 'assignedTo',
      label: 'Assigned To',
      fullWidth: true,
      placeholder: 'Select',
      options: assignedToOptions,
      getOptionLabel: (option: any) => option?.label,
    },
    component: RHFAutocomplete,
  },
];
