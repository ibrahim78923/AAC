import {
  isPortalOpenInitialState,
  isSwitchDisabledInitialState,
} from './slice';
import { PAGINATION } from '@/config';

const setPageReducer = (state: any, action: any) => {
  state.page = action?.payload;
};

const setPageIncrementReducer = (state: any) => {
  state.page += 1;
};

const setPageDecrementReducer = (state: any) => {
  if (state.page > PAGINATION?.CURRENT_PAGE) {
    state.page -= 1;
  }
};

const setPageLimitReducer = (state: any, action: any) => {
  state.pageLimit = action?.payload;
};

const setSearchReducer = (state: any, action: any) => {
  state.search = action?.payload?.searchTerm;
  state.page = action?.payload?.page;
};

const setIsPortalOpenReducer = (state: any, action: any) => {
  state.isPortalOpen = action?.payload;
};

const setIsPortalCloseReducer = (state: any) => {
  state.isPortalOpen = isPortalOpenInitialState;
};

const setSelectedUsersListsReducer = (state: any, action: any) => {
  state.selectedUsersLists = action?.payload;
};

const emptySelectedUsersListsReducer = (state: any) => {
  state.selectedUsersLists = [];
};

const setTotalCountLoadingReducer = (state: any) => {
  state.isTotalCountLoading = true;
};

const resetTotalCountLoadingReducer = (state: any) => {
  state.isTotalCountLoading = false;
};

const setTotalCountReducer = (state: any, action: any) => {
  state.totalCount = action?.payload;
};

const setUsersListsTotalRecordsReducer = (state: any, action: any) => {
  state.totalRecords = action?.payload;
};

const setIsSwitchDisabledReducer = (state: any, action: any) => {
  state.isSwitchDisabled = action?.payload;
};

const resetIsSwitchDisabledReducer = (state: any) => {
  state.isSwitchDisabled = isSwitchDisabledInitialState;
};

const resetComponentStateReducers = (state: any) => {
  state.page = PAGINATION?.CURRENT_PAGE;
  state.pageLimit = PAGINATION?.PAGE_LIMIT;
  state.search = '';
  state.selectedUsersLists = [];
  state.isPortalOpen = isPortalOpenInitialState;
  state.totalRecords = PAGINATION?.TOTAL_RECORDS;
  state.totalCount = PAGINATION?.TOTAL_RECORDS;
  state.isTotalCountLoading = true;
  state.isSwitchDisabled = isSwitchDisabledInitialState;
};

export const operationsUsersReducersList = {
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
};
