import {
  AutocompleteAsyncOptionsI,
  AutocompleteOptionsI,
} from '@/components/ReactHookForm/ReactHookForm.interface';
import { Theme } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

export interface ArticlesIsPortalOpenI {
  isOpen?: boolean;
  isFilter?: boolean;
  isUpsertFolder?: boolean;
  isDelete?: boolean;
  isDeleteFolder?: boolean;
  isMoveFolder?: boolean;
  data?: any;
}

export interface ArticlesFilterValuesI {
  status?: AutocompleteOptionsI | null;
  authorId?: AutocompleteAsyncOptionsI | null;
}

export interface ArticlesPortalComponentPropsI {
  isPortalOpen: ArticlesIsPortalOpenI;
  setIsPortalOpen: Dispatch<SetStateAction<ArticlesIsPortalOpenI>>;
  selectedArticlesData: any;
  setSelectedArticlesData: Dispatch<SetStateAction<any>>;
  setPage: Dispatch<SetStateAction<number>>;
  page: number;
  getValueArticlesListData: any;
  totalRecords: number;
  filterValues: ArticlesFilterValuesI;
  setFilterValues: Dispatch<SetStateAction<ArticlesFilterValuesI>>;
  selectedArticlesTab: any;
  moveBack?: boolean;
  getFolderListData: any;
  setFolder: any;
}

export interface ArticlesComponentPropsI {
  isPortalOpen: ArticlesIsPortalOpenI;
  setIsPortalOpen: Dispatch<SetStateAction<ArticlesIsPortalOpenI>>;
}

export interface FolderComponentPropsI {
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  refetch: () => Promise<void> | any;
  foldersList: any;
  theme: Theme;
  setFolder: (folder: AutocompleteAsyncOptionsI) => void;
  selectedArticlesTab: any;
}
export interface ArticlesTableRowI {
  _id: string;
  title?: string;
  status?: string;
  insertedTicketsDetails: any;
  author: AutocompleteAsyncOptionsI;
  folder: AutocompleteAsyncOptionsI;
}
