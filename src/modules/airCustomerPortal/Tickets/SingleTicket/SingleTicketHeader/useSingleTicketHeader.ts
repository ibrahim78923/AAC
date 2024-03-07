import { AIR_CUSTOMER_PORTAL } from '@/constants';
import { TICKET_STATUS } from '@/constants/strings';
import { useEditTicketStatusMutation } from '@/services/airCustomerPortal/Tickets';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useRouter } from 'next/router';

export const useSingleTicketHeader = (props: any) => {
  const { id } = props;
  const router = useRouter();
  const [editTicketStatusTrigger, { isLoading }] =
    useEditTicketStatusMutation();

  const handleStatsChange = async () => {
    try {
      const response: any = await editTicketStatusTrigger({
        id,
        params: { status: TICKET_STATUS?.CLOSED },
      });
      successSnackbar(response?.data?.message && 'Your ticket has been closed');
    } catch (error: any) {
      errorSnackbar(error?.data?.message ?? 'An error occurred');
    }
  };
  const handleBack = () => {
    router?.push({
      pathname: AIR_CUSTOMER_PORTAL?.TICKETS,
    });
  };
  return {
    isLoading,
    handleStatsChange,
    handleBack,
  };
};
