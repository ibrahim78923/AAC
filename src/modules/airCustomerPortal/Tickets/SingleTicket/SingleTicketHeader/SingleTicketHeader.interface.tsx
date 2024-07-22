export interface SingleTicketHeaderPropsI {
  id: string | undefined | string[];
  getSingleDefaultSurveyForCustomerTickets?: () => Promise<void>;
  ticketNumber: string;
  singleTicketData: any;
  setOpenShareModal: any;
}
