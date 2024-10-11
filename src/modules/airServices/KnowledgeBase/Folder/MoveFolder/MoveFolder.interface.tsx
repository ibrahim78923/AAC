import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';

export interface MoveFolderFormFieldsI {
  movingFrom?: string;
  folder?: AutocompleteAsyncOptionsI | null | any;
}
