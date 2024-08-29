import { AutocompleteOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';

export interface UpsertFolderFormFieldsI {
  name: string;
  description?: string | undefined;
  visibility: AutocompleteOptionsI | null | any;
}

export interface UpsertFolderFormDefaultValuesI {
  name: string;
  description: string;
  visibility: string;
}
