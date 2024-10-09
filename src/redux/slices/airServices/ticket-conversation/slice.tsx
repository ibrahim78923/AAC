import { createSlice } from '@reduxjs/toolkit';
import { servicesTicketConversationReducersList } from './reducers';

export const isPortalOpenInitialState = {
  isOpen: false,
  action: '',
  data: {} as any,
};

export const isResponsePortalOpenInitialState = {
  isOpen: false,
  action: '',
  data: {} as any,
};

const {
  setIsPortalOpenReducer,
  setIsPortalCloseReducer,
  resetComponentStateReducers,
  setIsResponsePortalOpenReducer,
  setIsResponsePortalCloseReducer,
} = servicesTicketConversationReducersList;

const servicesTicketConversationInitialState = {
  isPortalOpen: isPortalOpenInitialState,
  isResponsePortalOpen: isResponsePortalOpenInitialState,
};

const servicesTicketConversationSlice = createSlice({
  name: 'ticketConversation',
  initialState: servicesTicketConversationInitialState,
  reducers: {
    setIsPortalOpen: setIsPortalOpenReducer,
    setIsPortalClose: setIsPortalCloseReducer,
    resetComponentState: resetComponentStateReducers,
    setIsResponsePortalOpen: setIsResponsePortalOpenReducer,
    setIsResponsePortalClose: setIsResponsePortalCloseReducer,
  },
});

export const {
  setIsPortalOpen,
  setIsPortalClose,
  resetComponentState,
  setIsResponsePortalOpen,
  setIsResponsePortalClose,
} = servicesTicketConversationSlice?.actions;

export default servicesTicketConversationSlice?.reducer;
