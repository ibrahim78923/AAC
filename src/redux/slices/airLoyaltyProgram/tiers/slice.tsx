import { PAGINATION } from '@/config';
import { createSlice } from '@reduxjs/toolkit';
import { loyaltyProgramTiersReducersList } from './reducers';

export const isPortalOpenInitialState = {
  isOpen: false,
  action: '',
  data: {} as any,
};

const {
  setPageReducer,
  setPageLimitReducer,
  setPageIncrementReducer,
  setPageDecrementReducer,
  setSearchReducer,
  setIsPortalOpenReducer,
  setIsPortalCloseReducer,
  resetComponentStateReducers,
  setTiersListsTotalRecordsReducer,
} = loyaltyProgramTiersReducersList;

const loyaltyProgramTiersInitialState = {
  page: PAGINATION?.CURRENT_PAGE,
  pageLimit: PAGINATION?.PAGE_LIMIT,
  search: '',
  selectedRelatedTicketLists: [],
  isPortalOpen: isPortalOpenInitialState,
  totalRecords: PAGINATION?.TOTAL_RECORDS,
};

const loyaltyProgramTiersSlice = createSlice({
  name: 'loyaltyProgramTiers',
  initialState: loyaltyProgramTiersInitialState,
  reducers: {
    setPage: setPageReducer,
    setPageLimit: setPageLimitReducer,
    setPageIncrement: setPageIncrementReducer,
    setPageDecrement: setPageDecrementReducer,
    setSearch: setSearchReducer,
    setIsPortalOpen: setIsPortalOpenReducer,
    setIsPortalClose: setIsPortalCloseReducer,
    setTiersListsTotalRecords: setTiersListsTotalRecordsReducer,
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
  resetComponentState,
  setTiersListsTotalRecords,
} = loyaltyProgramTiersSlice?.actions;

export default loyaltyProgramTiersSlice?.reducer;
