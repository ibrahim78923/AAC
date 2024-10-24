import {
  AutocompleteAsyncOptionsI,
  AutocompleteOptionsI,
} from '@/components/ReactHookForm/ReactHookForm.interface';
import { Dispatch, SetStateAction } from 'react';

export interface FilterTicketListsI {
  category?: AutocompleteAsyncOptionsI | null;
  agent?: AutocompleteAsyncOptionsI | null;
  requester?: AutocompleteAsyncOptionsI | null;
  department?: AutocompleteAsyncOptionsI | null;
  createdOn?: any;
  status?: AutocompleteOptionsI | null;
  ticketType?: AutocompleteOptionsI | null;
  pirority?: AutocompleteOptionsI | null;
  impact?: AutocompleteOptionsI | null;
  typeSource?: AutocompleteOptionsI | null;
  plannedStartDate?: any;
  plannedEndDate?: any;
}

export interface TicketActionComponentI {
  [key: string]: JSX.Element;
}

export interface TicketBoardViewPropsI {
  setTicketAction?: any;
  setSelectedTicketList?: Dispatch<SetStateAction<any>>;
  search?: string;
  filterTicketLists?: any;
}

export interface TicketTableRowI {
  _id: string;
  ticketIdNumber: string;
  subject: string;
  requesterDetails: AutocompleteAsyncOptionsI;
  agentDetails: AutocompleteAsyncOptionsI;
  departmentsDetails: AutocompleteAsyncOptionsI;
  state: string;
  status: string;
  pirority: string;
  createdAt: string;
  dueDate: string;
  plannedEndDate: string;
  plannedStartDate: string;
  plannedEffort: string;
  impact: string;
}
