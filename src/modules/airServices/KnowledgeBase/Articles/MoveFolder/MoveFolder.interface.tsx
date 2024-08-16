import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';

export interface MoveFolderFormFieldsI {
  movingFrom?: AutocompleteAsyncOptionsI | null | any;
  moveTo?: AutocompleteAsyncOptionsI | null | any;
}

export type MoveFolderFormDefaultValuesI = AutocompleteAsyncOptionsI[] | any[];
