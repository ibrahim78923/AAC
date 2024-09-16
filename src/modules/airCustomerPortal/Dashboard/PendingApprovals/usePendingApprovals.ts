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

  const companyId = router?.query?.companyId;
  const { data, isLoading, isFetching, isError, refetch } =
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
    refetch,
    companyId,
  };
};
