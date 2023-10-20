import { RHFSelect } from '@/components/ReactHookForm';

export const defaultValues = {
  quoteStatus: '',
  createdBy: '',
};

export const dataArray = [
  {
    xs: 12,
    component: RHFSelect,
    options: [
      { value: 'All', label: 'All' },
      { value: 'Draft', label: 'Draft' },
      { value: 'Published', label: 'Published' },
    ],
    componentProps: {
      name: 'quoteStatus',
      label: 'Quote Status',
      fullWidth: true,
      select: true,
    },
  },
  {
    xs: 12,
    component: RHFSelect,
    options: [
      { value: 'Darlene Robertson', label: 'Darlene Robertson' },
      { value: 'Robert Fox', label: 'Robert Fox' },
      { value: 'Arlene McCoy', label: 'Arlene McCoy' },
    ],
    componentProps: {
      name: 'createdBy',
      label: 'Created By',
      fullWidth: true,
      select: true,
    },
  },
];
