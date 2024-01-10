import { RHFSelect } from '@/components/ReactHookForm';

export const defaultValues = {
  quoteStatus: '',
  createdBy: '',
};

export const dataArray = () => {
  return [
    {
      md: 12,
      component: RHFSelect,
      options: [
        { value: 'draft', label: 'Draft' },
        { value: 'published', label: 'Published' },
      ],
      componentProps: {
        name: 'status',
        label: 'Quote Status',
        fullWidth: true,
        select: true,
      },
    },
    {
      md: 12,
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
};
