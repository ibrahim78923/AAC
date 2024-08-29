export interface TicketCardPropsI {
  ticket: {
    _id?: string;
    subject?: string;
    status?: string;
    ticketIdNumber?: string;
    ticketTitle?: string;
    ticketType?: string;
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
}
export interface TicketCardDataI {
  _id?: string;
  subject?: string;
  status?: string;
  ticketIdNumber?: string;
  ticketTitle?: string;
  ticketType?: string;
  requesterDetails: {
    firstName: string;
    lastName: string;
    avatar?: {
      url?: string;
    };
  };
  createdAt?: string;
  moduleType?: string;
}
