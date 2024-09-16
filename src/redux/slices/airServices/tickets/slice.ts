import { PAGINATION } from '@/config';
import { createSlice } from '@reduxjs/toolkit';
import { servicesTicketsReducersList } from './reducers';
import { TIME_ENTRIES_TICKETS_TIMES } from '@/constants/strings';

const {
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
} = servicesTicketsReducersList;

export const initialTime = {
  hours: TIME_ENTRIES_TICKETS_TIMES?.INITIAL_HOUR,
  minutes: TIME_ENTRIES_TICKETS_TIMES?.INITIAL_MINUTE,
  seconds: TIME_ENTRIES_TICKETS_TIMES?.INITIAL_SECOND,
};

export const ticketsListInitialColumns: string[] = [
  '_id',
  'ticketIdNumber',
  'subject',
  'requesterDetails',
  'agentDetails',
  'state',
  'status',
  'pirority',
];

const servicesTicketsInitialState: any = {
  page: PAGINATION?.CURRENT_PAGE,
  pageLimit: PAGINATION?.PAGE_LIMIT,
  search: '',
  selectedTicketLists: [],
  filterTicketLists: {},
  isPortalOpen: {},
  ticketsListsActiveColumn: ticketsListInitialColumns,
  totalRecords: 0,
  isTimerPause: true,
  time: initialTime,
  timerId: '',
  intervalRef: '',
};

const servicesTicketsSlice = createSlice({
  name: 'tickets',
  initialState: servicesTicketsInitialState,
  reducers: {
    setPage: setPageReducer,
    setPageLimit: setPageLimitReducer,
    setPageIncrement: setPageIncrementReducer,
    setPageDecrement: setPageDecrementReducer,
    setSearch: setSearchReducer,
    setIsPortalOpen: setIsPortalOpenReducer,
    setIsPortalClose: setIsPortalCloseReducer,
    setFilterTicketLists: setFilterTicketListsReducer,
    emptyFilterTicketLists: emptyFilterTicketListsReducer,
    setSelectedTicketLists: setSelectedTicketListsReducer,
    emptySelectedTicketLists: emptySelectedTicketListsReducer,
    setTicketsListsActiveColumn: setTicketsListsActiveColumnReducer,
    setTicketsListsInitialColumn: setTicketsListsInitialColumnReducer,
    setTicketsListsTotalRecords: setTicketsListsTotalRecordsReducer,
    setTime: setTimeReducer,
    setIsTimerPause: setIsTimerPauseReducer,
    resetTime: resetTimeReducer,
    resetInternalRef: resetInternalRefReducer,
    setInternalRef: setInternalRefReducer,
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
  setFilterTicketLists,
  emptyFilterTicketLists,
  setSelectedTicketLists,
  emptySelectedTicketLists,
  setTicketsListsActiveColumn,
  setTicketsListsInitialColumn,
  setTicketsListsTotalRecords,
  setTime,
  setIsTimerPause,
  resetTime,
  resetInternalRef,
  setInternalRef,
} = servicesTicketsSlice?.actions;

export default servicesTicketsSlice?.reducer;
