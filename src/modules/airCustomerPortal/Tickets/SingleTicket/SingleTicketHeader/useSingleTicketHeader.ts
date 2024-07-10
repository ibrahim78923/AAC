import { AIR_CUSTOMER_PORTAL } from '@/constants';
import { TICKET_STATUS } from '@/constants/strings';
import { useEditTicketStatusMutation } from '@/services/airCustomerPortal/Tickets';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useRouter } from 'next/router';
import { SingleTicketHeaderPropsI } from './SingleTicketHeader.interface';

export const useSingleTicketHeader = (props: SingleTicketHeaderPropsI) => {
  const { id, getSingleDefaultSurveyForCustomerTickets } = props;
  const router = useRouter();

  const [editTicketStatusTrigger, { isLoading }] =
    useEditTicketStatusMutation();

  const updateTicketStatus = async () => {
    const updateTicketStatusTicketsParameter = {
      queryParams: {
        status: TICKET_STATUS?.CLOSED,
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
    });
  };

  return {
    isLoading,
    updateTicketStatus,
    handleBack,
  };
};
