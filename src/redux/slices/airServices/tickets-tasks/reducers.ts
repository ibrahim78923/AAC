import { PAGINATION } from '@/config';
import { isPortalOpenInitialState } from './slice';

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
  state.page = action?.payload?.page;
};

const setIsPortalOpenReducer = (state: any, action: any) => {
  state.isPortalOpen = action?.payload;
};

const setIsPortalCloseReducer = (state: any) => {
  state.isPortalOpen = isPortalOpenInitialState;
};

const setSelectedTicketTasksListsReducer = (state: any, action: any) => {
  state.selectedTicketTasksLists = action?.payload;
};

const emptySelectedTicketTasksListsReducer = (state: any) => {
  state.selectedTicketTasksLists = [];
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

const setTicketsTasksListsTotalRecordsReducer = (state: any, action: any) => {
  state.totalRecords = action?.payload;
};

const resetComponentStateReducers = (state: any) => {
  state.page = PAGINATION?.CURRENT_PAGE;
  state.pageLimit = PAGINATION?.PAGE_LIMIT;
  state.search = '';
  state.selectedTicketTasksLists = [];
  state.isPortalOpen = isPortalOpenInitialState;
  state.totalRecords = PAGINATION?.TOTAL_RECORDS;
  state.totalCount = PAGINATION?.TOTAL_RECORDS;
  state.isTotalCountLoading = true;
};

export const servicesTicketTasksReducersList = {
  setPageReducer,
  setPageLimitReducer,
  setPageIncrementReducer,
  setPageDecrementReducer,
  setSearchReducer,
  setIsPortalOpenReducer,
  setIsPortalCloseReducer,
  setSelectedTicketTasksListsReducer,
  emptySelectedTicketTasksListsReducer,
  setTotalCountLoadingReducer,
  resetTotalCountLoadingReducer,
  setTotalCountReducer,
  setTicketsTasksListsTotalRecordsReducer,
  resetComponentStateReducers,
};
