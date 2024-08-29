export interface AllApprovalsPropsI {
  approvalStatus: string;
}
export interface ApprovalsDataI {
  approvalStatus: string;
  _id: string;
  ticketDetails: {
    _id?: string;
    status?: string;
    ticketIdNumber?: string;
    ticketTitle?: string;
    ticketType?: string;
    subject?: string;
    requesterDetails: {
      firstName: string;
      lastName: string;
      avatar?: {
        url?: string;
      };
    };
    createdAt?: string;
    moduleType?: string;
  };
  requesterDetails: {
    firstName: string;
    lastName: string;
    avatar?: {
      url?: string;
    };
  };
  createdAt: string;
  moduleType?: string;
  ticketId?: string;
}

export interface ApprovalCardPropsI {
  data: ApprovalsDataI;
  showStatus?: boolean;
  showButton?: boolean;
  setApproval?: (arg: any) => void;
  openApprovalDetail?: (arg: any) => void;
}
