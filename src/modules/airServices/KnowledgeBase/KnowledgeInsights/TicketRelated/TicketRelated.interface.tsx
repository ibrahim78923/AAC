import { Dispatch, SetStateAction } from 'react';

export interface TicketRelatedPropsI {
  selectedArticle: any;
  setSelectedArticle: Dispatch<SetStateAction<any>>;
}

export interface KnowledgeInsightsRelatedTicketTableRowI {
  insertedTickets?: {
    subject?: string;
    agentDetails?: {
      firstName?: string;
      lastName?: string;
    };
    createdAt?: string;
  };
}
