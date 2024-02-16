import { useGetApprovalsTicketsQuery } from '@/services/airServices/tickets/single-ticket-details/approvals';
import { useRouter } from 'next/router';

export const useRequestApprovals = () => {
  const router = useRouter();
  const { ticketId } = router?.query;

  const getApprovalsTicketsParameter = {
    queryParams: {
      id: ticketId,
      approvalStatus: 'REQUESTED',
    },
  };
  const { data, isLoading, isFetching, isError } = useGetApprovalsTicketsQuery(
    getApprovalsTicketsParameter,
    {
      refetchOnMountOrArgChange: true,
      skip: !!!ticketId,
    },
  );
  return {
    data,
    isLoading,
    isFetching,
    isError,
  };
};
