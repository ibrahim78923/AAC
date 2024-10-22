import { PAGINATION } from '@/config';
import { createSlice } from '@reduxjs/toolkit';
import { servicesDashboardReducersList } from './reducers';

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
  setSelectedDashboardListsReducer,
  emptySelectedDashboardListsReducer,
  setTotalCountLoadingReducer,
  resetTotalCountLoadingReducer,
  setTotalCountReducer,
  setDashboardListsTotalRecordsReducer,
  resetComponentStateReducers,
  setFilterDashboardListsReducer,
  emptyFilterDashboardListsReducer,
} = servicesDashboardReducersList;

const servicesDashboardInitialState = {
  page: PAGINATION?.CURRENT_PAGE,
  pageLimit: PAGINATION?.PAGE_LIMIT,
  search: '',
  filterDashboardLists: {} as any,
  isPortalOpen: isPortalOpenInitialState,
  totalRecords: PAGINATION?.TOTAL_RECORDS,
  totalCount: PAGINATION?.TOTAL_RECORDS,
  isTotalCountLoading: true,
};

const servicesDashboardSlice = createSlice({
  name: 'servicesDashboard',
  initialState: servicesDashboardInitialState,
  reducers: {
    setPage: setPageReducer,
    setPageLimit: setPageLimitReducer,
    setPageIncrement: setPageIncrementReducer,
    setPageDecrement: setPageDecrementReducer,
    setSearch: setSearchReducer,
    setIsPortalOpen: setIsPortalOpenReducer,
    setIsPortalClose: setIsPortalCloseReducer,
    setSelectedDashboardLists: setSelectedDashboardListsReducer,
    emptySelectedDashboardLists: emptySelectedDashboardListsReducer,
    setTotalCountLoading: setTotalCountLoadingReducer,
    resetTotalCountLoading: resetTotalCountLoadingReducer,
    setTotalCount: setTotalCountReducer,
    setDashboardListsTotalRecords: setDashboardListsTotalRecordsReducer,
    resetComponentState: resetComponentStateReducers,
    setFilterDashboardLists: setFilterDashboardListsReducer,
    emptyFilterDashboardLists: emptyFilterDashboardListsReducer,
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
  setSelectedDashboardLists,
  emptySelectedDashboardLists,
  setTotalCountLoading,
  resetTotalCountLoading,
  setTotalCount,
  setDashboardListsTotalRecords,
  resetComponentState,
  setFilterDashboardLists,
  emptyFilterDashboardLists,
} = servicesDashboardSlice?.actions;

export default servicesDashboardSlice?.reducer;
