import { createSlice } from '@reduxjs/toolkit';
import { operationsUsersReducersList } from './reducers';
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
  setSelectedUsersListsReducer,
  emptySelectedUsersListsReducer,
  setUsersListsTotalRecordsReducer,
  resetComponentStateReducers,
} = operationsUsersReducersList;

const operationsUsersInitialState = {
  page: PAGINATION?.CURRENT_PAGE,
  pageLimit: PAGINATION?.PAGE_LIMIT,
  search: '',
  selectedUsersLists: [],
  isPortalOpen: isPortalOpenInitialState,
  totalRecords: PAGINATION?.TOTAL_RECORDS,
};

const operationsUsersSlice = createSlice({
  name: 'Users',
  initialState: operationsUsersInitialState,
  reducers: {
    setPage: setPageReducer,
    setPageLimit: setPageLimitReducer,
    setPageIncrement: setPageIncrementReducer,
    setPageDecrement: setPageDecrementReducer,
    setSearch: setSearchReducer,
    setIsPortalOpen: setIsPortalOpenReducer,
    setIsPortalClose: setIsPortalCloseReducer,
    setSelectedUsersLists: setSelectedUsersListsReducer,
    emptySelectedUsersLists: emptySelectedUsersListsReducer,
    setUsersListsTotalRecords: setUsersListsTotalRecordsReducer,
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
  setSelectedUsersLists,
  emptySelectedUsersLists,
  setUsersListsTotalRecords,
  resetComponentState,
} = operationsUsersSlice?.actions;

export default operationsUsersSlice?.reducer;
