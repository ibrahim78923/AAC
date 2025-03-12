import { createSlice } from '@reduxjs/toolkit';
import { servicesTicketApprovalsReducersList } from './reducers';
import { TICKET_APPROVALS } from '@/constants/services';

export const isPortalOpenInitialState = {
  isOpen: false,
  action: '',
  data: {} as any,
};

export const approvalStatusInitialState = TICKET_APPROVALS?.ALL;

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
