import { RHFSwitchableDatepicker } from '@/components/ReactHookForm';

export const filterFormFields = [
  {
    id: 'createdAt',
    componentProps: {
      name: 'createdAt',
      label: 'Date Filter',
      fullWidth: true,
    },
    component: RHFSwitchableDatepicker,
    md: 12,
  },
];
