import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
} from '@/components/ReactHookForm';

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

export const filterArticlesFormFieldsDynamic = (apiQueryAuthor: any) => [
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
      apiQuery: apiQueryAuthor,
      getOptionLabel: (option: any) =>
        `${option?.firstName} ${option?.lastName}`,
    },
    component: RHFAutocompleteAsync,
    md: 12,
  },
];
