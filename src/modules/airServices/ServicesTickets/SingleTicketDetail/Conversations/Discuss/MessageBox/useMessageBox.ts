import { useGetDiscussionsOfTicketConversationQuery } from '@/services/airServices/tickets/single-ticket-details/conversation/discussion';
import { useRouter } from 'next/router';
import { chatMessagesDropdownDynamic } from './MessageBox.data';
import useAuth from '@/hooks/useAuth';

export const useMessageBox = (props: any) => {
  const { setSelectedMessage } = props;
  const router = useRouter();
  const { ticketId } = router?.query;

  const { user }: any = useAuth();

  const apiDataParameter = {
    queryParams: {
      id: ticketId,
    },
  };

  const { data, isLoading, isFetching, isError, refetch } =
    useGetDiscussionsOfTicketConversationQuery(apiDataParameter, {
      refetchOnMountOrArgChange: true,
      skip: !!!ticketId,
    });

  const chatMessagesDropdown = (message: any) =>
    chatMessagesDropdownDynamic?.(user?._id, setSelectedMessage, message);

  return {
    data,
    isLoading,
    isFetching,
    isError,
    chatMessagesDropdown,
    user,
    refetch,
  };
};
