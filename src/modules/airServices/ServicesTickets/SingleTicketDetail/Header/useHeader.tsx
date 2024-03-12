import { useGetTicketsDetailsByIdQuery } from '@/services/airServices/tickets/single-ticket-details/details';

import { useRouter } from 'next/router';
import { useState } from 'react';
import { headerDropdownFunction } from './Header.data';
import { usePutSingleTicketStatusMutation } from '@/services/airServices/tickets';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useHeader = () => {
  const router = useRouter();
  const { ticketId } = router.query;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isIconVisible, setIsIconVisible] = useState(true);
  const [isPrintDrawerOpen, setIsPrintDrawerOpen] = useState(false);
  const [putSingleTicketStatusTrigger] = usePutSingleTicketStatusMutation();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const toggleView = () => {
    setIsIconVisible(!isIconVisible);
  };

  const updateTicketStatus = async (status: any) => {
    const updateTicketStatusTicketsParameter = {
      pathParams: { id: ticketId },
      queryParams: {
        status,
      },
    };
    try {
      await putSingleTicketStatusTrigger(
        updateTicketStatusTicketsParameter,
      )?.unwrap();
      successSnackbar('Ticket marked as close successfully');
    } catch (error: any) {
      errorSnackbar();
    }
  };

  const ticketsApprovalDropdown = headerDropdownFunction(
    setIsPrintDrawerOpen,
    updateTicketStatus,
    setDeleteModalOpen,
  );
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
    deleteModalOpen,
    setDeleteModalOpen,
    ticketId,
  };
};
