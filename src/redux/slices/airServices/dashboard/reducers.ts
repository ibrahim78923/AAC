import { PAGINATION } from '@/config';
import {
  isPortalOpenInitialState,
  lastFetchLapseTimeInitialState,
  lastFetchTimeInitialState,
  ticketBasedGraphTypeInitialState,
} from './slice';

const setPageReducer = (state: any, action: any) => {
  state.page = action?.payload;
};

const setPageIncrementReducer = (state: any) => {
  state.page += 1;
};

const setPageDecrementReducer = (state: any) => {
  if (state.page > PAGINATION?.CURRENT_PAGE) {
    state.page -= 1;
  }
};

const setPageLimitReducer = (state: any, action: any) => {
  state.pageLimit = action?.payload;
};

const setSearchReducer = (state: any, action: any) => {
  state.search = action?.payload?.searchTerm;
  state.page = action?.payload?.page ?? PAGINATION?.CURRENT_PAGE;
};

const setIsPortalOpenReducer = (state: any, action: any) => {
  state.isPortalOpen = action?.payload;
};

const setIsPortalCloseReducer = (state: any) => {
  state.isPortalOpen = isPortalOpenInitialState;
};

const setSelectedDashboardListsReducer = (state: any, action: any) => {
  state.selectedDashboardLists = action?.payload;
};

const emptySelectedDashboardListsReducer = (state: any) => {
  state.selectedDashboardLists = [];
};

const setFilterDashboardListsReducer = (state: any, action: any) => {
  state.filterDashboardLists = action?.payload?.filterValues;
  state.page = action?.payload?.page;
};

const emptyFilterDashboardListsReducer = (state: any) => {
  state.filterDashboardLists = {};
};

const setTotalCountLoadingReducer = (state: any) => {
  state.isTotalCountLoading = true;
};

const resetTotalCountLoadingReducer = (state: any) => {
  state.isTotalCountLoading = false;
};

const setTotalCountReducer = (state: any, action: any) => {
  state.totalCount = action?.payload;
};

const setDashboardListsTotalRecordsReducer = (state: any, action: any) => {
  state.totalRecords = action?.payload;
};

const setLastFetchTimeApiReducer = (state: any, action: any) => {
  state.lastFetchTime = action?.payload?.lastFetchTime;
  state.lastFetchLapseTime = action?.payload?.lastFetchLapseTime;
};

const setDepartmentWiseAgentsReducer = (state: any, action: any) => {
  state.departmentWiseAgent = action?.payload;
};

const setTicketBasedGraphTypeReducer = (state: any, action: any) => {
  state.ticketBasedGraphType = action?.payload;
};

const resetTicketBasedGraphTypeReducer = (state: any) => {
  state.ticketBasedGraphType = ticketBasedGraphTypeInitialState;
};

const resetComponentStateReducers = (state: any) => {
  state.page = PAGINATION?.CURRENT_PAGE;
  state.pageLimit = PAGINATION?.PAGE_LIMIT;
  state.search = '';
  state.selectedDashboardLists = [];
  state.isPortalOpen = isPortalOpenInitialState;
  state.totalRecords = PAGINATION?.TOTAL_RECORDS;
  state.totalCount = PAGINATION?.TOTAL_RECORDS;
  state.isTotalCountLoading = true;
  state.lastFetchTime = lastFetchTimeInitialState;
  state.lastFetchLapseTime = lastFetchLapseTimeInitialState;
  state.ticketBasedGraphType = ticketBasedGraphTypeInitialState;
  state.departmentWiseAgent = null;
};

const resetSingleDashboardStateReducer = (state: any) => {
  state.ticketBasedGraphType = ticketBasedGraphTypeInitialState;
  state.departmentWiseAgent = null;
};

export const servicesDashboardReducersList = {
  setPageReducer,
  setPageLimitReducer,
  setPageIncrementReducer,
  setPageDecrementReducer,
  setSearchReducer,
  setIsPortalOpenReducer,
  setIsPortalCloseReducer,
  setSelectedDashboardListsReducer,
  emptySelectedDashboardListsReducer,
  setTotalCountLoadingReducer,
  resetTotalCountLoadingReducer,
  setTotalCountReducer,
  setDashboardListsTotalRecordsReducer,
  resetComponentStateReducers,
  setFilterDashboardListsReducer,
  emptyFilterDashboardListsReducer,
  setLastFetchTimeApiReducer,
  setDepartmentWiseAgentsReducer,
  setTicketBasedGraphTypeReducer,
  resetTicketBasedGraphTypeReducer,
  resetSingleDashboardStateReducer,
};
