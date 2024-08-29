import { Dispatch, SetStateAction } from 'react';

export interface RelatedTicketsIsPortalOpenI {
  isOpen?: boolean;
  isUpsert?: boolean;
  isDelete?: boolean;
}

export interface RelatedTicketsPortalComponentPropsI {
  isPortalOpen: RelatedTicketsIsPortalOpenI;
  setIsPortalOpen: Dispatch<SetStateAction<RelatedTicketsIsPortalOpenI>>;
  selectedChildTickets: any;
  setSelectedChildTickets: Dispatch<SetStateAction<any>>;
  setPage: Dispatch<SetStateAction<number>>;
  totalRecords: number;
  page: number;
  getChildTicketsListData: (currentPage?: number) => Promise<void>;
  data: any;
  childTicketId: string;
}

export interface RelatedTicketsTableRowI {
  childTicketDetails: {
    _id: string;
    ticketIdNumber: string;
    plannedEndDate: string;
    status: string;
    subject: string;
    agentDetails: {
      firstName: string;
      lastName: string;
    };
  };
}
