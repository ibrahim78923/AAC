import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
} from '@/components/ReactHookForm';
import { ARTICLE_STATUS } from '@/constants/strings';

const statusOption = [
  { _id: ARTICLE_STATUS?.DRAFT, label: ARTICLE_STATUS?.DRAFT },
  { _id: ARTICLE_STATUS?.PUBLISHED, label: ARTICLE_STATUS?.PUBLISHED },
];

export const filterArticlesDataDefaultValues = (data?: any) => {
  return {
    status: data?.status ?? null,
    authorId: data?.authorId ?? null,
  };
};

export const filterArticlesFormFieldsDynamic = (apiQueryAuthor: any) => [
  {
    id: 1,
    componentProps: {
      name: 'status',
      label: 'Status',
      placeholder: 'Select',
      fullWidth: true,
      options: statusOption,
      getOptionLabel: (option: any) => option?.label,
    },
    component: RHFAutocomplete,
  },
  {
    id: 2,
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
  },
];
