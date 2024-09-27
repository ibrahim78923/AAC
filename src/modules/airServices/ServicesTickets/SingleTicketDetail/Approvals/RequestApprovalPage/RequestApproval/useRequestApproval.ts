import { TICKET_APPROVALS } from '@/constants/strings';
import { useGetSingleServicesTicketsApprovalsListsQuery } from '@/services/airServices/tickets/single-ticket-details/approvals';
import { useRouter } from 'next/router';

export const useRequestApprovals = () => {
  const router = useRouter();
  const { ticketId } = router?.query;

  const getApprovalsTicketsParameter = {
    queryParams: {
      id: ticketId,
      approvalStatus: TICKET_APPROVALS?.REQUESTED,
    },
  };
  const {
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
  }: { [key: string]: any } = useGetSingleServicesTicketsApprovalsListsQuery(
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
    refetch,
  };
};
