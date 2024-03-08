import { useGetTicketsDetailsByIdQuery } from '@/services/airServices/tickets/single-ticket-details/details';

import { useRouter } from 'next/router';
import { useState } from 'react';
import { headerDropdownFunction } from './Header.data';

export const useHeader = () => {
  const router = useRouter();
  const { ticketId } = router.query;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isIconVisible, setIsIconVisible] = useState(true);
  const [isPrintDrawerOpen, setIsPrintDrawerOpen] = useState(false);

  const toggleView = () => {
    setIsIconVisible(!isIconVisible);
  };
  const ticketsApprovalDropdown = headerDropdownFunction(setIsPrintDrawerOpen);
  const getSingleTicketParameter = {
    pathParam: {
      ticketId,
    },
  };
  const { data } = useGetTicketsDetailsByIdQuery(getSingleTicketParameter);

  return {
    data,
    router,
    toggleView,
    isIconVisible,
    setDrawerOpen,
    drawerOpen,
    setIsDrawerOpen,
    isDrawerOpen,
    ticketsApprovalDropdown,
    isPrintDrawerOpen,
    setIsPrintDrawerOpen,
  };
};
