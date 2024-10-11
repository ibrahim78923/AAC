import { PAGINATION } from '@/config';
import { createSlice } from '@reduxjs/toolkit';
import { servicesRelatedTicketsReducersList } from './reducers';

export const isPortalOpenInitialState = {
  isOpen: false,
  action: '',
};

const {
  setPageReducer,
  setPageLimitReducer,
  setPageIncrementReducer,
  setPageDecrementReducer,
  setSearchReducer,
  setIsPortalOpenReducer,
  setIsPortalCloseReducer,
  setSelectedTicketListsReducer,
  emptySelectedTicketListsReducer,
  setTotalCountLoadingReducer,
  resetTotalCountLoadingReducer,
  setTotalCountReducer,
  resetComponentStateReducers,
} = servicesRelatedTicketsReducersList;

const servicesRelatedTicketsInitialState = {
  page: PAGINATION?.CURRENT_PAGE,
  pageLimit: PAGINATION?.PAGE_LIMIT,
  search: '',
  selectedRelatedTicketLists: [],
  isPortalOpen: isPortalOpenInitialState,
  totalRecords: PAGINATION?.TOTAL_RECORDS,
  totalCount: PAGINATION?.TOTAL_RECORDS,
  isTotalCountLoading: true,
};

const servicesRelatedTicketsSlice = createSlice({
  name: 'relatedTickets',
  initialState: servicesRelatedTicketsInitialState,
  reducers: {
    setPage: setPageReducer,
    setPageLimit: setPageLimitReducer,
    setPageIncrement: setPageIncrementReducer,
    setPageDecrement: setPageDecrementReducer,
    setSearch: setSearchReducer,
    setIsPortalOpen: setIsPortalOpenReducer,
    setIsPortalClose: setIsPortalCloseReducer,
    setSelectedTicketLists: setSelectedTicketListsReducer,
    emptySelectedTicketLists: emptySelectedTicketListsReducer,
    setTotalCountLoading: setTotalCountLoadingReducer,
    resetTotalCountLoading: resetTotalCountLoadingReducer,
    setTotalCount: setTotalCountReducer,
    resetComponentState: resetComponentStateReducers,
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
  setSelectedTicketLists,
  emptySelectedTicketLists,
  setTotalCountLoading,
  resetTotalCountLoading,
  setTotalCount,
  resetComponentState,
} = servicesRelatedTicketsSlice?.actions;

export default servicesRelatedTicketsSlice?.reducer;
