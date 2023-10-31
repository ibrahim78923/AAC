import { ticketRelatedData } from './TicketRelated/TicketRelated.data';
import { useState } from 'react';

export const useKnowledgeInsights = () => {
  const [getTicketRelatedData] = useState<any>(ticketRelatedData);
  const [getRelatedDataArray, setRelatedDataArray] = useState<any>([]);
  const [ticketRelatedToggler, setTicketRelatedToggler] = useState<any>(true);
  const getIdHandler = (_id: any) => {
    const filteredData = getTicketRelatedData?.filter(
      (ele: any) => ele.id === _id,
    );
    setRelatedDataArray(filteredData);
    setTicketRelatedToggler(false);
  };
  return {
    getRelatedDataArray,
    ticketRelatedToggler,
    getIdHandler,
  };
};
