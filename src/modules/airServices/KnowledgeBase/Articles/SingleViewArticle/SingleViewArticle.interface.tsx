import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';

export interface SingleViewArticleDetailArrayI {
  _id?: string;
  title?: string;
  des?: string;
}

export interface SingleViewArticleSideDataI {
  _id?: string;
  heading?: string;
  details?: SingleViewArticleDetailArrayI[] | any;
  keyword?: any;
}

export interface SingleViewArticleDataI {
  folder?: AutocompleteAsyncOptionsI | any;
  createdAt?: string | any;
  status?: string | any;
  author?: AutocompleteAsyncOptionsI | any;
  keywords?: string[] | [] | any;
  views?: number;
  helpfulYesCount?: number;
  helpfulNoCount?: number;
  insertedTicket?: [];
}
