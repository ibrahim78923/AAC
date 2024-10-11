import { PAGINATION } from '@/config';
import { createSlice } from '@reduxjs/toolkit';
import { operationsReportsListsReducersList } from './reducer';

const {
  setPageReducer,
  setPageLimitReducer,
  setPageIncrementReducer,
  setPageDecrementReducer,
  setSearchReducer,
  setIsPortalOpenReducer,
  setIsPortalCloseReducer,
  setFilterReportsListReducer,
  setReportsListsTotalRecordsReducer,
  emptySelectedReportsListReducer,
  setSelectedReportsListReducer,
  emptyFilterReportsListReducer,
  refetchReportsListReducer,
  setFilterReducer,
  resetFilterReducer,
  resetApiQueryParamsReducers,
  canDisableTabReducer,
  resetComponentStateReducers,
} = operationsReportsListsReducersList;

export const isPortalOpenInitialState = {
  isOpen: false,
  action: '',
};

const operationsReportsListsInitialState = {
  page: PAGINATION?.CURRENT_PAGE,
  pageLimit: PAGINATION?.PAGE_LIMIT,
  search: '',
  filterReportsList: {},
  selectedReportsList: [],
  isPortalOpen: isPortalOpenInitialState,
  totalRecords: PAGINATION?.TOTAL_RECORDS,
  filter: [],
  tabValue: 0,
  canDisableTab: true,
};

const operationsReportsListsSlice = createSlice({
  name: 'operationsReportsLists',
  initialState: operationsReportsListsInitialState,
  reducers: {
    setPage: setPageReducer,
    setPageLimit: setPageLimitReducer,
    setPageIncrement: setPageIncrementReducer,
    setPageDecrement: setPageDecrementReducer,
    setSearch: setSearchReducer,
    setIsPortalOpen: setIsPortalOpenReducer,
    setIsPortalClose: setIsPortalCloseReducer,
    setFilterReportsList: setFilterReportsListReducer,
    setReportsListsTotalRecords: setReportsListsTotalRecordsReducer,
    emptySelectedReportsList: emptySelectedReportsListReducer,
    setSelectedReportsList: setSelectedReportsListReducer,
    emptyFilterReportsList: emptyFilterReportsListReducer,
    refetchReportsList: refetchReportsListReducer,
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
  setFilterReportsList,
  setReportsListsTotalRecords,
  emptySelectedReportsList,
  setSelectedReportsList,
  emptyFilterReportsList,
  setPageDecrement,
  setPageIncrement,
  refetchReportsList,
  setFilter,
  resetFilter,
  resetApiQueryParams,
  canDisableTab,
  resetComponentState,
} = operationsReportsListsSlice?.actions;

export default operationsReportsListsSlice?.reducer;
