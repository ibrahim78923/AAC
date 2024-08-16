import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';

export interface UpsertArticlesFormFieldsI {
  folder: AutocompleteAsyncOptionsI | null;
  title: string;
  details: string;
  tags: any;
  keywords: any;
  needsApproval: boolean | any;
  approver: AutocompleteAsyncOptionsI | null;
  reviewDate: Date | null | any;
  attachments: Blob | null | { [key: string]: any } | any;
}

export interface UpsertArticlesFormDefaultValuesI {
  folder?: AutocompleteAsyncOptionsI | any;
  title?: string | any;
  details?: string | any;
  tags?: string[] | [] | any;
  keywords?: string[] | [] | any;
  isApproval?: boolean | any;
  approver?: AutocompleteAsyncOptionsI | any;
  reviewDate?: Date | any;
  attachments?: Blob | any | { [key: string]: any } | string;
}
