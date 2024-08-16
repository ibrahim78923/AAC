import {
  AutocompleteAsyncOptionsI,
  AutocompleteOptionsI,
} from '@/components/ReactHookForm/ReactHookForm.interface';

export interface FilterArticlesFormFieldsI {
  status?: AutocompleteOptionsI | null;
  authorId?: AutocompleteAsyncOptionsI | null;
}

export interface FilterArticlesFormDefaultValuesI {
  status?: AutocompleteOptionsI | null;
  authorId?: AutocompleteAsyncOptionsI | null;
}
