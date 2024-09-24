import { PAGINATION } from '@/config';
import { isPortalOpenInitialState, selectedFolderInitialState } from './slice';

const setPageReducer = (state: any, action: any) => {
  state.page = action?.payload;
};

const setPageIncrementReducer = (state: any) => {
  state.page += 1;
};

const setPageDecrementReducer = (state: any) => {
  if (state.page > 1) {
    state.page -= 1;
  }
};

const setPageLimitReducer = (state: any, action: any) => {
  state.pageLimit = action?.payload;
};

const setSearchReducer = (state: any, action: any) => {
  state.search = action?.payload?.searchTerm;
  state.page = action?.payload?.page;
};

const setIsPortalOpenReducer = (state: any, action: any) => {
  state.isPortalOpen = action?.payload;
};

const setIsPortalCloseReducer = (state: any) => {
  state.isPortalOpen = isPortalOpenInitialState;
};

const setFilterArticlesListReducer = (state: any, action: any) => {
  state.filterArticlesList = action?.payload?.filterValues;
  state.page = action?.payload?.page;
};

const emptyFilterArticlesListReducer = (state: any) => {
  state.filterArticlesList = {};
};

const refetchArticlesListReducer = (state: any, action: any) => {
  state.filterArticlesList = {};
  state.page = action?.payload?.page ?? PAGINATION?.CURRENT_PAGE;
};

const setSelectedArticlesListReducer = (state: any, action: any) => {
  state.selectedArticlesList = action?.payload;
};

const emptySelectedArticlesListReducer = (state: any) => {
  state.selectedArticlesList = [];
};

const setArticlesListsTotalRecordsReducer = (state: any, action: any) => {
  state.totalRecords = action?.payload;
};

const setSelectedFolderReducer = (state: any, action: any) => {
  state.selectedFolder = action?.payload?.selectedFolder;
  state.page = action?.payload?.page;
  state.IsSelectedFolderChange = true;
};

const canDisableFolderSelectionsReducer = (state: any, action: any) => {
  state.canDisableFolderSelection = action?.payload;
};

const hasSingleArticleApiErrorReducer = (state: any, action: any) => {
  state.singleArticleApiError = action?.payload;
};

const resetComponentStateReducers = (state: any) => {
  state.page = PAGINATION?.CURRENT_PAGE;
  state.pageLimit = PAGINATION?.PAGE_LIMIT;
  state.search = '';
  state.filterArticlesList = {};
  state.selectedArticlesList = [];
  state.isPortalOpen = isPortalOpenInitialState;
  state.selectedFolder = selectedFolderInitialState;
  state.IsSelectedFolderChange = false;
  state.canDisableFolderSelection = false;
  state.singleArticleApiError = false;
  state.totalRecords = PAGINATION?.TOTAL_RECORDS;
};

export const servicesKnowledgeBaseReducersList = {
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
  hasSingleArticleApiErrorReducer,
  resetComponentStateReducers,
};
