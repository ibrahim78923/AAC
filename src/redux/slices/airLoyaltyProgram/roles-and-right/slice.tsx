import { createSlice } from '@reduxjs/toolkit';
import { loyaltyProgramRoleAndRightsReducersList } from './reducers';
import { PAGINATION } from '@/config';

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
  setSelectedRoleAndRightsListsReducer,
  emptySelectedRoleAndRightsListsReducer,
  setRoleAndRightsListsTotalRecordsReducer,
  resetComponentStateReducers,
} = loyaltyProgramRoleAndRightsReducersList;

const loyaltyProgramRoleAndRightsInitialState = {
  page: PAGINATION?.CURRENT_PAGE,
  pageLimit: PAGINATION?.PAGE_LIMIT,
  search: '',
  selectedRoleAndRightsLists: [],
  isPortalOpen: isPortalOpenInitialState,
  totalRecords: PAGINATION?.TOTAL_RECORDS,
};

const loyaltyProgramRoleAndRightsSlice = createSlice({
  name: 'loyaltyRoleAndRights',
  initialState: loyaltyProgramRoleAndRightsInitialState,
  reducers: {
    setPage: setPageReducer,
    setPageLimit: setPageLimitReducer,
    setPageIncrement: setPageIncrementReducer,
    setPageDecrement: setPageDecrementReducer,
    setSearch: setSearchReducer,
    setIsPortalOpen: setIsPortalOpenReducer,
    setIsPortalClose: setIsPortalCloseReducer,
    setSelectedRoleAndRightsLists: setSelectedRoleAndRightsListsReducer,
    emptySelectedRoleAndRightsLists: emptySelectedRoleAndRightsListsReducer,
    setRoleAndRightsListsTotalRecords: setRoleAndRightsListsTotalRecordsReducer,
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
  setSelectedRoleAndRightsLists,
  emptySelectedRoleAndRightsLists,
  setRoleAndRightsListsTotalRecords,
  resetComponentState,
} = loyaltyProgramRoleAndRightsSlice?.actions;

export default loyaltyProgramRoleAndRightsSlice?.reducer;
