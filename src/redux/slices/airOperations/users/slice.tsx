import { createSlice } from '@reduxjs/toolkit';
import { operationsUsersReducersList } from './reducers';
import { PAGINATION } from '@/config';

export const isPortalOpenInitialState = {
  isOpen: false,
  action: '',
  data: {},
};

export const isSwitchDisabledInitialState = {
  disabled: false,
  _id: '',
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
  setIsSwitchDisabledReducer,
  resetIsSwitchDisabledReducer,
  resetComponentStateReducers,
} = operationsUsersReducersList;

const operationsUsersInitialState = {
  page: PAGINATION?.CURRENT_PAGE,
  pageLimit: PAGINATION?.PAGE_LIMIT,
  search: '',
  selectedUsersLists: [],
  isPortalOpen: isPortalOpenInitialState,
  totalRecords: PAGINATION?.TOTAL_RECORDS,
  totalCount: PAGINATION?.TOTAL_RECORDS,
  isTotalCountLoading: true,
  isSwitchDisabled: isSwitchDisabledInitialState,
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
    setIsSwitchDisabled: setIsSwitchDisabledReducer,
    resetIsSwitchDisabled: resetIsSwitchDisabledReducer,
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
  setTotalCountLoading,
  resetTotalCountLoading,
  setTotalCount,
  setUsersListsTotalRecords,
  setIsSwitchDisabled,
  resetIsSwitchDisabled,
  resetComponentState,
} = operationsUsersSlice?.actions;

export default operationsUsersSlice?.reducer;
