import { PAGINATION } from '@/config';
import { createSlice } from '@reduxjs/toolkit';
import { operationsRestoreReportsListsReducersList } from './reducer';

const {
  setPageReducer,
  setPageLimitReducer,
  setPageIncrementReducer,
  setPageDecrementReducer,
  setSearchReducer,
  setIsPortalOpenReducer,
  setIsPortalCloseReducer,
  setFilterRestoreReportsListReducer,
  setRestoreReportsListsTotalRecordsReducer,
  emptySelectedRestoreReportsListReducer,
  setSelectedRestoreReportsListReducer,
  emptyFilterRestoreReportsListReducer,
  refetchRestoreReportsListReducer,
  setFilterReducer,
  resetFilterReducer,
  resetApiQueryParamsReducers,
  canDisableTabReducer,
  resetComponentStateReducers,
} = operationsRestoreReportsListsReducersList;

export const isPortalOpenInitialState = {
  isOpen: false,
  action: '',
};

const operationsRestoreReportsListsInitialState = {
  page: PAGINATION?.CURRENT_PAGE,
  pageLimit: PAGINATION?.PAGE_LIMIT,
  search: '',
  filterRestoreReportsList: {},
  selectedRestoreReportsList: [],
  isPortalOpen: isPortalOpenInitialState,
  totalRecords: 0,
  filter: [],
  tabValue: 0,
  canDisableTab: true,
};

const operationsRestoreReportsListsSlice = createSlice({
  name: 'operationsRestoreReportsLists',
  initialState: operationsRestoreReportsListsInitialState,
  reducers: {
    setPage: setPageReducer,
    setPageLimit: setPageLimitReducer,
    setPageIncrement: setPageIncrementReducer,
    setPageDecrement: setPageDecrementReducer,
    setSearch: setSearchReducer,
    setIsPortalOpen: setIsPortalOpenReducer,
    setIsPortalClose: setIsPortalCloseReducer,
    setFilterRestoreReportsList: setFilterRestoreReportsListReducer,
    setRestoreReportsListsTotalRecords:
      setRestoreReportsListsTotalRecordsReducer,
    emptySelectedRestoreReportsList: emptySelectedRestoreReportsListReducer,
    setSelectedRestoreReportsList: setSelectedRestoreReportsListReducer,
    emptyFilterRestoreReportsList: emptyFilterRestoreReportsListReducer,
    refetchRestoreReportsList: refetchRestoreReportsListReducer,
    setFilter: setFilterReducer,
    resetFilter: resetFilterReducer,
    resetApiQueryParams: resetApiQueryParamsReducers,
    canDisableTab: canDisableTabReducer,
    resetComponentState: resetComponentStateReducers,
  },
});

export const {
  setIsPortalOpen,
  setIsPortalClose,
  setPage,
  setPageLimit,
  setSearch,
  setFilterRestoreReportsList,
  setRestoreReportsListsTotalRecords,
  emptySelectedRestoreReportsList,
  setSelectedRestoreReportsList,
  emptyFilterRestoreReportsList,
  setPageDecrement,
  setPageIncrement,
  refetchRestoreReportsList,
  setFilter,
  resetFilter,
  resetApiQueryParams,
  canDisableTab,
  resetComponentState,
} = operationsRestoreReportsListsSlice?.actions;

export default operationsRestoreReportsListsSlice?.reducer;
