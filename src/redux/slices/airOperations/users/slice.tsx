import { createSlice } from '@reduxjs/toolkit';
import { operationsUsersReducersList } from './reducers';
import { PAGINATION } from '@/config';

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
  setSelectedUsersListsReducer,
  emptySelectedUsersListsReducer,
  setTotalCountLoadingReducer,
  resetTotalCountLoadingReducer,
  setTotalCountReducer,
  setUsersListsTotalRecordsReducer,
} = operationsUsersReducersList;

const operationsUsersInitialState = {
  page: PAGINATION?.CURRENT_PAGE,
  pageLimit: PAGINATION?.PAGE_LIMIT,
  search: '',
  selectedUsersLists: [],
  isPortalOpen: isPortalOpenInitialState,
  totalRecords: 0,
  totalCount: 0,
  isTotalCountLoading: true,
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
    setTotalCountLoading: setTotalCountLoadingReducer,
    resetTotalCountLoading: resetTotalCountLoadingReducer,
    setTotalCount: setTotalCountReducer,
    setUsersListsTotalRecords: setUsersListsTotalRecordsReducer,
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
  setTotalCountLoading,
  resetTotalCountLoading,
  setTotalCount,
  setUsersListsTotalRecords,
} = operationsUsersSlice?.actions;

export default operationsUsersSlice?.reducer;
