import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
} from '@/components/ReactHookForm';
import { ARTICLE_STATUS } from '@/constants/strings';
import {
  AutocompleteAsyncOptionsI,
  AutocompleteOptionsI,
} from '@/components/ReactHookForm/ReactHookForm.interface';
import { FilterArticlesFormDefaultValuesI } from './FilterArticles.interface';

const statusOption: AutocompleteOptionsI[] = [
  { _id: ARTICLE_STATUS?.DRAFT, label: ARTICLE_STATUS?.DRAFT },
  { _id: ARTICLE_STATUS?.PUBLISHED, label: ARTICLE_STATUS?.PUBLISHED },
];

export const filterArticlesDataDefaultValues = (
  data?: FilterArticlesFormDefaultValuesI,
) => {
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
      getOptionLabel: (option: AutocompleteOptionsI) => option?.label,
    },
    component: RHFAutocomplete,
  },
  {
    id: 2,
    componentProps: {
      name: 'authorId',
      label: 'Author',
      placeholder: 'Select Author',
      fullWidth: true,
      apiQuery: apiQueryAuthor,
      getOptionLabel: (option: AutocompleteAsyncOptionsI) =>
        `${option?.firstName} ${option?.lastName}`,
    },
    component: RHFAutocompleteAsync,
  },
];
