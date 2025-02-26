import { RHFAutocomplete } from '@/components/ReactHookForm';
import { AutocompleteOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { FilterArticlesFormDefaultValuesI } from './FilterArticles.interface';
import AuthorsFields from '../../KnowledgeBaseFormFields/AuthorsFields';
import { ARTICLE_STATUS } from '@/constants/services';

const { DRAFT, PUBLISHED } = ARTICLE_STATUS ?? {};

const statusOption: AutocompleteOptionsI[] = [
  { _id: DRAFT, label: DRAFT },
  { _id: PUBLISHED, label: PUBLISHED },
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
    _id: 1,
    componentProps: {
      name: 'status',
      label: 'Status',
      placeholder: 'Select status',
      fullWidth: true,
      options: statusOption,
      getOptionLabel: (option: AutocompleteOptionsI) => option?.label,
    },
    component: RHFAutocomplete,
  },
  {
    _id: 2,
    component: AuthorsFields,
  },
];
