import { TICKET_APPROVALS } from '@/constants/strings';
import { useGetPendingForApprovalsTicketsQuery } from '@/services/airCustomerPortal';

export const usePendingApprovals = () => {
  const getPendingForApprovalsTicketsParameter = {
    queryParams: {
      approvalStatus: TICKET_APPROVALS?.RECEIVED,
    },
  };

  const { data, isLoading, isFetching, isError } =
    useGetPendingForApprovalsTicketsQuery(
      getPendingForApprovalsTicketsParameter,
      {
        refetchOnMountOrArgChange: true,
      },
    );

  return {
    data,
    isLoading,
    isFetching,
    isError,
  };
};
