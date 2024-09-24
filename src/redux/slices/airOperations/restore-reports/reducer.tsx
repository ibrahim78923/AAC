import { PAGINATION } from '@/config';
import { isPortalOpenInitialState } from './slice';

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
  state.page = PAGINATION?.CURRENT_PAGE;
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

const setFilterRestoreReportsListReducer = (state: any, action: any) => {
  state.filterRestoreReportsList = action?.payload?.filterValues;
  state.page = action?.payload?.page;
};

const emptyFilterRestoreReportsListReducer = (state: any) => {
  state.filterRestoreReportsList = {};
};

const refetchRestoreReportsListReducer = (state: any, action: any) => {
  state.filterRestoreReportsList = {};
  state.page = action?.payload?.page ?? PAGINATION?.CURRENT_PAGE;
};

const setSelectedRestoreReportsListReducer = (state: any, action: any) => {
  state.selectedRestoreReportsList = action?.payload;
};

const emptySelectedRestoreReportsListReducer = (state: any) => {
  state.selectedRestoreReportsList = [];
};

const setRestoreReportsListsTotalRecordsReducer = (state: any, action: any) => {
  state.totalRecords = action?.payload;
};

const setFilterReducer = (state: any, action: any) => {
  state.filter = action?.payload?.filter;
  state.tabValue = action?.payload?.tabValue;
};

const resetFilterReducer = (state: any) => {
  state.filter = [];
  state.tabValue = 0;
};

const resetApiQueryParamsReducers = (state: any) => {
  state.page = PAGINATION?.CURRENT_PAGE;
  state.pageLimit = PAGINATION?.PAGE_LIMIT;
  state.search = '';
  state.filterRestoreReportsList = {};
  state.selectedRestoreReportsList = [];
};

const canDisableTabReducer = (state: any, action: any) => {
  state.canDisableTab = action?.payload;
};

const resetComponentStateReducers = (state: any) => {
  state.page = PAGINATION?.CURRENT_PAGE;
  state.pageLimit = PAGINATION?.PAGE_LIMIT;
  state.search = '';
  state.filterRestoreReportsList = {};
  state.selectedRestoreReportsList = [];
  state.filter = [];
  state.tabValue = 0;
  state.isPortalOpen = isPortalOpenInitialState;
  state.totalRecords = PAGINATION?.TOTAL_RECORDS;
};

export const operationsRestoreReportsListsReducersList = {
  setPageReducer,
  setPageLimitReducer,
  setPageIncrementReducer,
  setPageDecrementReducer,
  setSearchReducer,
  setIsPortalOpenReducer,
  setIsPortalCloseReducer,
  setFilterRestoreReportsListReducer,
  setRestoreReportsListsTotalRecordsReducer,
  emptySelectedRestoreReportsListReducer,
  setSelectedRestoreReportsListReducer,
  emptyFilterRestoreReportsListReducer,
  refetchRestoreReportsListReducer,
  setFilterReducer,
  resetFilterReducer,
  resetApiQueryParamsReducers,
  canDisableTabReducer,
  resetComponentStateReducers,
};
