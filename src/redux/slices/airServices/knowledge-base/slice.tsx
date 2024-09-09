import { PAGINATION } from '@/config';
import { createSlice } from '@reduxjs/toolkit';
import { servicesKnowledgeBaseReducersList } from './reducer';
import { ALL_FOLDER } from '@/modules/airServices/KnowledgeBase/Folder/Folder.data';

const {
  setPageReducer,
  setPageLimitReducer,
  setPageIncrementReducer,
  setPageDecrementReducer,
  setSearchReducer,
  setIsPortalOpenReducer,
  setIsPortalCloseReducer,
  setFilterArticlesListReducer,
  setArticlesListsTotalRecordsReducer,
  emptySelectedArticlesListReducer,
  setSelectedArticlesListReducer,
  emptyFilterArticlesListReducer,
  setSelectedFolderReducer,
  canDisableFolderSelectionsReducer,
  refetchArticlesListReducer,
} = servicesKnowledgeBaseReducersList;

export const isPortalOpenInitialState = {
  isOpen: false,
  action: '',
};

export const selectedFolderInitialState = {
  _id: ALL_FOLDER,
  name: 'ALL',
};

const servicesKnowledgeBaseInitialState = {
  page: PAGINATION?.CURRENT_PAGE,
  pageLimit: PAGINATION?.PAGE_LIMIT,
  search: '',
  filterArticlesList: {},
  selectedArticlesList: [],
  isPortalOpen: isPortalOpenInitialState,
  totalRecords: 0,
  selectedFolder: selectedFolderInitialState,
  IsSelectedFolderChange: false,
  canDisableFolderSelection: false,
};

export const servicesKnowledgeBaseSlice = createSlice({
  name: 'knowledgeBase',
  initialState: servicesKnowledgeBaseInitialState,
  reducers: {
    setPage: setPageReducer,
    setPageLimit: setPageLimitReducer,
    setPageIncrement: setPageIncrementReducer,
    setPageDecrement: setPageDecrementReducer,
    setSearch: setSearchReducer,
    setIsPortalOpen: setIsPortalOpenReducer,
    setIsPortalClose: setIsPortalCloseReducer,
    setFilterArticlesList: setFilterArticlesListReducer,
    setArticlesListsTotalRecords: setArticlesListsTotalRecordsReducer,
    emptySelectedArticlesList: emptySelectedArticlesListReducer,
    setSelectedArticlesList: setSelectedArticlesListReducer,
    emptyFilterArticlesList: emptyFilterArticlesListReducer,
    setSelectedFolder: setSelectedFolderReducer,
    canDisableFolderSelections: canDisableFolderSelectionsReducer,
    refetchArticlesList: refetchArticlesListReducer,
  },
});

export const {
  setIsPortalOpen,
  setIsPortalClose,
  setPage,
  setPageLimit,
  setSearch,
  setFilterArticlesList,
  setArticlesListsTotalRecords,
  emptySelectedArticlesList,
  setSelectedArticlesList,
  emptyFilterArticlesList,
  setPageDecrement,
  setPageIncrement,
  setSelectedFolder,
  canDisableFolderSelections,
  refetchArticlesList,
} = servicesKnowledgeBaseSlice?.actions;

export default servicesKnowledgeBaseSlice?.reducer;
