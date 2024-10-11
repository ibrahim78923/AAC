import { approvalStatusInitialState, isPortalOpenInitialState } from './slice';

const setIsPortalOpenReducer = (state: any, action: any) => {
  state.isPortalOpen = action?.payload;
};

const setIsPortalCloseReducer = (state: any) => {
  state.isPortalOpen = isPortalOpenInitialState;
};

const setApprovalStatusReducer = (state: any, action: any) => {
  state.approvalStatus = action?.payload;
};

const resetApprovalStatusReducer = (state: any) => {
  state.approvalStatus = isPortalOpenInitialState;
};

const resetComponentStateReducers = (state: any) => {
  state.isPortalOpen = approvalStatusInitialState;
  state.approvalStatus = isPortalOpenInitialState;
};

export const servicesTicketApprovalsReducersList = {
  setIsPortalOpenReducer,
  setIsPortalCloseReducer,
  resetComponentStateReducers,
  setApprovalStatusReducer,
  resetApprovalStatusReducer,
};
