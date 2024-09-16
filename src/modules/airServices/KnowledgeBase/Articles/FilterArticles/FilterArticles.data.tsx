import { RHFAutocomplete } from '@/components/ReactHookForm';
import { ARTICLE_STATUS } from '@/constants/strings';
import { AutocompleteOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { FilterArticlesFormDefaultValuesI } from './FilterArticles.interface';
import AuthorsFields from '../../KnowledgeBaseFormFields/AuthorsFields';

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

export const filterArticlesFormFieldsDynamic = () => [
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
    component: AuthorsFields,
  },
];
