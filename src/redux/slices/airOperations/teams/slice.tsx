import { createSlice } from '@reduxjs/toolkit';
import { operationsTeamReducersList } from './reducers';
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
  setSelectedTeamListsReducer,
  emptySelectedTeamListsReducer,
  setTotalCountLoadingReducer,
  resetTotalCountLoadingReducer,
  setTotalCountReducer,
  setTeamListsTotalRecordsReducer,
} = operationsTeamReducersList;

const operationsTeamInitialState = {
  page: PAGINATION?.CURRENT_PAGE,
  pageLimit: PAGINATION?.PAGE_LIMIT,
  search: '',
  selectedTeamLists: [],
  isPortalOpen: isPortalOpenInitialState,
  totalRecords: 0,
  totalCount: 0,
  isTotalCountLoading: true,
};

const operationsTeamSlice = createSlice({
  name: 'Team',
  initialState: operationsTeamInitialState,
  reducers: {
    setPage: setPageReducer,
    setPageLimit: setPageLimitReducer,
    setPageIncrement: setPageIncrementReducer,
    setPageDecrement: setPageDecrementReducer,
    setSearch: setSearchReducer,
    setIsPortalOpen: setIsPortalOpenReducer,
    setIsPortalClose: setIsPortalCloseReducer,
    setSelectedTeamLists: setSelectedTeamListsReducer,
    emptySelectedTeamLists: emptySelectedTeamListsReducer,
    setTotalCountLoading: setTotalCountLoadingReducer,
    resetTotalCountLoading: resetTotalCountLoadingReducer,
    setTotalCount: setTotalCountReducer,
    setTeamListsTotalRecords: setTeamListsTotalRecordsReducer,
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
  setSelectedTeamLists,
  emptySelectedTeamLists,
  setTotalCountLoading,
  resetTotalCountLoading,
  setTotalCount,
  setTeamListsTotalRecords,
} = operationsTeamSlice?.actions;

export default operationsTeamSlice?.reducer;
