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
export interface DropdownOptionsI {
  _id: string;
  label: string;
}

export interface ArticlesFilterValuesI {
  status?: DropdownOptionsI | string;
  authorId?: any;
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
  setFolder: (folder: { [key: string]: any }) => void;
  selectedArticlesTab: any;
}
