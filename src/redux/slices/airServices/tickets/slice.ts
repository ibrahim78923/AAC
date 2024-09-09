import { PAGINATION } from '@/config';
import { createSlice } from '@reduxjs/toolkit';
import { servicesTicketsReducersList } from './reducers';
import { ticketsListInitialColumns } from '@/modules/airServices/ServicesTickets/TicketsLists/TicketsLists.data';

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
} = servicesTicketsReducersList;

const servicesTicketsInitialState: any = {
  page: PAGINATION?.CURRENT_PAGE,
  pageLimit: PAGINATION?.PAGE_LIMIT,
  search: '',
  selectedTicketLists: [],
  filterTicketLists: {},
  isPortalOpen: {},
  ticketsListsActiveColumn: ticketsListInitialColumns,
  totalRecords: 0,
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
} = servicesTicketsSlice?.actions;

export default servicesTicketsSlice?.reducer;
