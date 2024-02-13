import { RHFAutocomplete } from '@/components/ReactHookForm';

export const filterArticlesDataDefaultValues = (data?: any) => {
  return {
    status: data?.status?._id ?? null,
    authorId: data?.authorId?._id ?? null,
  };
};

const statusOption = [
  { _id: 'DRAFT', label: 'DRAFT' },
  { _id: 'PUBLISHED', label: 'PUBLISHED' },
];

const authorOption = [
  { _id: 'Alee', label: 'Alee' },
  { _id: 'David', label: 'David' },
  { _id: 'Raza', label: 'Raza' },
  { _id: 'Sam', label: 'Sam' },
  { _id: 'Martiz', label: 'Martiz' },
  { _id: 'Luke', label: 'Luke' },
  { _id: 'Manpreet', label: 'Manpreet' },
];
export const filterArticlesData = [
  {
    id: '1',
    componentProps: {
      name: 'status',
      label: 'Status',
      placeholder: 'Select',
      fullWidth: true,
      options: statusOption,
      getOptionLabel: (option: any) => option?.label,
    },
    component: RHFAutocomplete,
    md: 12,
  },
  {
    id: '2',
    componentProps: {
      name: 'authorId',
      label: 'Author',
      placeholder: 'Select',
      fullWidth: true,
      options: authorOption,
      getOptionLabel: (option: any) => option?.label,
    },
    component: RHFAutocomplete,
    md: 12,
  },
];
