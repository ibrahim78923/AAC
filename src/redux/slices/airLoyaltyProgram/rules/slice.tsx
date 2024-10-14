import { PAGINATION } from '@/config';
import { createSlice } from '@reduxjs/toolkit';
import { loyaltyProgramRulesReducersList } from './reducers';

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
  setRulesListTotalRecordsReducer,
} = loyaltyProgramRulesReducersList;

const loyaltyProgramRulesInitialState = {
  page: PAGINATION?.CURRENT_PAGE,
  pageLimit: PAGINATION?.PAGE_LIMIT,
  search: '',
  selectedRelatedTicketLists: [],
  isPortalOpen: isPortalOpenInitialState,
  totalRecords: PAGINATION?.TOTAL_RECORDS,
};

const loyaltyProgramRulesSlice = createSlice({
  name: 'loyaltyProgramRules',
  initialState: loyaltyProgramRulesInitialState,
  reducers: {
    setPage: setPageReducer,
    setPageLimit: setPageLimitReducer,
    setPageIncrement: setPageIncrementReducer,
    setPageDecrement: setPageDecrementReducer,
    setSearch: setSearchReducer,
    setIsPortalOpen: setIsPortalOpenReducer,
    setIsPortalClose: setIsPortalCloseReducer,
    setRulesListTotalRecords: setRulesListTotalRecordsReducer,
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
  setRulesListTotalRecords,
  resetComponentState,
} = loyaltyProgramRulesSlice?.actions;

export default loyaltyProgramRulesSlice?.reducer;
