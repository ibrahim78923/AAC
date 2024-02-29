import { TICKET_APPROVALS } from '@/constants/strings';
import { useGetPendingForApprovalsTicketsQuery } from '@/services/airCustomerPortal';
import { useRouter } from 'next/router';

export const usePendingApprovals = () => {
  const router = useRouter();
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
    router,
  };
};
