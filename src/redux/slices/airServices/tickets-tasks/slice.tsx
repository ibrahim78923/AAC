import { PAGINATION } from '@/config';
import { createSlice } from '@reduxjs/toolkit';
import { servicesTicketTasksReducersList } from './reducers';

export const isPortalOpenInitialState = {
  isOpen: false,
  action: '',
  data: {},
};

const {
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
} = servicesTicketTasksReducersList;

const servicesTicketTasksInitialState = {
  page: PAGINATION?.CURRENT_PAGE,
  pageLimit: PAGINATION?.PAGE_LIMIT,
  search: '',
  selectedTicketTasksLists: [],
  isPortalOpen: isPortalOpenInitialState,
  totalRecords: 0,
  totalCount: 0,
  isTotalCountLoading: true,
};

const servicesTicketTasksSlice = createSlice({
  name: 'ticketTasks',
  initialState: servicesTicketTasksInitialState,
  reducers: {
    setPage: setPageReducer,
    setPageLimit: setPageLimitReducer,
    setPageIncrement: setPageIncrementReducer,
    setPageDecrement: setPageDecrementReducer,
    setSearch: setSearchReducer,
    setIsPortalOpen: setIsPortalOpenReducer,
    setIsPortalClose: setIsPortalCloseReducer,
    setSelectedTicketTasksLists: setSelectedTicketTasksListsReducer,
    emptySelectedTicketTasksLists: emptySelectedTicketTasksListsReducer,
    setTotalCountLoading: setTotalCountLoadingReducer,
    resetTotalCountLoading: resetTotalCountLoadingReducer,
    setTotalCount: setTotalCountReducer,
    setTicketsTasksListsTotalRecords: setTicketsTasksListsTotalRecordsReducer,
  },
});

export const {
  setPage,
  setPageLimit,
  setPageIncrement,
  setPageDecrement,
  setSearch,
  setIsPortalOpen,
  setIsPortalClose,
  setSelectedTicketTasksLists,
  emptySelectedTicketTasksLists,
  setTotalCountLoading,
  resetTotalCountLoading,
  setTotalCount,
  setTicketsTasksListsTotalRecords,
} = servicesTicketTasksSlice?.actions;

export default servicesTicketTasksSlice?.reducer;
