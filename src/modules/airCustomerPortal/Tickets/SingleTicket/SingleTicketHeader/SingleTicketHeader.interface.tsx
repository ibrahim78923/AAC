export interface SingleTicketHeaderPropsI {
  id: string;
  getSingleDefaultSurveyForCustomerTickets?: () => Promise<void>;
  ticketNumber: string;
  singleTicketData: any;
}
