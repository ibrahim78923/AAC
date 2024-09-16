import { PAGINATION } from '@/config';
import { isPortalOpenInitialState } from './slice';

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

const setSelectedTicketListsReducer = (state: any, action: any) => {
  state.selectedRelatedTicketLists = action?.payload;
};

const emptySelectedTicketListsReducer = (state: any) => {
  state.selectedRelatedTicketLists = [];
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

export const servicesRelatedTicketsReducersList = {
  setPageReducer,
  setPageLimitReducer,
  setPageIncrementReducer,
  setPageDecrementReducer,
  setSearchReducer,
  setIsPortalOpenReducer,
  setIsPortalCloseReducer,
  setSelectedTicketListsReducer,
  emptySelectedTicketListsReducer,
  setTotalCountLoadingReducer,
  resetTotalCountLoadingReducer,
  setTotalCountReducer,
};
