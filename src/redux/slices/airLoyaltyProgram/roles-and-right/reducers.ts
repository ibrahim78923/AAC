import { isPortalOpenInitialState } from './slice';
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

const setSelectedRoleAndRightsListsReducer = (state: any, action: any) => {
  state.selectedRoleAndRightsLists = action?.payload;
};

const emptySelectedRoleAndRightsListsReducer = (state: any) => {
  state.selectedRoleAndRightsLists = [];
};

const setRoleAndRightsListsTotalRecordsReducer = (state: any, action: any) => {
  state.totalRecords = action?.payload;
};

const resetComponentStateReducers = (state: any) => {
  state.page = PAGINATION?.CURRENT_PAGE;
  state.pageLimit = PAGINATION?.PAGE_LIMIT;
  state.search = '';
  state.selectedRoleAndRightsLists = [];
  state.isPortalOpen = isPortalOpenInitialState;
  state.totalRecords = PAGINATION?.TOTAL_RECORDS;
};

export const loyaltyProgramRoleAndRightsReducersList = {
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
};
