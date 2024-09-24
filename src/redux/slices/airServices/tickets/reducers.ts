import { PAGINATION } from '@/config';
import { initialTime, ticketsListInitialColumns } from './slice';

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
  state.isPortalOpen = {};
};

const setFilterTicketListsReducer = (state: any, action: any) => {
  state.filterTicketLists = action?.payload?.filterValues;
  state.page = action?.payload?.page;
};

const emptyFilterTicketListsReducer = (state: any) => {
  state.filterTicketLists = {};
};

const setSelectedTicketListsReducer = (state: any, action: any) => {
  state.selectedTicketLists = action?.payload;
};

const emptySelectedTicketListsReducer = (state: any) => {
  state.selectedTicketLists = [];
};

const setTicketsListsActiveColumnReducer = (state: any, action: any) => {
  state.ticketsListsActiveColumn = action?.payload;
};

const setTicketsListsInitialColumnReducer = (state: any) => {
  state.ticketsListsActiveColumn = ticketsListInitialColumns;
};

const setTicketsListsTotalRecordsReducer = (state: any, action: any) => {
  state.totalRecords = action?.payload;
};

const setTimeReducer = (state: any, action: any) => {
  state.time = action?.payload;
};

const setIsTimerPauseReducer = (state: any, action: any) => {
  state.isTimerPause = action?.payload?.isTimerPause;
  state.timerId = action?.payload?.timerId;
};

const resetTimeReducer = (state: any) => {
  state.time = initialTime;
};

const resetInternalRefReducer = (state: any) => {
  state.intervalRef = '';
};

const setInternalRefReducer = (state: any, action: any) => {
  state.intervalRef = action?.payload;
};

const resetComponentStateReducers = (state: any) => {
  state.page = PAGINATION?.CURRENT_PAGE;
  state.pageLimit = PAGINATION?.PAGE_LIMIT;
  state.search = '';
  state.filterTicketLists = {};
  state.selectedTicketLists = [];
  state.ticketsListsActiveColumn = ticketsListInitialColumns;
  state.isPortalOpen = {};
  state.totalRecords = PAGINATION?.TOTAL_RECORDS;
};

export const servicesTicketsReducersList = {
  setPageReducer,
  setPageLimitReducer,
  setPageIncrementReducer,
  setPageDecrementReducer,
  setSearchReducer,
  setIsPortalOpenReducer,
  setIsPortalCloseReducer,
  setFilterTicketListsReducer,
  emptyFilterTicketListsReducer,
  setSelectedTicketListsReducer,
  emptySelectedTicketListsReducer,
  setTicketsListsActiveColumnReducer,
  setTicketsListsInitialColumnReducer,
  setTicketsListsTotalRecordsReducer,
  setTimeReducer,
  setIsTimerPauseReducer,
  resetTimeReducer,
  resetInternalRefReducer,
  setInternalRefReducer,
  resetComponentStateReducers,
};
