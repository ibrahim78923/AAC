import { Dispatch, SetStateAction } from 'react';

export interface TicketActionComponentPropsI {
  setIsPortalOpen: Dispatch<SetStateAction<any>>;
  isPortalOpen: any;
  selectedTicketList: any;
  setSelectedTicketList: Dispatch<SetStateAction<any>>;
  singleTicketDetail: any;
  getTicketsListData: (currentPage?: number, filtered?: any) => Promise<void>;
  setFilterTicketLists: Dispatch<SetStateAction<any>>;
  filterTicketLists: any;
  setPage: Dispatch<SetStateAction<number>>;
  ticketsListsColumnPersist: any;
  setTicketsListsActiveColumn: Dispatch<SetStateAction<string[]>>;
  ticketsListsActiveColumn: string[];
  ticketId: any;
  totalRecords: number;
  page: number;
  isMoveBack?: boolean;
}

export interface TicketActionComponentI {
  [key: string]: JSX.Element;
}

export interface TicketTableViewPropsI {
  ticketsListsColumn: any;
  ticketListsData: any;
  metaData: any;
  setPage: Dispatch<SetStateAction<number>>;
  setPageLimit: Dispatch<SetStateAction<number>>;
}

export interface TicketBoardViewPropsI {
  setTicketAction: any;
  setSelectedTicketList: Dispatch<SetStateAction<any>>;
  search: string;
  filterTicketLists: any;
}
