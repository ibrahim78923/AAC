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
  getChildTicketsListData: any;
  data: any;
  childTicketId: string;
}
