import { AutocompleteOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';

export interface UpsertFolderFormFieldsI {
  name: string;
  description?: string | undefined | any;
  visibility: AutocompleteOptionsI | null | any;
  [key: string]: any;
}

export interface UpsertFolderFormDefaultValuesI {
  _id?: string;
  name: string;
  description?: string;
  visibility?: string | AutocompleteOptionsI;
}
