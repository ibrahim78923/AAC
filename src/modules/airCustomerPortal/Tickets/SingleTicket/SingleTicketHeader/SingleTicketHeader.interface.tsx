import { Dispatch, SetStateAction } from 'react';

export interface SingleTicketHeaderPropsI {
  id: string | undefined | string[];
  getSingleDefaultSurveyForCustomerTickets?: () => Promise<void>;
  ticketNumber: string;
  singleTicketData: any;
  setOpenShareModal: Dispatch<SetStateAction<boolean>>;
}
