import { Dispatch, SetStateAction } from 'react';

export interface TicketRelatedPropsI {
  selectedArticle: any;
  setSelectedArticle: Dispatch<SetStateAction<any>>;
}
