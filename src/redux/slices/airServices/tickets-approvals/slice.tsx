import { createSlice } from '@reduxjs/toolkit';
import { servicesTicketApprovalsReducersList } from './reducers';
import { TICKET_APPROVALS } from '@/constants/strings';

const { ALL } = TICKET_APPROVALS ?? {};

export const isPortalOpenInitialState = {
  isOpen: false,
  action: '',
  data: {},
};

export const approvalStatusInitialState = ALL;

const {
  setIsPortalOpenReducer,
  setIsPortalCloseReducer,
  resetComponentStateReducers,
  setApprovalStatusReducer,
  resetApprovalStatusReducer,
} = servicesTicketApprovalsReducersList;

const servicesTicketApprovalsInitialState = {
  isPortalOpen: isPortalOpenInitialState,
  approvalStatus: approvalStatusInitialState,
};

const servicesTicketApprovalsSlice = createSlice({
  name: 'ticketApprovals',
  initialState: servicesTicketApprovalsInitialState,
  reducers: {
    setIsPortalOpen: setIsPortalOpenReducer,
    setIsPortalClose: setIsPortalCloseReducer,
    resetComponentState: resetComponentStateReducers,
    setApprovalStatus: setApprovalStatusReducer,
    resetApprovalStatus: resetApprovalStatusReducer,
  },
});

export const {
  setIsPortalOpen,
  setIsPortalClose,
  resetComponentState,
  setApprovalStatus,
  resetApprovalStatus,
} = servicesTicketApprovalsSlice?.actions;

export default servicesTicketApprovalsSlice?.reducer;
