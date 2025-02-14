import { AIR_CUSTOMER_PORTAL } from '@/constants/routes';
import { MODULE_TYPE, TICKET_STATUS } from '@/constants/strings';
import { useEditTicketStatusMutation } from '@/services/airCustomerPortal/Tickets';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { useRouter } from 'next/router';
import { SingleTicketHeaderPropsI } from './SingleTicketHeader.interface';
import { getCustomerPortalStyling } from '@/utils';
import { useState } from 'react';

export const useSingleTicketHeader = (props: SingleTicketHeaderPropsI) => {
  const [shareModalOpen, setShareModalOpen] = useState<boolean>(false);
  const { id, getSingleDefaultSurveyForCustomerTickets } = props;
  const router = useRouter();
  const { companyId } = router?.query;
  const [editTicketStatusTrigger, { isLoading }] =
    useEditTicketStatusMutation();

  const updateTicketStatus = async () => {
    const updateTicketStatusTicketsParameter = {
      queryParams: {
        status: TICKET_STATUS?.CLOSED,
        moduleType: MODULE_TYPE?.CUSTOMER_PORTAL,
        id: id,
      },
    };
    try {
      await editTicketStatusTrigger(
        updateTicketStatusTicketsParameter,
      )?.unwrap();
      successSnackbar('Your ticket has been closed');
      await getSingleDefaultSurveyForCustomerTickets?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };
  const handleBack = () => {
    router?.push({
      pathname: AIR_CUSTOMER_PORTAL?.TICKETS,
      ...(!!companyId && {
        query: {
          companyId,
        },
      }),
    });
  };
  const portalStyles = getCustomerPortalStyling();
  return {
    isLoading,
    updateTicketStatus,
    handleBack,
    portalStyles,
    shareModalOpen,
    setShareModalOpen,
  };
};
