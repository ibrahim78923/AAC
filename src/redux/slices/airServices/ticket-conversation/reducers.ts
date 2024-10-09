import { isPortalOpenInitialState } from './slice';

const setIsPortalOpenReducer = (state: any, action: any) => {
  state.isPortalOpen = action?.payload;
};

const setIsPortalCloseReducer = (state: any) => {
  state.isPortalOpen = isPortalOpenInitialState;
};

const setIsResponsePortalOpenReducer = (state: any, action: any) => {
  state.isResponsePortalOpen = action?.payload;
};

const setIsResponsePortalCloseReducer = (state: any) => {
  state.isResponsePortalOpen = isPortalOpenInitialState;
};

const resetComponentStateReducers = (state: any) => {
  state.isPortalOpen = isPortalOpenInitialState;
  state.isResponsePortalOpen = isPortalOpenInitialState;
};

export const servicesTicketConversationReducersList = {
  setIsPortalOpenReducer,
  setIsPortalCloseReducer,
  setIsResponsePortalOpenReducer,
  setIsResponsePortalCloseReducer,
  resetComponentStateReducers,
};
