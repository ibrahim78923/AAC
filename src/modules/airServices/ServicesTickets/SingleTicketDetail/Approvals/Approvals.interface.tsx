import { Dispatch, SetStateAction } from 'react';

export interface RequestApprovalPagePropsI {
  isDrawerOpen: boolean;
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;
  selectedApproval: any;
  setSelectedApproval: Dispatch<SetStateAction<boolean>>;
  setApproval: (params: any) => void;
  updateRequestApprovalStatus: (params: any) => Promise<void>;
}

export interface AddApprovalsPropsI {
  isDrawerOpen: boolean;
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;
}

export interface ConfirmModalPropsI {
  isConfirmModalOpen: boolean;
  setIsConfirmModalOpen: Dispatch<SetStateAction<boolean>>;
  selectedApproval: any;
  setSelectedApproval: Dispatch<SetStateAction<any>>;
  refetch?: any;
}
