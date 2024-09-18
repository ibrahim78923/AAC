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

const setFilterReportsListReducer = (state: any, action: any) => {
  state.filterReportsList = action?.payload?.filterValues;
  state.page = action?.payload?.page;
};

const emptyFilterReportsListReducer = (state: any) => {
  state.filterReportsList = {};
};

const refetchReportsListReducer = (state: any, action: any) => {
  state.filterReportsList = {};
  state.page = action?.payload?.page ?? PAGINATION?.CURRENT_PAGE;
};

const setSelectedReportsListReducer = (state: any, action: any) => {
  state.selectedReportsList = action?.payload;
};

const emptySelectedReportsListReducer = (state: any) => {
  state.selectedReportsList = [];
};

const setReportsListsTotalRecordsReducer = (state: any, action: any) => {
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
  state.filterReportsList = {};
  state.selectedReportsList = [];
};

const canDisableTabReducer = (state: any, action: any) => {
  state.canDisableTab = action?.payload;
};

const resetComponentStateReducers = (state: any) => {
  state.page = PAGINATION?.CURRENT_PAGE;
  state.pageLimit = PAGINATION?.PAGE_LIMIT;
  state.search = '';
  state.filterReportsList = {};
  state.selectedReportsList = [];
  state.filter = [];
  state.tabValue = 0;
};

export const operationsReportsListsReducersList = {
  setPageReducer,
  setPageLimitReducer,
  setPageIncrementReducer,
  setPageDecrementReducer,
  setSearchReducer,
  setIsPortalOpenReducer,
  setIsPortalCloseReducer,
  setFilterReportsListReducer,
  setReportsListsTotalRecordsReducer,
  emptySelectedReportsListReducer,
  setSelectedReportsListReducer,
  emptyFilterReportsListReducer,
  refetchReportsListReducer,
  setFilterReducer,
  resetFilterReducer,
  resetApiQueryParamsReducers,
  canDisableTabReducer,
  resetComponentStateReducers,
};
