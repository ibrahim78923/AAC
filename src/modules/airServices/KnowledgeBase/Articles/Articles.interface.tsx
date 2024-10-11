import {
  AutocompleteAsyncOptionsI,
  AutocompleteOptionsI,
} from '@/components/ReactHookForm/ReactHookForm.interface';

export interface ArticlesFilterValuesI {
  status?: AutocompleteOptionsI | null;
  authorId?: AutocompleteAsyncOptionsI | null;
}

export interface ArticlesTableRowI {
  _id: string;
  title?: string;
  status?: string;
  ticketDetails: any;
  author: AutocompleteAsyncOptionsI;
  folder: AutocompleteAsyncOptionsI;
}
